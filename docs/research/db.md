# Research Database

## Kiến thức nền tảng cần nắm

### 1. Chiến lược lưu trữ

lưu toàn bộ mảng elements dưới dạng JSON string trong 1 cột LONGTEXT, **không** tách từng element thành 1 row

lí do:
- excalidraw cũng lưu theo cách này
- đơn giản hoá query (1 lần read = toàn bộ bản vẽ)
- tránh phải JOIN phức tạp khi load board
- content của 1 board thường < 1MB (LONGTEXT hỗ trợ tới 4GB)

### 2. ERD (Entity Relationship Diagram)

```
┌──────────────┐         ┌──────────────┐
│    users     │         │    boards    │
├──────────────┤         ├──────────────┤
│ id (PK)      │────┐    │ id (PK)      │
│ username     │    │    │ user_id (FK) │←─── thuộc về user nào
│ password_hash│    └───→│ title        │
│ created_at   │         │ content      │←─── JSON string chứa elements[]
│              │         │ thumbnail_url│
│              │         │ created_at   │
│              │         │ updated_at   │
└──────────────┘         └──────────────┘
     1                        N
     (1 user có nhiều boards)
```

### 3. Schema SQL

```sql
CREATE DATABASE IF NOT EXISTS whiteboard
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE whiteboard;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE boards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) DEFAULT 'Untitled',
  content LONGTEXT,
  thumbnail_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- index cho query theo user
CREATE INDEX idx_boards_user_id ON boards(user_id);
```

### 4. Các query chính

```sql
-- lấy tất cả board của 1 user (cho trang dashboard)
SELECT id, title, thumbnail_url, updated_at
FROM boards
WHERE user_id = ?
ORDER BY updated_at DESC;

-- lấy chi tiết 1 board (load vào canvas)
SELECT * FROM boards WHERE id = ? AND user_id = ?;

-- tạo board mới
INSERT INTO boards (user_id, title, content) VALUES (?, ?, ?);

-- cập nhật board (auto-save hoặc manual save)
UPDATE boards SET content = ?, title = ? WHERE id = ? AND user_id = ?;

-- xoá board
DELETE FROM boards WHERE id = ? AND user_id = ?;
```

### 5. Lưu ý bảo mật

- luôn kiểm tra `user_id` khi query board để user không truy cập board của người khác
- dùng `password_hash()` và `password_verify()` của PHP, **không** lưu plain text
- dùng prepared statements để chống SQL injection
