# System Design

- Không có real-time collaboration (WebSocket) vì backend dùng PHP thuần rất khó để xử lí web socket, phải dùng nodejs
- Mỗi user vẽ trên board riêng, lưu/load qua REST API

## Tổng quan kiến trúc

```
┌──────────────────────────────────────────────────────┐
│                    Client (Browser)                  │
│  ┌──────────┐   ┌──────────┐ ┌───────────────────┐   │
│  │ Canvas   │   │ State    │ │ UI Components     │   │
│  │ Engine   │   │ Manager  │ │ (Toolbar, Panel)  │   │
│  │ Rough.js │   │          │ │                   │   │
│  └────┬─────┘   └────┬─────┘ └────────┬──────────┘   │
│       └──────────────┴────────────────┘              │
│                      │                               │
│              ┌───────┴───────┐                       │
│              │  API Service  │                       │
│              │  (fetch)      │                       │
│              └───────┬───────┘                       │
└──────────────────────┼───────────────────────────────┘
                       │ HTTP (JSON)
┌──────────────────────┼───────────────────────────────┐
│                Server (PHP)                          │
│  ┌───────────┐  ┌────┴──────┐  ┌──────────────────┐  │
│  │ Router    │  │ Controller│  │ Middleware       │  │
│  │           ├──┤           ├──┤ (Auth, Validate) │  │
│  └───────────┘  └────┬──────┘  └──────────────────┘  │
│                      │                               │
│              ┌───────┴───────┐                       │
│              │    Model      │                       │
│              │  (Database)   │                       │
│              └───────┬───────┘                       │
└──────────────────────┼───────────────────────────────┘
                       │ SQL
                ┌──────┴──────┐
                │   MySQL     │
                │  users      │
                │  boards     │
                └─────────────┘
```

## Data flow

### Vẽ hình (offline)

```
User mousedown → xác định tool đang chọn → tạo Object mới
     ↓
User mousemove → cập nhật width/height của Object
     ↓
User mouseup → push Object vào mảng State → re-render canvas
```

### Lưu bản vẽ (online)

```
User click Save → JSON.stringify(elements[]) → fetch POST /api/boards
     ↓
Server validate → lưu JSON string vào cột content (LONGTEXT)
     ↓
Response 200 → hiển thị thông báo thành công
```

### Load bản vẽ

```
User mở board → fetch GET /api/boards/:id
     ↓
Server query → trả về JSON string
     ↓
Client JSON.parse → gán vào State → re-render toàn bộ canvas
```

### Select & Move element

```
User click (select tool) → loop ngược elements[] → hit test từng element
     ↓
Tìm thấy → gán selectedElementId → highlight viền
     ↓
User mousedown trên element đã chọn → ghi nhớ offset (clickX - element.x)
     ↓
User mousemove → cập nhật element.x/y theo mouse - offset → re-render
     ↓
User mouseup → push snapshot vào history (cho undo)
```

### Export PNG

```
User click Export → tạo offscreen canvas (không có grid/background)
     ↓
Vẽ lại tất cả elements lên offscreen canvas
     ↓
canvas.toBlob('image/png') → URL.createObjectURL(blob)
     ↓
Tạo thẻ <a> ẩn, gán href = blob URL → trigger click → download file
```

## Component diagram (Frontend)

```
App
├── Toolbar (chọn tool: rectangle, ellipse, line, arrow, text, select)
├── StylePanel (stroke color, fill color, stroke width)
├── Canvas (main drawing area)
│   ├── renderScene() - vẽ lại toàn bộ từ state
│   ├── handleMouseDown() - bắt đầu vẽ/select/move
│   ├── handleMouseMove() - preview hoặc kéo
│   └── handleMouseUp() - kết thúc action
├── TopBar (undo, redo, export, save, login)
└── BoardList (danh sách bản vẽ đã lưu)
```

## Cấu trúc 1 Element (Object hình vẽ)

```javascript
{
  id: "abc123",           // unique id (nanoid hoặc uuid)
  type: "rectangle",      // rectangle | ellipse | line | arrow | text
  x: 100,                 // tọa độ x góc trái trên
  y: 200,                 // tọa độ y góc trái trên
  width: 300,             // chiều rộng
  height: 150,            // chiều cao
  strokeColor: "#000000", // màu viền
  fillColor: "transparent", // màu nền
  strokeWidth: 2,         // độ dày viền
  roughness: 1,           // độ "tay vẽ" của rough.js (0 = mượt, 2 = xù)
  seed: 12345,            // seed cho rough.js để vẽ lại giống hệt
  angle: 0,              // góc xoay (radian), 0 = không xoay
  points: [],             // dành cho line/arrow: mảng [x, y]
  text: "",               // dành cho text element
  fontSize: 20,           // dành cho text element
  isDeleted: false        // soft delete
}
```

## Tech stack

| Layer | Công nghệ | Lí do |
|-------|-----------|-------|
| Frontend | HTML5 Canvas + Vanilla JS (hoặc React) | môn học yêu cầu, canvas cho hiệu năng vẽ |
| Styling | TailwindCSS | clone giao diện excalidraw nhanh |
| Drawing | Rough.js | tạo style "hand-drawn" giống excalidraw |
| Backend | PHP | môn IS207 yêu cầu |
| Database | MySQL | môn học yêu cầu |
| Auth | PHP Session | đơn giản, phù hợp scope đồ án |

## REST API Endpoints

| Method | Endpoint | Mô tả | Auth |
|--------|----------|--------|------|
| POST | `/api/auth/register` | đăng ký | - |
| POST | `/api/auth/login` | đăng nhập | - |
| POST | `/api/auth/logout` | đăng xuất | ✅ |
| GET | `/api/auth/me` | lấy user hiện tại | ✅ |
| GET | `/api/boards` | danh sách board của user | ✅ |
| POST | `/api/boards` | tạo board mới | ✅ |
| GET | `/api/boards/:id` | lấy chi tiết board | ✅ |
| PUT | `/api/boards/:id` | cập nhật board (save) | ✅ |
| DELETE | `/api/boards/:id` | xoá board | ✅ |

> chi tiết input/output/errors xem tại [task/api.md](../../task/api.md)
