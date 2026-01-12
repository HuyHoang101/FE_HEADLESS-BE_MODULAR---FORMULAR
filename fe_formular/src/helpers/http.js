import axios from 'axios';

const http = axios.create({
    // Cấu hình URL gốc của Backend
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    // Bạn có thể thêm timeout nếu cần
    timeout: 10000, 
});

// Xử lý dữ liệu trả về hoặc lỗi tập trung (Optional)
http.interceptors.response.use(
    (response) => response.data, // Chỉ lấy data từ axios, không cần gọi .data ở service nữa
    (error) => {
        // Log lỗi hoặc bắn thông báo ra màn hình tại đây
        console.error('API Error:', error.response?.data?.error || error.message);
        return Promise.reject(error);
    }
);

export default http;