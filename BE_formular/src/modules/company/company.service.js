import CompanyRepository from "./company.repository.js";

class CompanyService {
    async list() { return await CompanyRepository.findAll(); }

    async add(d) { 
        return await CompanyRepository.create(d); 
    }

    async patch(id, data) {
        const com = await CompanyRepository.findById(id);
        if (!com) throw new Error("Company not found");
        return await CompanyRepository.update(id, data);
    }
    
    async remove(id) { return await CompanyRepository.delete(id); }
}

export default new CompanyService();