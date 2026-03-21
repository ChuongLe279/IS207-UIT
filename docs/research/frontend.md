# Research Frontend

## Kiến thức nền tảng cần nắm

### 1. HTML5 Canvas API

Canvas là thẻ HTML cho phép vẽ đồ hoạ 2D bằng JavaScript

```javascript
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// fix mờ trên màn hình retina
const dpr = window.devicePixelRatio || 1
canvas.width = window.innerWidth * dpr
canvas.height = window.innerHeight * dpr
ctx.scale(dpr, dpr)
canvas.style.width = window.innerWidth + 'px'
canvas.style.height = window.innerHeight + 'px'
```

các method quan trọng:
- `ctx.clearRect(0, 0, w, h)` - xoá toàn bộ canvas trước khi vẽ lại
- `ctx.beginPath()`, `ctx.rect()`, `ctx.ellipse()`, `ctx.stroke()`
- `ctx.fillText(text, x, y)` - vẽ chữ
- `canvas.toDataURL('image/png')` - export ra ảnh

### 2. Rough.js

thư viện tạo hiệu ứng "hand-drawn" trên canvas

```javascript
import rough from 'roughjs'
const rc = rough.canvas(canvas)

// vẽ hình chữ nhật style tay vẽ
rc.rectangle(x, y, width, height, {
  seed: element.seed,       // giữ nét vẽ ổn định khi re-render
  roughness: 1,
  stroke: '#000',
  fill: 'transparent'
})
```

lưu ý quan trọng: **seed** là thứ giữ cho hình vẽ không thay đổi mỗi lần render. nếu không có seed, mỗi lần gọi render rough.js sẽ sinh ra nét vẽ khác nhau

### 3. Hit testing (kiểm tra click trúng hình)

khi user click vào canvas, cần xác định click trúng hình nào. thuật toán khác nhau tuỳ loại hình:

- **rectangle**: kiểm tra `x <= clickX <= x + width && y <= clickY <= y + height`
- **ellipse**: dùng công thức ellipse `((dx/rx)^2 + (dy/ry)^2) <= 1`
- **line/arrow**: tính khoảng cách từ điểm click tới đoạn thẳng, nếu < threshold thì trúng
- **text**: tương tự rectangle, dùng `ctx.measureText()` để lấy bounding box

### 4. State management

toàn bộ app quản lí bằng 1 mảng `elements[]` trung tâm

```javascript
let appState = {
  elements: [],              // mảng chứa tất cả hình vẽ
  selectedElementId: null,   // id hình đang được chọn
  currentTool: 'rectangle',  // tool đang active
  history: [],               // stack để undo
  historyIndex: -1           // vị trí hiện tại trong history
}
```

### 5. Undo/Redo

mỗi khi user thực hiện 1 action (vẽ, move, xoá), snapshot lại mảng elements:

```javascript
function pushToHistory(elements) {
  // cắt bỏ phần "tương lai" nếu đã undo trước đó
  state.history = state.history.slice(0, state.historyIndex + 1)
  state.history.push(JSON.parse(JSON.stringify(elements)))
  state.historyIndex++
}

function undo() {
  if (state.historyIndex > 0) {
    state.historyIndex--
    state.elements = JSON.parse(JSON.stringify(state.history[state.historyIndex]))
    renderScene()
  }
}
```

### 6. Fetch API (gọi backend)

```javascript
// lưu bản vẽ
async function saveBoard(boardId, elements) {
  const res = await fetch('/api/boards/' + boardId, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: elements })
  })
  return res.json()
}
```
