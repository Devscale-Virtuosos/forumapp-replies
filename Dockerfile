# Menggunakan image Node.js sebagai base image
FROM node:lts

# Menetapkan direktori kerja di dalam container
WORKDIR /app

# Menyalin package.json dan pnpm-lock.yaml (jika ada)
COPY package*.json pnpm-lock.yaml ./

# Menginstall pnpm
RUN npm install -g pnpm

# Menginstall dependensi menggunakan pnpm
RUN pnpm install

# Menyalin seluruh kode sumber ke dalam container
COPY . .

# Jika Anda menggunakan TypeScript, tambahkan langkah build
# RUN pnpm run build

# Menentukan port yang akan digunakan oleh aplikasi
EXPOSE 3000

# Menjalankan aplikasi
CMD ["pnpm", "run", "dev"]
