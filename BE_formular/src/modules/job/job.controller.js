import JobService from './job.service.js';
import { formatJob } from './job.dto.js';

export const getAll = async (req, res) => {
    try {
        const jobs = await JobService.list(req.query);
        res.json(jobs.map(formatJob));
    } catch (e) { res.status(500).json({ error: e.message }); }
};

export const create = async (req, res) => {
    try {
        const created = await JobService.add(req.body);
        res.status(201).json(formatJob(created));
    } catch (e) { res.status(400).json({ error: e.message }); }
};

export const update = async (req, res) => {
    try {
        const updated = await JobService.patch(req.params.id, req.body);
        res.json(formatJob(updated));
    } catch (e) { res.status(404).json({ error: e.message }); }
};

export const remove = async (req, res) => {
    try { await JobService.remove(req.params.id); res.status(204).send(); }
    catch (e) { res.status(500).json({ error: e.message }); }
};