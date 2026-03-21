# Task tổng hợp theo Phase

> cập nhật trạng thái: ✅ xong | 🔄 đang làm | ⬚ chưa bắt đầu

## Phase 1: Setup & Khởi tạo

| # | Task | Người phụ trách | Trạng thái | Deadline | Ghi chú |
|---|------|-----------------|-----------|----------|---------|
| 1 | Khởi tạo repo, setup cấu trúc thư mục | Leader | ✅ | - | đã xong |
| 2 | Viết quy tắc làm việc (commit, PR, docs) | Leader | ✅ | - | đã xong |
| 3 | Research + lập kế hoạch, chia task | Leader + Manager | ✅ | - | đã xong |
| 4 | Cả team đọc hiểu quy tắc + kiến thức nền | All | ⬚ | - | mỗi người đọc phần research liên quan |

## Phase 2: Core Drawing

| # | Task | Người phụ trách | Trạng thái | Deadline | Ghi chú |
|---|------|-----------------|-----------|----------|---------|
| 1 | Setup canvas full màn hình, fix retina | FE 1 | ⬚ | - | `devicePixelRatio` |
| 2 | Tích hợp Rough.js | FE 1 | ⬚ | - | cài qua npm |
| 3 | Bắt sự kiện chuột (mousedown/move/up) | FE 2 | ⬚ | - | |
| 4 | Vẽ rectangle | FE 1 | ⬚ | - | |
| 5 | Vẽ ellipse | FE 1 | ⬚ | - | |
| 6 | Vẽ line | FE 1 | ⬚ | - | |
| 7 | Vẽ arrow | FE 1 | ⬚ | - | |
| 8 | Quản lí mảng elements[] (state) | FE 2 | ⬚ | - | tạo appState object |
| 9 | Render loop (clearRect + vẽ lại tất cả) | FE 1 + FE 2 | ⬚ | - | hàm renderScene() |

## Phase 3: Database

| # | Task | Người phụ trách | Trạng thái | Deadline | Ghi chú |
|---|------|-----------------|-----------|----------|---------|
| 1 | Vẽ ERD | DB | ⬚ | - | ngồi cùng FE 1, FE 2 để xác định cấu trúc element |
| 2 | Viết schema SQL | DB | ⬚ | - | |
| 3 | Chạy migration tạo bảng | DB | ⬚ | - | |
| 4 | Viết file kết nối database (PDO) | DB + BE | ⬚ | - | config/database.php |

## Phase 4: Tương tác nâng cao

| # | Task | Người phụ trách | Trạng thái | Deadline | Ghi chú |
|---|------|-----------------|-----------|----------|---------|
| 1 | Select tool (hit testing) | FE 1 | ⬚ | - | thuật toán khác nhau mỗi loại hình |
| 2 | Move tool (drag element) | FE 2 | ⬚ | - | cập nhật x, y rồi re-render |
| 3 | Text tool | FE 2 | ⬚ | - | tạo textarea overlay |
| 4 | Đổi stroke color | FE 3 | ⬚ | - | color picker |
| 5 | Đổi fill color | FE 3 | ⬚ | - | |
| 6 | Undo/Redo | FE 2 | ⬚ | - | history stack + Ctrl+Z/Y |
| 7 | Delete element | FE 2 | ⬚ | - | soft delete (isDeleted = true) |
| 8 | Toolbar UI | FE 3 | ⬚ | - | clone UI excalidraw |
| 9 | Style panel UI | FE 3 | ⬚ | - | |

## Phase 5: Backend & Integration

| # | Task | Người phụ trách | Trạng thái | Deadline | Ghi chú |
|---|------|-----------------|-----------|----------|---------|
| 1 | Setup PHP router | BE | ⬚ | - | |
| 2 | API Register | BE | ⬚ | - | POST /api/auth/register |
| 3 | API Login | BE | ⬚ | - | POST /api/auth/login |
| 4 | API Logout | BE | ⬚ | - | POST /api/auth/logout |
| 5 | API Get boards | BE | ⬚ | - | GET /api/boards |
| 6 | API Create board | BE | ⬚ | - | POST /api/boards |
| 7 | API Get board detail | BE | ⬚ | - | GET /api/boards/:id |
| 8 | API Update board | BE | ⬚ | - | PUT /api/boards/:id |
| 9 | API Delete board | BE | ⬚ | - | DELETE /api/boards/:id |
| 10 | Auth middleware | BE | ⬚ | - | requireAuth() |
| 11 | Viết fetch calls (FE gọi API) | FE 3 + BE | ⬚ | - | FE 3 phối hợp trực tiếp với BE |
| 12 | Trang dashboard (list boards) | FE 3 | ⬚ | - | |
| 13 | Export PNG | FE 1 | ⬚ | - | canvas.toDataURL() |
| 14 | Auto-save | FE 3 + BE | ⬚ | - | debounce save mỗi 5s |

## Xoay tua kiến thức (rotation)

> mục đích: mỗi người phải biết ít nhất 1 phần ngoài chuyên môn chính

| Người | Chuyên môn chính | Xoay tua sang | Cách thực hiện |
|-------|-----------------|---------------|----------------|
| FE 1 (Canvas) | Rough.js, math, rendering | Review code FE 2 | review PR select/move, hiểu state |
| FE 2 (State) | State, events, undo/redo | Review code FE 1 | review PR drawing, hiểu hit testing |
| FE 3 (UI + API) | UI, fetch calls | Ngồi cùng BE | viết fetch, hiểu API contract |
| BE | PHP API, session, validation | Review code FE 3 | đảm bảo FE gửi đúng JSON format |
| DB | Schema, ERD, query | Ngồi cùng FE 1 + FE 2 | xác định cấu trúc element object |