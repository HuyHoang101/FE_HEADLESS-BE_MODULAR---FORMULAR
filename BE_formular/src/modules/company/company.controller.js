import { formatCompany } from "./company.dto.js"
import CompanyService from "./company.service.js"

export const getAll = async (req, res) => {
    try {
        const com = await CompanyService.list();
        res.json(com.map(formatCompany));
    } catch (e) { res.status(500).json({ error: e.message }); }
};

export const create = async (req, res) => {
    try {
        const created = await CompanyService.add(req.body);
        res.status(201).json(formatCompany(created));
    } catch (e) { res.status(400).json({ error: e.message }); }
};

export const update = async (req, res) => {
    try {
        const updated = await CompanyService.patch(req.params.id, req.body);
        res.json(formatCompany(updated));
    } catch (e) { res.status(404).json({ error: e.message }); }
};

export const remove = async (req, res) => {
    try { await CompanyService.remove(req.params.id); res.status(204).send(); }
    catch (e) { res.status(500).json({ error: e.message }); }
};