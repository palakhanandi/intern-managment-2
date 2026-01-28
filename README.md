# Intern Management Dashboard

A **role-based intern management system** built with **React + Vite**, **Firebase Authentication**, and **Supabase** for backend data storage. The application provides separate **Admin** and **Intern** dashboards with features like intern management, task management, attendance, certificates, and reports.

---

## 🚀 Tech Stack

### Frontend
- React 19 (Vite)
- React Router DOM v7
- Tailwind CSS
- shadcn/ui
- Lucide Icons

### Backend / Services
- Firebase Authentication
- Firestore (role metadata)
- Supabase (PostgreSQL database)

### Tooling
- Vite
- ESLint
- PostCSS
- TailwindCSS

---

## 📁 Project Structure
intern-managment-2-main/
├── public/
├── src/
│ ├── components/ # Reusable UI components
│ ├── layouts/ # AdminLayout, InternLayout
│ ├── pages/ # Dashboard pages
│ ├── lib/
│ │ └── supabase.js # Supabase client
│ ├── firebase.jsx # Firebase configuration
│ ├── App.jsx
│ └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── .env

---

## ⚙️ Prerequisites

- Node.js >= 18
- npm or yarn
- Firebase Setup
- Supabase Setup

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/palakhanandi/intern-managment-2?utm_source=oss&utm_medium=github&utm_campaign=palakhanandi%2Fintern-managment-2&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)
