import * as db from '../../helpers/db.js';

class JobRepository {
    async findAll({ search, location, type, tags, companyId }) {
        // 1. KHỞI TẠO CÂU LỆNH SQL GỐC
        // Sử dụng AS "tênTrường" (Alias) để ép Postgres giữ nguyên chữ hoa (Ví dụ: salaryMin).
        // Điều này giúp Code DTO không bị lỗi 'undefined' khi truy cập dữ liệu.
        let sql = `SELECT j.id, j.title, j.tags, j.benefits, j.location,
                j.salaryMin AS "salaryMin", 
                j.salaryMax AS "salaryMax", 
                j.employmentType AS "employmentType",
                j.createdAt AS "createdAt",
                j.updatedAt AS "updatedAt",
                c.name as "companyName", 
                c.logo as "companyLogo",
                c.id as "companyId" 
                FROM jobs j 
                LEFT JOIN companies c ON j.companyId = c.id 
                WHERE j.isActive = true`;
        
        // Mảng chứa các giá trị thực tế để truyền vào query (Tránh SQL Injection)
        let params = [];

        // 2. LỌC THEO TỪ KHÓA (SEARCH)
        if (search) { 
            // Thêm % ở hai đầu để tìm kiếm cụm từ nằm bất kỳ đâu trong văn bản
            params.push(`%${search}%`); 
            // ILIKE: Tìm kiếm không phân biệt hoa thường. 
            // $${params.length}: Tự động đánh số tham số theo thứ tự ($1, $2, ...)
            sql += ` AND (j.title ILIKE $${params.length} OR j.description ILIKE $${params.length})`; 
        }

        if (companyId) {
            params.push(companyId); 
            queryText += ` AND j."companyId" = $${params.length}`;
        }

        // 3. LỌC THEO ĐỊA ĐIỂM (LOCATION) - HỖ TRỢ CHỌN NHIỀU
        if (location) { 
            // Nếu người dùng gửi 1 địa điểm (string), biến nó thành mảng để dùng chung logic
            const locs = Array.isArray(location) ? location : [location];
            params.push(locs); 
            // '= ANY($n)': Tìm những dòng có location nằm trong danh sách mảng truyền vào
            sql += ` AND j.location = ANY($${params.length})`; 
        }

        // 4. LỌC THEO LOẠI HÌNH (TYPE) - HỖ TRỢ CHỌN NHIỀU
        if (type) { 
            const types = Array.isArray(type) ? type : [type];
            params.push(types); 
            sql += ` AND j.employmentType = ANY($${params.length})`; 
        }

        // 5. LỌC THEO KỸ NĂNG (TAGS) - DẠNG MẢNG TRONG DB
        if (tags) { 
            // Đảm bảo tags luôn là mảng để Postgres xử lý
            params.push(Array.isArray(tags) ? tags : [tags]); 
            // '@>': Toán tử "Chứa" (Mảng trong DB phải chứa TẤT CẢ các tags yêu cầu)
            sql += ` AND j.tags @> $${params.length}`; 
        }
        
        // 6. THỰC THI QUERY VÀ TRẢ VỀ KẾT QUẢ
        // Luôn sắp xếp theo thời gian mới nhất lên đầu
        const res = await db.query(sql + ` ORDER BY j.createdAt DESC`, params);
        return res.rows;
    }

    async getAllRaw() {
        const sql = `SELECT j.id, j.title, j.tags, j.benefits, j.location,
                    j.salaryMin AS "salaryMin", 
                    j.salaryMax AS "salaryMax", 
                    j.employmentType AS "employmentType",
                    j.createdAt AS "createdAt",
                    c.name as "companyName", 
                    c.logo as "companyLogo" 
                    FROM jobs j 
                    LEFT JOIN companies c ON j.companyId = c.id 
                    WHERE j.isActive = true
                    ORDER BY j.createdAt DESC`;
        
        const res = await db.query(sql);
        return res.rows;
    }

    async findById(id) {
        const res = await db.query('SELECT * FROM jobs WHERE id = $1', [id]);
        return res.rows[0];
    }

    async update(id, fields) {
        const allowed = ['title', 'tags', 'benefits', 'salaryMin', 'salaryMax', 'employmentType', 'description', 'location'];
        const keys = Object.keys(fields).filter(k => allowed.includes(k));
        if (keys.length === 0) return null;

        const setClause = keys.map((k, i) => `"${k}" = $${i + 2}`).join(', ');
        const values = keys.map(k => fields[k]);
        const sql = `UPDATE jobs SET ${setClause}, "updatedAt" = NOW() WHERE id = $1 RETURNING *`;
        
        const res = await db.query(sql, [id, ...values]);
        return res.rows[0];
    }

    async create(d) {
        const sql = `INSERT INTO jobs (companyId, title, tags, benefits, salaryMin, salaryMax, employmentType, description, location) 
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
        const res = await db.query(sql, [d.companyId, d.title, d.tags, d.benefits, d.salaryMin, d.salaryMax, d.employmentType, d.description, d.location]);
        return res.rows[0];
    }

    async delete(id) { 
        const sql = `DELETE FROM jobs WHERE id = $1`;
        await db.query(sql, [id]); 
    }
}

export default new JobRepository();