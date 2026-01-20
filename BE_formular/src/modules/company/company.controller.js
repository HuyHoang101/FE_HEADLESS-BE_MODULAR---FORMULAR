import { formatCompany } from "./company.dto.js"
import CompanyService from "./company.service.js"

export const getAll = async (req, res) => {
    try {
        const com = await CompanyService.list();
        res.status(200).json(com.map(formatCompany));
    } catch (e) { res.status(500).json({ error: e.message }); }
};

export const getById = async (req, res) => {
    try {
        const { id } = req.params; 
        
        const com = await CompanyService.findById(id);
        
        if (!com) {
            return res.status(404).json({ message: "Không tìm thấy công việc này" });
        }

        res.status(200).json(formatCompany(com)); 
        
    } catch (e) { 
        res.status(500).json({ error: e.message }); 
    }
};

export const create = async (req, res) => {
    try {
        const created = await CompanyService.add(req.body);
        res.status(200).json(formatCompany(created));
    } catch (e) { res.status(400).json({ error: e.message }); }
};

export const update = async (req, res) => {
    try {
        const updated = await CompanyService.patch(req.params.id, req.body);
        res.status(200).json(formatCompany(updated));
    } catch (e) { res.status(404).json({ error: e.message }); }
};

export const remove = async (req, res) => {
    try { 
        const result = await CompanyService.remove(req.params.id); 

        // Nếu result = 0 hoặc null, nghĩa là ID không tồn tại trong DB
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Company not found!"
            });
        }

        res.status(200).send({
            success: true,
            message: "Delete successfully!"
        }); 
    } catch (e) { res.status(500).json({ error: e.message }); }
};