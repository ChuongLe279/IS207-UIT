# System Design

Dự án PrepHub là một Nền tảng Thi thử TOEIC trực tuyến.
- Kiến trúc Client-Server tách biệt hoàn toàn qua RESTful API.
- Cụm Frontend không liên kết trực tiếp vào cơ sở dữ liệu mà giao tiếp với PHP Backend qua luồng JSON.

## Tổng quan lưu lượng toàn cục (User Flow)

[![](https://mermaid.ink/img/pako:eNp9VE1rHDkQ_StCYHDAH9Mz9s7HYUOI92DYBeN495CeOcjdcrfWLWmsltb2zvgQfMgpB5NTTvHELL5kSRZymiHk0Cb_o_9JSlL32OBmh4GWVPWq6r0qaYIjGVM8wEeZPI1SojQ62BkKBL8XGnarq1qZcxSV83_HSCsiEhSl5eL2yRO0vv4zep7S6PiZ0enk7qq4QXdXd5fgIVLr_vRiKHyklRWUmXLxFkwEfP3hEmoDTaP0-2cyRXa_RxIa-lSZTJjYVDRhuaZq5IG1j8PptLgWKYqKLyKZoh2SpxU0huWhJCoeNaVTUA3z_g-KVOX8KxRfzCCikhn1But0T3YfzifWiLLiGiXFx2aaMWfiQWKLcomdAXjazx4RNAvdCRrbdU1wafRpFSUaFCnnMwkKl4tXSNsWeNLNmF0-lkqHzH0qED2LaLb5Zy5FM-Y3IqzyJ6ac3whg9xU01GTUwM7kVDWRs-dTdEBz_Ss0LIwJ6JgXsyhdls2q1LVPpauUObVHEztbb4R3f6jrMSsXl9wOINhg_cq4o9eVa11MHcdV43MeKUqn6Jczwn_fDQ_L-Scnx_zW2P5xdFhcs9H_wMeKcmb41DP9Y3fPD3peLt4jqPWTse1fKgH2-2lGJ4agI6mg7NQqoSUM1hTtkXNOhQ65Ib74Kn113jDVvviGNNUU1_alWiemmIFWxUeIsWTprd7XyX7AOFWhLcH2FMi8dcp840gk3z-Xi5to9AjzzMRMhiJJKdxkWMLcwnwF61sNrpFmUoTLjhazMQIBNqPUnEMzBbD7YOpJdL4O9sIccqZDUS7ejevu3I8BlKeRm9DqjXLeHhhJxUQSQr7X7oJcAStdLv5zKr_zD9f8H-4H6JJXqSuYC7FPc5Pp6gF5kAuQDGlmDyqU96xAfzF6Gp5RjjK4oszxsnznItnMCXuM8K8OXsOJYjEeHJEsp2sYmsGJ3eOJRQyxTimnQzyAZUzU8RAPxQWA4KV4KSXHA3iYAaakSdJ6Y8ZwZekOI4kifBlZURFT9VwaofFgu9VyMfBggs_wYL210Wp1Olu9Vifodvvd7SDoBT-t4XM8CLa6G1vtXqff2m61--1-92IN_-0yBxu9dtDtwb_TbfcDcLn4ASYXYFY?type=png)](https://mermaid.live/edit#pako:eNp9VE1rHDkQ_StCYHDAH9Mz9s7HYUOI92DYBeN495CeOcjdcrfWLWmsltb2zvgQfMgpB5NTTvHELL5kSRZymiHk0Cb_o_9JSlL32OBmh4GWVPWq6r0qaYIjGVM8wEeZPI1SojQ62BkKBL8XGnarq1qZcxSV83_HSCsiEhSl5eL2yRO0vv4zep7S6PiZ0enk7qq4QXdXd5fgIVLr_vRiKHyklRWUmXLxFkwEfP3hEmoDTaP0-2cyRXa_RxIa-lSZTJjYVDRhuaZq5IG1j8PptLgWKYqKLyKZoh2SpxU0huWhJCoeNaVTUA3z_g-KVOX8KxRfzCCikhn1But0T3YfzifWiLLiGiXFx2aaMWfiQWKLcomdAXjazx4RNAvdCRrbdU1wafRpFSUaFCnnMwkKl4tXSNsWeNLNmF0-lkqHzH0qED2LaLb5Zy5FM-Y3IqzyJ6ac3whg9xU01GTUwM7kVDWRs-dTdEBz_Ss0LIwJ6JgXsyhdls2q1LVPpauUObVHEztbb4R3f6jrMSsXl9wOINhg_cq4o9eVa11MHcdV43MeKUqn6Jczwn_fDQ_L-Scnx_zW2P5xdFhcs9H_wMeKcmb41DP9Y3fPD3peLt4jqPWTse1fKgH2-2lGJ4agI6mg7NQqoSUM1hTtkXNOhQ65Ib74Kn113jDVvviGNNUU1_alWiemmIFWxUeIsWTprd7XyX7AOFWhLcH2FMi8dcp840gk3z-Xi5to9AjzzMRMhiJJKdxkWMLcwnwF61sNrpFmUoTLjhazMQIBNqPUnEMzBbD7YOpJdL4O9sIccqZDUS7ejevu3I8BlKeRm9DqjXLeHhhJxUQSQr7X7oJcAStdLv5zKr_zD9f8H-4H6JJXqSuYC7FPc5Pp6gF5kAuQDGlmDyqU96xAfzF6Gp5RjjK4oszxsnznItnMCXuM8K8OXsOJYjEeHJEsp2sYmsGJ3eOJRQyxTimnQzyAZUzU8RAPxQWA4KV4KSXHA3iYAaakSdJ6Y8ZwZekOI4kifBlZURFT9VwaofFgu9VyMfBggs_wYL210Wp1Olu9Vifodvvd7SDoBT-t4XM8CLa6G1vtXqff2m61--1-92IN_-0yBxu9dtDtwb_TbfcDcLn4ASYXYFY)

## Tổng quan kiến trúc hệ thống Client-Server

```text
┌──────────────────────────────────────────────────────┐
│                    Client (Browser)                  │
│  ┌──────────┐   ┌──────────┐ ┌───────────────────┐   │
│  │ Exam UI  │   │ Local    │ │ Component State   │   │
│  │ Rendering│   │ Storage  │ │ (Timer, Sidebar)  │   │
│  └────┬─────┘   └────┬─────┘ └────────┬──────────┘   │
│       └──────────────┴────────────────┘              │
│                      │                               │
│              ┌───────┴───────┐                       │
│              │  API Service  │                       │
│              │  (Fetch API)  │                       │
│              └───────┬───────┘                       │
└──────────────────────┼───────────────────────────────┘
                       │ HTTP (JSON)
┌──────────────────────┼────────────────────────────────┐
│                Server (PHP Dockerized)                │
│  ┌───────────┐  ┌────┴───────┐  ┌──────────────────┐  │
│  │ Router    │  │ Controller │  │ Middleware       │  │
│  │ index.php ├──┤ logic xử lý├──┤ (Auth, RBAC)     │  │
│  └───────────┘  └────┬───────┘  └──────────────────┘  │
│                      │                                │
│              ┌───────┴───────┐                        │
│              │    Model      │                        │
│              │ (PDO wrapper) │                        │
│              └───────┬───────┘                        │
└──────────────────────┼────────────────────────────────┘
                       │ SQL Query
                ┌──────┴──────┐
                │ MySQL 8.0   │
                │  users/tests│
                │  questions  │
                └─────────────┘
```

## Data flow xử lý nghiệp vụ

### Quá trình làm bài & Lưu nháp an toàn (Fail-safe)

```text
User nhấn Bắt đầu → fetch GET `/api/tests/:id/questions` → Client chải component HTML
     ↓
User chọn đáp án A/B/C/D → js bắt sự kiện click → thao tác Highlight thẻ DOM
     ↓
Client ghi trạng thái đáp án đè xuống `localStorage` theo định kỳ (đề phòng F5 rớt mạng)
     ↓
Logic đồng hồ vòng lặp (Timer) giảm lùi song song → Về 0 → Ép force trigger nộp bài
```

### Chấm điểm quy chuẩn (Scoring Pipeline)

```text
User click Submit (hoặc rụng giờ) → Trình duyệt rà map array `answers[]` từ form/cache
     ↓
Client bắn API tới Server endpoint POST `/api/score/submit` kèm payload JSON báo cáo bài làm
     ↓
Server model tra DB, lọc lấy đáp án đúng gốc → Tính tổng số câu chạm mức ĐÚNG (Raw Score)
     ↓
Server map Raw Score thẳng sang ma trận thang điểm TOEIC quốc tế (Listening, Reading)
     ↓
Transaction khóa ghi đè Result vào database bảng `attempts` → Trả về 200 OK + cục chi tiết chữa bài
```

### Authentication & Authorization (Bảo an vòng ngoài)

```text
User submit credential Form → Server hash compare mật khẩu đối khối xuống tầng schema DB
     ↓
Nếu khớp → Server sinh ra chuỗi mã hóa Token (hoặc cấp phát Session ID có móc tags Role)
     ↓
Front-end bám mã này liên tục vào request header của mọi lần gọi
     ↓
Middleware PHP chặn vòng kim cô trước mỗi Controller để dò token
     ↓
Trường hợp API của Admin → check role user! Nếu vi phạm role → Server thẳng thừng ném 403 Forbidden
```

## Khung thiết kế REST API Endpoints

Hệ thống được thiết kế gói gọn trong nhóm endpoints phân nhánh rành mạch:

1. **Khối Auth** (`/api/auth/*`): Đăng ký user, login cấp quyền, hủy phiên logout, truy vấn info profile đang truy cập
2. **Khối Module đề - Tests** (`/api/tests/*`): Trả list đề, trả chi tiết đề thi làm bài, import list json data khổng lồ bằng tài khoản Admin
3. **Khối Xếp hạng - Score** (`/api/score/*`): Hứng cục submit kết quả, tính toán hệ thống và list lại attempt history
4. **Khối Tiền tệ - Payments** (`/api/payments/*`): Fake payment check luồng khóa mở cửa những bộ test tính phí

> Mọi chi tiết liên quan tới tham số Payload Input, code HTTP trả về Output vui lòng dọ theo tài liệu sâu nhất ở mục `task/core/api.md`
