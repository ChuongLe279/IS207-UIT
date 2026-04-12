/**
 * Tích hợp API cho Hệ thống Quản lý Câu hỏi TOEIC - Phiên bản rút gọn & Sạch
 */

// Đổi sang đường dẫn sạch nhờ .htaccess
const API_BASE_URL = '/api';

/**
 * Lấy tất cả các bài kiểm tra hoạt động để lựa chọn trong danh sách thả xuống
 */
async function getTests() {
    try {
        const response = await fetch(`${API_BASE_URL}/tests`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (!result.success) {
            throw new Error(result.message || 'Failed to fetch tests');
        }

        return result.data || [];
    } catch (error) {
        console.error('Error fetching tests:', error);
        throw error;
    }
}

/**
 * Lấy các đoạn văn được lọc theo test_uuid
 */
async function getPassages(testUuid) {
    try {
        // Sử dụng UUID thay cho ID
        const response = await fetch(`${API_BASE_URL}/passages/${testUuid}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result.data || [];
    } catch (error) {
        console.error('Error fetching passages:', error);
        throw error;
    }
}

/**
 * Tạo một câu hỏi mới
 */
async function createQuestion(formData) {
    try {
        const response = await fetch(`${API_BASE_URL}/questions`, {
            method: 'POST',
            body: formData
        });

        return await response.json();
    } catch (error) {
        console.error('Error creating question:', error);
        throw error;
    }
}

/**
 * Tạo một đoạn văn mới
 */
async function createPassage(formData) {
    try {
        const response = await fetch(`${API_BASE_URL}/passages`, {
            method: 'POST',
            body: formData
        });

        return await response.json();
    } catch (error) {
        console.error('Error creating passage:', error);
        throw error;
    }
}

/**
 * Xóa một câu hỏi
 */
async function deleteQuestion(questionId) {
    try {
        const response = await fetch(`${API_BASE_URL}/questions/${questionId}`, {
            method: 'DELETE'
        });

        return await response.json();
    } catch (error) {
        console.error('Error deleting question:', error);
        throw error;
    }
}

/**
 * Xóa một đoạn văn
 */
async function deletePassage(passageId) {
    try {
        const response = await fetch(`${API_BASE_URL}/passages/${passageId}`, {
            method: 'DELETE'
        });

        return await response.json();
    } catch (error) {
        console.error('Error deleting passage:', error);
        throw error;
    }
}

/**
 * Lấy tất cả các câu hỏi cho một bài kiểm tra
 */
async function getQuestionsByTest(testUuid) {
    try {
        const response = await fetch(`${API_BASE_URL}/questions/${testUuid}`);

        const result = await response.json();
        return result.data || [];
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
    }
}