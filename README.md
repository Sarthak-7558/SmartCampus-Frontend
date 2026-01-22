# 🏫 Smart Campus Issue Management System

A **full-stack web application** designed to digitally manage and resolve campus-related issues in a **secure, role-based, and structured manner**.

This project simulates a real-world campus workflow where students raise issues, admins assign them, and staff resolve them — all backed by **JWT authentication and role-based access control**.

---

## 📌 Problem Statement
In many campuses, infrastructure issues (classrooms, hostels, labs, etc.) are reported informally, leading to:
- Lack of tracking
- No accountability
- Delayed resolution

The **Smart Campus Issue Management System** solves this by providing a **centralized, secure platform** for issue tracking and resolution.

---

## 👥 User Roles & Responsibilities

### 🎓 Student
- Login securely
- Raise campus-related issues
- View issues raised by them and their current status

### 🛠 Staff
- View issues assigned to them
- Update issue status (In Progress / Resolved)

### 🧑‍💼 Admin
- View all reported issues
- Assign issues to appropriate staff members

---

## 🔐 Authentication & Security

- **JWT-based stateless authentication**
- **Spring Security** for authorization
- Role information embedded inside JWT
- Backend derives user identity from JWT  
  ❌ No userId is passed from frontend (security best practice)

---

## ⚙️ Core Features

✅ Secure login using email & password  
✅ Role-based dashboards (Student / Admin / Staff)  
✅ Issue creation, assignment, and status updates  
✅ Protected routes and APIs  
✅ Clean layered architecture (Controller → Service → Repository)

---

## 🛠 Tech Stack

### 🌐 Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM

### ⚙️ Backend
- Java
- Spring Boot
- Spring Security
- JWT (JSON Web Tokens)
- Spring Data JPA

### 🗄 Database
- MySQL

### 🔧 Tools
- Git & GitHub
- Postman
- IntelliJ IDEA
- VS Code

---

## 🏗 Architecture Overview


- Stateless backend
- Secure API design
- Clear separation of concerns

---

## 🚀 Project Status

- ✔ Frontend implemented and pushed to GitHub
- ✔ Backend implemented locally using Spring Boot
- 🔄 Deployment in progress (Frontend + Backend + Database)

---

## 🔗 Repositories

- Frontend: https://github.com/Sarthak-7558/SmartCampus-Frontend  
- Backend: https://github.com/Sarthak-7558/SmartCampus-Backend

---

## 📈 Future Enhancements

- Pagination and filtering of issues
- Email notifications
- Status history tracking
- Image uploads for issues
- Docker-based deployment

---

## 📌 Notes
- User registration is currently handled by admin/system setup.
- This approach avoids unauthorized role creation and follows enterprise security practices.
- Can be extended with a public registration flow in future versions.

---

## 🙌 Conclusion
This project helped me gain hands-on experience in:
- Secure backend development
- JWT authentication & authorization
- Full-stack integration
- Real-world system design

Built as part of my learning journey in **Full Stack Development**.
