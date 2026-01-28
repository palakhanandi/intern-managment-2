# Project Documentation – InternSphere

## Project Overview
InternSphere is a role-based Intern Management System that manages interns end-to-end, including intern onboarding, task management, attendance tracking, learning resources, support queries, and certificate generation.

---

## Problem Statement
Manual management of interns is inefficient and error-prone. Tracking intern tasks, attendance, and performance becomes difficult as the number of interns increases.

---

## Objectives
- Automate intern management
- Enforce role-based access control (RBAC)
- Track intern tasks and attendance
- Improve intern performance evaluation
- Efficient Certificate generation

---


## User Roles
- **Admin**: Full system access
- **Intern**: Limited access

---

## System Architecture
The frontend is built using React (Vite). Authentication is handled using Firebase Authentication. Supabase PostgreSQL is used as the database with Row Level Security (RLS) enabled. The application is deployed on Vercel.

---

## Technology Stack
- React (Vite)
- Tailwind CSS & shadcn/ui
- Supabase (PostgreSQL)
- Firebase Authentication
- Vercel

---

## Installation Steps
1. Clone the repository
2. Install dependencies using `npm install`
3. Configure environment variables
4. Run the project using `npm run dev`

---

## Security Measures
- Row Level Security (RLS)
- Environment variables protection
- Role-based API access control

---


## Future Enhancements
- Advanced analytics dashboard
- Real-time notifications
- Mobile application support

---

## Conclusion
InternSphere provides a secure and scalable solution for efficient intern management, reducing manual effort and improving transparency.
