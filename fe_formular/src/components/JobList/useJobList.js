import { useState, useEffect } from 'react';
import jobService from '../../services/jobService';

export const useJobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingJob, setEditingJob] = useState(null); // Lưu job đang được sửa
    const [filters, setFilters] = useState({ search: '', location: '', type: [] });


    // Logic Xem chi tiết công việc (View Detail) -
    const [selectedJob, setSelectedJob] = useState(null);
    const handleViewDetail = (job) => {
        setSelectedJob(job);
    };
    const closeDetail = () => {
        setSelectedJob(null);
    };


    // Logic Lấy danh sách công việc với Filter/Search [cite: 127, 128, 129]
    const fetchJobs = async () => {
        setLoading(true);
        try {
            const data = await jobService.getAll(filters);
            setJobs(data);
        } catch (error) { console.error("Fetch error:", error); }
        finally { setLoading(false); }
    };
    useEffect(() => { fetchJobs(); }, []);

    // Logic Xóa (Delete) - 
    const handleDelete = async (id) => {
        try {
            await jobService.remove(id); // Gọi API xóa từ service 
            
            // Cập nhật lại UI ngay lập tức bằng cách lọc bỏ job vừa xóa
            setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
            
            alert("Xóa công việc thành công!");
        } catch (error) {
            console.error("Lỗi khi xóa job:", error);
            alert("Không thể xóa công việc. Vui lòng thử lại.");
        }
    };

    // Logic Thêm/Sửa (Create/Update) - [cite: 157, 174]
    const handleSave = async (formData) => {
        try {
            if (editingJob) {
                const updated = await jobService.update(editingJob.id, formData);
                setJobs(prev => prev.map(j => j.id === editingJob.id ? updated : j));
            } else {
                const created = await jobService.create(formData);
                setJobs(prev => [created, ...prev]);
            }
            setEditingJob(null); // Đóng form sau khi lưu
        } catch (error) { alert("Save failed: " + error.message); }
    };

    return { 
        jobs, loading, filters, setFilters, 
        fetchJobs, handleDelete, handleSave, 
        editingJob, setEditingJob,
        selectedJob, handleViewDetail, closeDetail
    };
};