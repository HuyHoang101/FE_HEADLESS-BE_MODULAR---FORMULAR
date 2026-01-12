# [cite_start]Sử dụng Node.js phiên bản 22 nhẹ và ổn định [cite: 1]
FROM node:22-alpine

# Tạo thư mục làm việc trong container
WORKDIR /app

# Copy file định nghĩa thư viện trước để tận dụng cache của Docker
COPY package*.json ./

# Cài đặt các thư viện (dependencies)
RUN npm install

# [cite_start]Copy toàn bộ mã nguồn vào container [cite: 2]
COPY . .

# Mở cổng 3000 để truy cập từ bên ngoài
EXPOSE 3000

# Lệnh chạy ứng dụng khi container khởi động
CMD ["node", "src/app.js"]