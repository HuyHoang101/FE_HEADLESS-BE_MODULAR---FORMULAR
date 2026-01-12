-- 1. Tạo bảng Công ty (Job Manager Subsystem - Reference)
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo TEXT,
    email VARCHAR(255),
    phone VARCHAR(20),
    address TEXT
);

-- 2. Tạo bảng Job (Job Applicant Subsystem)
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    companyId INTEGER REFERENCES companies(id),
    title VARCHAR(255) NOT NULL,
    tags TEXT[],             -- Mảng các kỹ năng (React, Nodejs...)
    benefits TEXT[],         -- Mảng các phúc lợi (Remote, Insurance...)
    salaryMin INTEGER,
    salaryMax INTEGER,
    employmentType VARCHAR(50), -- Full-time, Part-time, Internship, Contract
    description TEXT,
    location VARCHAR(100),      -- City hoặc Country
    isActive BOOLEAN DEFAULT true,
    createdAt TIMESTAMP DEFAULT NOW(),
    updatedAt TIMESTAMP DEFAULT NOW()
);

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

-- 4. Chèn dữ liệu mẫu cho Jobs (Mô phỏng các Job thực tế để Search & Filter) [cite: 143, 144, 145]
INSERT INTO jobs (companyId, title, tags, benefits, salaryMin, salaryMax, employmentType, description, location)
SELECT 
    -- CompanyId sẽ chạy từ 1 đến 10
    floor(random() * 10 + 1)::int,
    
    -- Chọn ngẫu nhiên tiêu đề công việc
    (ARRAY[
        'Senior Backend Developer', 'Frontend Engineer (React)', 'DevOps Specialist', 
        'Data Analyst', 'Mobile App Developer', 'AI/ML Researcher', 
        'Fullstack Developer', 'QA Automation Engineer', 'Solution Architect', 'Security Engineer'
    ])[floor(random() * 10 + 1)],
    
    -- Trộn các bộ Tags kỹ thuật
    (ARRAY[
        ARRAY['Nodejs', 'Postgres', 'AWS'],
        ARRAY['React', 'TypeScript', 'NextJS'],
        ARRAY['Python', 'Tensorflow', 'SQL'],
        ARRAY['Docker', 'Kubernetes', 'CI/CD'],
        ARRAY['Flutter', 'Dart', 'Firebase'],
        ARRAY['Java', 'Spring Boot', 'Microservices'],
        ARRAY['Golang', 'Redis', 'Kafka'],
        ARRAY['PHP', 'Laravel', 'VueJS'],
        ARRAY['C#', '.NET Core', 'Azure'],
        ARRAY['Swift', 'iOS', 'Objective-C']
    ])[floor(random() * 10 + 1)],
    
    -- Trộn các phúc lợi
    (ARRAY[
        ARRAY['Remote', 'Insurance 100%'],
        ARRAY['Macbook Pro', 'Annual Bonus'],
        ARRAY['Flexible hours', 'Gym Membership'],
        ARRAY['Free Lunch', 'Stock Options'],
        ARRAY['Global Team', 'Travel Opportunities']
    ])[floor(random() * 5 + 1)],
    
    -- Lương ngẫu nhiên từ 800 - 2500
    (800 + floor(random() * 1700))::int,
    -- Lương Max ngẫu nhiên từ 2600 - 5000
    (2600 + floor(random() * 2400))::int,
    
    -- Hình thức làm việc
    (ARRAY['Full-time', 'Contract', 'Freelance', 'Internship'])[floor(random() * 4 + 1)],
    
    -- 10 mẫu mô tả công việc khác nhau trộn với biến i
    (ARRAY[
        'Phát triển hệ thống microservices hiệu năng cao. Mã số: ',
        'Thiết kế giao diện người dùng tối ưu trải nghiệm. Mã số: ',
        'Xây dựng hạ tầng đám mây và quy trình triển khai tự động. Mã số: ',
        'Phân tích dữ liệu lớn và dự báo xu hướng thị trường. Mã số: ',
        'Xây dựng ứng dụng di động đa nền tảng cho hàng triệu người dùng. Mã số: ',
        'Nghiên cứu các thuật toán học máy tối ưu cho hệ thống gợi ý. Mã số: ',
        'Bảo trì và nâng cấp các module cũ sang kiến trúc mới. Mã số: ',
        'Kiểm thử tự động và đảm bảo chất lượng phần mềm trước khi release. Mã số: ',
        'Tư vấn giải pháp kiến trúc hệ thống cho các dự án Fintech. Mã số: ',
        'Đảm bảo an mật và phòng chống tấn công cho hệ thống ngân hàng. Mã số: '
    ])[floor(random() * 10 + 1)] || i,
    
    -- Địa điểm
    (ARRAY['Vietnam', 'Singapore', 'Thailand', 'Remote', 'Japan', 'USA'])[floor(random() * 6 + 1)]

FROM generate_series(4, 100) AS i;