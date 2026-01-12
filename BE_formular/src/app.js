import express from 'express';
import cors from 'cors';
// Import trực tiếp các controller xử lý logic
import * as jobCtrl from './modules/job/job.controller.js';

const app = express();

// Middleware để xử lý dữ liệu JSON từ request body
app.use(express.json());

// Cho phép tất cả các nguồn (origins) truy cập - phù hợp cho môi trường học tập
app.use(cors());

// --- Các Route API ---

// Lấy danh sách hoặc tìm kiếm công việc
app.get('/api/jobs', jobCtrl.getAll);

// Tạo mới một công việc
app.post('/api/jobs', jobCtrl.create);

// Cập nhật một phần thông tin công việc theo ID
app.patch('/api/jobs/:id', jobCtrl.update);

// Xóa (hoặc vô hiệu hóa) công việc theo ID
app.delete('/api/jobs/:id', jobCtrl.remove);

// Lấy cổng từ biến môi trường (Docker) hoặc mặc định là 3000 (máy thật)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Test your API at http://localhost:${PORT}/api/jobs`);
});