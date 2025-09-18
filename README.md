# 🚀 Laravel + React + Inertia.js Admin Panel

A starter admin panel built with **Laravel**, **React**, and **Inertia.js**.  
This project demonstrates how to integrate a Laravel backend with a React frontend using Inertia, including **authentication** and **basic CRUD operations**.

---

## 📌 Features
- 🔑 Admin Authentication (Login/Logout)
- 👤 User Management (Create, Read, Update, Delete)
- 📄 Pagination with Inertia
- ✅ Client & Server Validation
- 🎨 TailwindCSS UI
- 🔔 React Toastify for flash messages

---

## 🛠️ Tech Stack
- [Laravel 10](https://laravel.com/)
- [React 18](https://react.dev/)
- [Inertia.js](https://inertiajs.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction)

---

## ⚙️ Installation

### 1. Clone Repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
npm run dev


Default Admin User
After seeding, you can login with:

Email: admin@example.com
Password: password