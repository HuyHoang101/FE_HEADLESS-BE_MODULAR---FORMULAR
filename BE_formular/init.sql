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
('DEVision Tech (Premium)', 'https://logo.com/devision', 'contact@devision.com', '0901234567', '123 Tech Street, HCMC, Vietnam'),
('RMIT Solution (Premium)', 'https://logo.com/rmit', 'contact@rmit.edu.vn', '0901234568', '123 Education Street, HCMC, Vietnam'),
('Freemium Startup A', 'https://logo.com/startup-a', 'contact@startup-a.com', '0901234569', '123 Startup Street, HCMC, Vietnam'),
('Freemium Startup B', 'https://logo.com/startup-b', 'contact@startup-b.com', '0901234570', '123 Startup Street, HCMC, Vietnam');

-- 4. Chèn dữ liệu mẫu cho Jobs (Mô phỏng các Job thực tế để Search & Filter) [cite: 143, 144, 145]
INSERT INTO jobs (companyId, title, tags, benefits, salaryMin, salaryMax, employmentType, description, location) VALUES 
(1, 'Backend Developer', ARRAY['Nodejs', 'Postgres', 'Docker'], ARRAY['Remote', 'Bonus 13th'], 1500, 2500, 'Full-time', 'Phát triển hệ thống Job Applicant', 'Vietnam'),
(1, 'Full-time Intern Software Engineer', ARRAY['React', 'Spring Boot', 'Docker'], ARRAY['Training'], 850, 900, 'Internship', 'Yêu cầu cho Premium Company', 'Vietnam'),
(2, 'Data Engineer', ARRAY['Python', 'AWS', 'Snowflake'], ARRAY['Laptop'], 1300, 3000, 'Contract', 'Phân tích dữ liệu lớn', 'Singapore');