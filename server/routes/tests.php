<?php

require_once __DIR__ . '/../controllers/test-controller.php';

// ở biến $method và $part, vì file api.php nó import file tests.php,
// nên là tất cả các biến trong api.php đều có thể được sử dụng trong file tests.php

if ($method === 'GET') {
    // GET /api/tests/{id} -> Lấy chi tiết đề thi
    if (isset($parts[1]) && is_numeric($parts[1])) {
        require_once __DIR__ . '/../middleware/auth.php';
        requireAuth(); // Yêu cầu đăng nhập mới được xem chi tiết câu hỏi
        getTestCore($parts[1]);
    } 
    // GET /api/tests -> Lấy danh sách đề thi
    else {
        getTestList();
    }
} else {
    sendError("Phương thức không được hỗ trợ cho Tests", 405);
}