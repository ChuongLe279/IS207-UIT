<?php
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/utils/response.php';

// query [METHOD] 
$request = $_GET['request'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];

// explode sẽ chia request thành 1 mảng các string bằng việc cắt dấu "/"
$parts = explode('/', $request);
// NOTE: vì .htaccess nó đã có sẵn /api rồi nên resource sẽ lấy từ phần tiếp theo. VD: /api/[...]
$resource = $parts[0] ?? '';

if ($resource === 'tests') {
	require_once __DIR__ . '/controllers/test-controller.php';

	if (isset($parts[1]) && is_numeric($parts[1])) {
		require_once __DIR__ . '/middleware/auth.php';
		requireAuth();

		// GET /api/tests/:id
		getTestCore($parts[1]);
	} else {
		// GET /api/tests
		getTestList();
	}
} elseif ($resource === 'auth') {
    require_once __DIR__ . '/controllers/auth-controller.php';

    $action = $parts[1] ?? '';
    
    switch ($action) {
        case 'login':
            handleLogin();
            break;
        case 'register':
            handleRegister();
            break;
        case 'logout':
            handleLogout();
            break;
        default:
            sendError("Không tìm thấy chức năng xác thực này", 404);
            break;
    }
} else {
	sendError("Không tìm thấy endpoint này", 404);
}