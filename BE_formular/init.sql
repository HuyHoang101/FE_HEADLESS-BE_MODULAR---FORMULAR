
-- 1. Tạo bảng Companies
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    logo TEXT,
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT,
    "createdAt" TIMESTAMP DEFAULT NOW(), -- Bắt buộc có ngoặc kép
    "updatedAt" TIMESTAMP DEFAULT NOW()  -- Bắt buộc có ngoặc kép
);

-- 2. Tạo bảng Jobs
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "companyId" UUID REFERENCES companies(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    tags TEXT[],
    benefits TEXT[],
    "salaryMin" INTEGER,      -- Giữ nguyên chữ M viết hoa
    "salaryMax" INTEGER,      -- Giữ nguyên chữ M viết hoa
    "employmentType" VARCHAR(50), -- Giữ nguyên chữ T viết hoa
    description TEXT,
    location VARCHAR(100),
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

TRUNCATE TABLE jobs, companies RESTART IDENTITY CASCADE;

-- 3. Chèn dữ liệu mẫu cho Companies (Yêu cầu 4 công ty: 2 Premium, 2 Freemium) [cite: 142]
INSERT INTO companies (name, logo, email, phone, address) VALUES 
('DEVision Tech', 'https://img.freepik.com/free-vector/gradient-abstract-technology-company-logotype_52683-9702.jpg?semt=ais_hybrid&w=740&q=80', 'contact@devision.com', '0901234567', '123 Tech Street, HCMC, Vietnam'),
('RMIT Solution', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRK_KZOd7CHFqlRAD66KJoRPLXldV66sFIsQ&s', 'contact@rmit.edu.vn', '0901234568', '123 Education Street, HCMC, Vietnam'),
('Freemium Startup A', 'https://static.vecteezy.com/system/resources/thumbnails/008/214/517/small_2x/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg', 'contact@startup-a.com', '0901234569', '123 Startup Street, HCMC, Vietnam'),
('Freemium Startup B', 'https://www.shutterstock.com/image-illustration/infinity-logo-design-two-interconnected-600nw-2576179009.jpg', 'contact@startup-b.com', '0901234570', '123 Startup Street, HCMC, Vietnam'),
('Global Outsourcing Corp', 'https://images-platform.99static.com//WnnxETQYaEVDQZxa1ZVZVZjtO-4=/317x274:817x774/fit-in/590x590/99designs-contests-attachments/67/67571/attachment_67571500', 'hr@globalout.com', '0911222333', '456 High-Tech Park, Da Nang, Vietnam'),
('Fintech Innovation Hub', 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/company-logo-design-template-7e22d4c04e6d781fc011fd09b2cc7ea3_screen.jpg?ts=1672287142', 'hello@fintechhub.sg', '0658888999', 'Marina Bay Financial Centre, Singapore'),
('Green Energy Solutions', 'https://img.freepik.com/premium-vector/minimalist-type-creative-business-logo-template_1283348-23106.jpg?semt=ais_hybrid&w=740&q=80', 'jobs@greenenergy.com', '0922333444', '789 Eco Way, Hanoi, Vietnam'),
('Cyber Security Ops', 'https://static.vecteezy.com/system/resources/previews/047/711/961/non_2x/abstract-logo-design-for-any-corporate-brand-business-company-vector.jpg', 'security@cyberops.com', '0933444555', 'District 1, HCMC, Vietnam'),
('E-Commerce Giant', 'https://static.vecteezy.com/system/resources/previews/047/285/055/non_2x/abstract-logo-design-for-any-corporate-brand-business-company-vector.jpg', 'talent@ecomgiant.com', '0944555666', 'Bangkok, Thailand'),
('AI Research Lab', 'https://img.freepik.com/free-vector/abstract-company-logo_53876-120501.jpg?semt=ais_hybrid&w=740&q=80', 'research@ailab.io', '0955666777', 'Silicon Valley, California, USA');

-- 4. Chèn dữ liệu mẫu cho Jobs (Đã sửa lỗi kiểu dữ liệu Array và Text)
WITH company_data AS (
    -- Gom tất cả ID công ty vào 1 mảng duy nhất
    SELECT array_agg(id) AS id_list FROM companies
)
INSERT INTO jobs ("companyId", title, tags, benefits, "salaryMin", "salaryMax", "employmentType", description, location)
SELECT 
    -- [GIẢI PHÁP]: Lấy mảng ID ra -> Random index từ 1 đến độ dài mảng -> Lấy ID tại vị trí đó
    (SELECT id_list FROM company_data)[floor(random() * array_length((SELECT id_list FROM company_data), 1) + 1)],
    
    (ARRAY[
        'Senior Backend Developer', 'Frontend Engineer (React)', 'DevOps Specialist', 
        'Data Analyst', 'Mobile App Developer', 'AI/ML Researcher', 
        'Fullstack Developer', 'QA Automation Engineer', 'Solution Architect', 'Security Engineer'
    ])[floor(random() * 10 + 1)],
    
    (ARRAY[
        '{Nodejs, Postgres, AWS}', '{React, TypeScript, NextJS}', '{Python, Tensorflow, SQL}',
        '{Docker, Kubernetes, CI/CD}', '{Flutter, Dart, Firebase}', '{Java, Spring Boot, Microservices}',
        '{Golang, Redis, Kafka}', '{PHP, Laravel, VueJS}', '{C#, .NET Core, Azure}', '{Swift, iOS, Objective-C}'
    ])[floor(random() * 10 + 1)]::text[],
    
    (ARRAY[
        '{Remote, Insurance 100%}', '{Macbook Pro, Annual Bonus}', '{Flexible hours, Gym Membership}',
        '{Free Lunch, Stock Options}', '{Global Team, Travel Opportunities}'
    ])[floor(random() * 5 + 1)]::text[],
    
    (800 + floor(random() * 1700))::int,
    (2600 + floor(random() * 2400))::int,
    
    (ARRAY['Full-time', 'Contract', 'Freelance', 'Internship'])[floor(random() * 4 + 1)],
    
    'Mô tả công việc chi tiết. Mã job: ' || i::text, 
    
    (ARRAY['Vietnam', 'Singapore', 'Thailand', 'Remote', 'Japan', 'USA'])[floor(random() * 6 + 1)]

FROM generate_series(1, 100) AS i;