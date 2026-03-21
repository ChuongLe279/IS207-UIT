# Task Backend

> 1 BE dev, phối hợp trực tiếp với FE 3 (API caller) và DB

## API Tasks

| # | Task | Trạng thái | Phase | Dependencies | Ghi chú |
|---|------|-----------|-------|-------------|---------|
| 1 | Setup cấu trúc thư mục server/ | ⬚ | 5 | - | xem docs/research/backend.md |
| 2 | Viết config/database.php (PDO connection) | ⬚ | 5 | DB schema | phối hợp với DB dev |
| 3 | Viết utils/Response.php | ⬚ | 5 | - | json() và error() helper |
| 4 | Viết utils/Validator.php | ⬚ | 5 | - | validate input |
| 5 | Viết router (index.php) | ⬚ | 5 | - | parse method + uri |
| 6 | Setup CORS headers | ⬚ | 5 | - | nếu FE chạy port khác |
| 7 | AuthController: register | ⬚ | 5 | #2, #5 | password_hash() |
| 8 | AuthController: login | ⬚ | 5 | #7 | session_start(), password_verify() |
| 9 | AuthController: logout | ⬚ | 5 | #8 | session_destroy() |
| 10 | AuthController: me | ⬚ | 5 | #8 | trả user info từ session |
| 11 | AuthMiddleware: requireAuth | ⬚ | 5 | #8 | kiểm tra $_SESSION['user_id'] |
| 12 | BoardController: index (list boards) | ⬚ | 5 | #11 | query theo user_id |
| 13 | BoardController: create | ⬚ | 5 | #11 | INSERT |
| 14 | BoardController: show | ⬚ | 5 | #11 | SELECT với check user_id |
| 15 | BoardController: update | ⬚ | 5 | #11 | UPDATE content |
| 16 | BoardController: delete | ⬚ | 5 | #11 | DELETE |

## Review chéo

- review code fetch calls của FE 3 để đảm bảo format JSON khớp
- test API bằng Postman hoặc curl trước khi FE tích hợp
- viết docs cho mỗi endpoint (xem task/api.md)

## Progress

(cập nhật khi bắt đầu code)