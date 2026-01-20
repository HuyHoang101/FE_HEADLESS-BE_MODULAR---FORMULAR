import JobService from './job.service.js';
import { formatJob } from './job.dto.js';

export const getAll = async (req, res) => {
    try {
        const jobs = await JobService.list(req.query);
        res.status(200).json(jobs.map(formatJob));
    } catch (e) { res.status(500).json({ error: e.message }); }
};

export const getById = async (req, res) => {
    try {
        // Lấy id từ URL: /api/jobs/:id
        const { id } = req.params; 
        
        const job = await JobService.findById(id);
        
        if (!job) {
            return res.status(404).json({ message: "Không tìm thấy công việc này" });
        }

        // Trả về 1 object duy nhất (đã qua format), không phải mảng []
        res.status(200).json(formatJob(job)); 
        
    } catch (e) { 
        res.status(500).json({ error: e.message }); 
    }
};

export const create = async (req, res) => {
    try {
        const created = await JobService.add(req.body);
        res.status(200).json(formatJob(created));
    } catch (e) { res.status(400).json({ error: e.message }); }
};

export const update = async (req, res) => {
    try {
        const updated = await JobService.patch(req.params.id, req.body);
        res.status(200).json(formatJob(updated));
    } catch (e) { res.status(404).json({ error: e.message }); }
};

export const remove = async (req, res) => {
    try { 
        const result = await JobService.remove(req.params.id); 

        // Nếu result = 0 hoặc null, nghĩa là ID không tồn tại trong DB
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Job not found!"
            });
        }

        // Trả về 200 và một JSON rỗng hoặc thông báo thành công
        res.status(200).json({ 
            success: true, 
            message: "Delete successfully!" 
        }); 
    }
    catch (e) { 
        res.status(500).json({ error: e.message }); 
    }
};