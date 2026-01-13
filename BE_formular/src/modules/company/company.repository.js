import * as db from '../../helpers/db.js';

class CompanyRepository {
    async findAll() {
        // 1. KHỞI TẠO CÂU LỆNH SQL GỐC
        // Sử dụng AS "tênTrường" (Alias) để ép Postgres giữ nguyên chữ hoa (Ví dụ: salaryMin).
        // Điều này giúp Code DTO không bị lỗi 'undefined' khi truy cập dữ liệu.
        let sql = `SELECT c.id,
                c.name, c.logo,
                c.email, c.phone, c.address,
                c.createdAt AS "createdAt",
                c.updatedAt AS "updatedAt"
                FROM companies c`;
        
        const res = await db.query(sql + ` ORDER BY c.createdAt DESC`);
        return res.rows;
    }

    async findById(id) {
        const res = await db.query('SELECT * FROM companies WHERE id = $1', [id]);
        return res.rows[0];
    }

    async update(id, fields) {
        const allowed = ['name', 'logo', 'email', 'phone', 'address'];
        const keys = Object.keys(fields).filter(k => allowed.includes(k));
        if (keys.length === 0) return null;

        const setClause = keys.map((k, i) => `"${k}" = $${i + 2}`).join(', ');
        const values = keys.map(k => fields[k]);
        const sql = `UPDATE companyes SET ${setClause}, "updatedAt" = NOW() WHERE id = $1 RETURNING *`;
        
        const res = await db.query(sql, [id, ...values]);
        return res.rows[0];
    }

    async create(d) {
        const sql = `INSERT INTO companies (name, logo, email, phone, address) 
                     VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const res = await db.query(sql, []);
        return res.rows[0];
    }

    async delete(id) { 
        const sql = `DELETE FROM companies WHERE id = $1`;
        await db.query(sql, [id]); 
    }
}

export default new CompanyRepository();