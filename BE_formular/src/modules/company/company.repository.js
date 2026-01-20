import * as db from '../../helpers/db.js';

class CompanyRepository {
    // Helper để liệt kê các trường, đảm bảo luôn trả về camelCase
    get _standardSelect() {
        return `
            id, name, logo, email, phone, address, 
            "createdAt", 
            "updatedAt"
        `;
    }

    async findAll() {
        // Luôn sử dụng nháy kép cho các trường camelCase
        let sql = `SELECT ${this._standardSelect} FROM companies`;
        
        // Sắp xếp theo thời gian tạo mới nhất
        const res = await db.query(sql + ` ORDER BY "createdAt" DESC`);
        return res.rows;
    }

    async findById(id) {
        // Tránh dùng SELECT *, liệt kê rõ để đồng bộ DTO
        const sql = `SELECT ${this._standardSelect} FROM companies WHERE id = $1`;
        const res = await db.query(sql, [id]);
        return res.rows[0];
    }

    async update(id, fields) {
        const allowed = ['name', 'logo', 'email', 'phone', 'address'];
        const keys = Object.keys(fields).filter(k => allowed.includes(k));
        if (keys.length === 0) return null;

        // "k" được bọc trong nháy kép để an toàn với Postgres
        const setClause = keys.map((k, i) => `"${k}" = $${i + 2}`).join(', ');
        const values = keys.map(k => fields[k]);
        
        // Sử dụng RETURNING với danh sách các cột chuẩn
        const sql = `UPDATE companies 
                     SET ${setClause}, "updatedAt" = NOW() 
                     WHERE id = $1 
                     RETURNING ${this._standardSelect}`;
        
        const res = await db.query(sql, [id, ...values]);
        return res.rows[0];
    }

    async create(d) {
        // Fix: Thêm đầy đủ RETURNING và truyền mảng tham số [values]
        const sql = `INSERT INTO companies (name, logo, email, phone, address) 
                     VALUES ($1, $2, $3, $4, $5) 
                     RETURNING ${this._standardSelect}`;
        
        // Fix: Truyền d.name, d.logo... thay vì mảng rỗng []
        const res = await db.query(sql, [
            d.name, 
            d.logo, 
            d.email, 
            d.phone, 
            d.address
        ]);
        return res.rows[0];
    }

    async delete(id) { 
        const sql = `DELETE FROM companies WHERE id = $1`;
        await db.query(sql, [id]); 
    }
}

export default new CompanyRepository();