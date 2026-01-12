import http from '../helpers/http';

const jobService = {
    /**
     * Lấy danh sách jobs (Có hỗ trợ filter)
     * params: { search: '...', location: [], type: [], tags: [] }
     */
    getAll: (params) => {
        return http.get('/jobs', { params });
    },

    /**
     * Tạo mới công việc
     */
    create: (data) => {
        return http.post('/jobs', data);
    },

    /**
     * Cập nhật thông tin công việc (Sử dụng PATCH như Backend)
     */
    update: (id, data) => {
        return http.patch(`/jobs/${id}`, data);
    },

    /**
     * Xóa công việc
     */
    remove: (id) => {
        return http.delete(`/jobs/${id}`);
    }
};

export default jobService;