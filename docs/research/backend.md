# Research Backend

## Kiến thức nền tảng cần nắm

### 1. PHP cơ bản cho REST API

không dùng framework nặng, chỉ cần PHP thuần với cấu trúc rõ ràng

```
server/
├── index.php          # entry point, router
├── config/
│   └── database.php   # kết nối MySQL (PDO)
├── controllers/
│   ├── AuthController.php
│   └── BoardController.php
├── middleware/
│   └── AuthMiddleware.php
├── models/
│   ├── User.php
│   └── Board.php
└── utils/
    ├── Response.php    # helper trả JSON response
    └── Validator.php   # validate input
```

### 2. Router đơn giản

```php
// index.php
$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', trim($uri, '/'));

// routing
// POST /api/auth/register
// POST /api/auth/login
// GET  /api/boards
// POST /api/boards
// GET  /api/boards/:id
// PUT  /api/boards/:id
// DELETE /api/boards/:id
```

### 3. PDO (PHP Data Objects)

kết nối MySQL an toàn, chống SQL injection bằng prepared statements

```php
$pdo = new PDO(
  "mysql:host=localhost;dbname=whiteboard;charset=utf8mb4",
  $username,
  $password,
  [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
);

// prepared statement
$stmt = $pdo->prepare("SELECT * FROM users WHERE username = :username");
$stmt->execute(['username' => $input]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
```

### 4. Session authentication

```php
session_start();

// đăng nhập thành công
$_SESSION['user_id'] = $user['id'];
$_SESSION['username'] = $user['username'];

// middleware kiểm tra
function requireAuth() {
  if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
  }
}
```

### 5. JSON response helper

```php
class Response {
  static function json($data, $status = 200) {
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
  }

  static function error($message, $status = 400) {
    self::json(['error' => $message], $status);
  }
}
```

### 6. Validation

```php
// validate input trước khi xử lí
$body = json_decode(file_get_contents('php://input'), true);

if (empty($body['username']) || empty($body['password'])) {
  Response::error('Username and password are required');
}

if (strlen($body['password']) < 6) {
  Response::error('Password must be at least 6 characters');
}
```

### 7. CORS (Cross-Origin)

nếu frontend và backend chạy khác port, cần thêm header CORS

```php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

if ($method === 'OPTIONS') {
  http_response_code(200);
  exit;
}
```
