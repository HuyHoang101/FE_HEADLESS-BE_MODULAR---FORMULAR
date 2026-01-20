import * as db from '../../helpers/db.js';

class JobRepository {
    // Helper để tạo phần SELECT dùng chung cho tất cả các hàm, đảm bảo đồng bộ Alias
    get _standardSelect() {
        return `
            j.id, j.title, j.tags, j.benefits, j.location, j.description,
            j."salaryMin", j."salaryMax", j."employmentType",
            j."createdAt", j."updatedAt",
            c.name as "companyName", 
            c.logo as "companyLogo",
            c.id as "companyId"
        `;
    }

    async findAll({ search, location, type, tag, companyId }) {
        let sql = `SELECT ${this._standardSelect} 
                   FROM jobs j 
                   LEFT JOIN companies c ON j."companyId" = c.id 
                   WHERE j."isActive" = true`;
        
        let params = [];

        if (search) { 
            params.push(`%${search}%`); 
            sql += ` AND (j.title ILIKE $${params.length} OR j.description ILIKE $${params.length})`; 
        }

        if (companyId) {
            params.push(companyId); 
            sql += ` AND j."companyId" = $${params.length}`; // Đã sửa queryText thành sql
        }

        if (location) { 
            const locs = Array.isArray(location) ? location : [location];
            params.push(locs); 
            sql += ` AND j.location = ANY($${params.length})`; 
        }

        if (type) { 
            const types = Array.isArray(type) ? type : [type];
            params.push(types); 
            sql += ` AND j."employmentType" = ANY($${params.length})`; 
        }

        if (tag) { 
            params.push(Array.isArray(tag) ? tag : [tag]); 
            sql += ` AND j.tags @> $${params.length}`; 
        }
        
        const res = await db.query(sql + ` ORDER BY j."updatedAt" DESC`, params);
        return res.rows;
    }

    async findById(id) {
        const sql = `SELECT ${this._standardSelect}
                    FROM jobs j 
                    LEFT JOIN companies c ON j."companyId" = c.id 
                    WHERE j.id = $1`;
        const res = await db.query(sql, [id]);
        return res.rows[0];
    }

    async update(id, fields) {
        const allowed = ['title', 'tags', 'benefits', 'salaryMin', 'salaryMax', 'employmentType', 'description', 'location'];
        const keys = Object.keys(fields).filter(k => allowed.includes(k));
        if (keys.length === 0) return null;

        const setClause = keys.map((k, i) => `"${k}" = $${i + 2}`).join(', ');
        const values = keys.map(k => fields[k]);

        // Sử dụng WITH để JOIN ngay sau khi UPDATE
        const sql = `
            WITH updated_job AS (
                UPDATE jobs SET ${setClause}, "updatedAt" = NOW() 
                WHERE id = $1 RETURNING *
            )
            SELECT ${this._standardSelect.replace(/j\./g, 'uj.')}
            FROM updated_job uj
            LEFT JOIN companies c ON uj."companyId" = c.id
        `;
        
        const res = await db.query(sql, [id, ...values]);
        return res.rows[0];
    }

    async create(d) {
        // Sử dụng WITH để JOIN ngay sau khi INSERT
        const sql = `
            WITH inserted_job AS (
                INSERT INTO jobs ("companyId", title, tags, benefits, "salaryMin", "salaryMax", "employmentType", description, location) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
            )
            SELECT ${this._standardSelect.replace(/j\./g, 'ij.')}
            FROM inserted_job ij
            LEFT JOIN companies c ON ij."companyId" = c.id
        `;
        
        const res = await db.query(sql, [d.companyId, d.title, d.tags, d.benefits, d.salaryMin, d.salaryMax, d.employmentType, d.description, d.location]);
        return res.rows[0];
    }

    async delete(id) { 
        const sql = `DELETE FROM jobs WHERE id = $1`;
        const result = await db.query(sql, [id]); 
        return result.rowCount;
    }
}

export default new JobRepository();