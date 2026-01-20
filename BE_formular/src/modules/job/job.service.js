import JobRepository from './job.repository.js';

class JobService {
    async list(q) { return await JobRepository.findAll(q); }

    async findById(id) { return await JobRepository.findById(id); }

    async add(d) { 
        if (d.salaryMin > d.salaryMax) throw new Error("Min > Max Salary");
        return await JobRepository.create(d); 
    }

    async patch(id, data) {
        const job = await JobRepository.findById(id);
        if (!job) throw new Error("Job not found");
        return await JobRepository.update(id, data);
    }
    
    async remove(id) { return await JobRepository.delete(id); }
}

export default new JobService();