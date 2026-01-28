# Database Schema 

This document describes the database schema used in the Intern Management System.  
The database is implemented using **Supabase (PostgreSQL)** .

---

## Users Table
Stores authenticated user details from Firebase.

| Column | Type | Description |
|------|------|------------|
| firebase_uid | text (PK) | Firebase user ID |
| email | text | User email |
| name | text | User name |
| role | text | admin / intern |
| domain | text | Intern domain |
| created_at | timestamp | Account creation time |

---

## Interns Table
Stores internship-related information.

| Column | Type | Description |
|------|------|------------|
| id | uuid (PK) | Intern ID |
| name | text | Intern name |
| email | text | Intern email |
| domain | text | Internship domain |
| start_date | date | Internship start date |
| duration | text | Internship duration |
| firebase_uid | text | Linked Firebase user |
| created_at | timestamp | Record creation time |

---

## Tasks Table
Stores tasks created by Admin and assigned to interns.

| Column | Type | Description |
|------|------|------------|
| id | uuid (PK) | Task ID |
| title | text | Task title |
| description | text | Task description |
| due_date | date | Task deadline |
| intern_id | uuid (FK) | Assigned intern |
| completed | boolean | Task completion status |
| created_at | timestamp | Task creation time |

---

## Attendance Table
Tracks daily attendance of interns.

| Column | Type | Description |
|------|------|------------|
| id | uuid (PK) | Attendance ID |
| intern_id | uuid (FK) | Intern ID |
| firebase_uid | text | Firebase user ID |
| date | date | Attendance date |
| status | text | Present / Absent |
| check_in | time | Check-in time |
| check_out | time | Check-out time |
| created_at | timestamp | Record creation time |

---

## Learning Resources Table
Stores learning materials shared by Admin.

| Column | Type | Description |
|------|------|------------|
| id | uuid (PK) | Resource ID |
| title | text | Resource title |
| description | text | Resource details |
| category | text | Resource category |
| type | text | Video / PDF / Link |
| download_url | text | Download link |
| external_url | text | External reference |
| created_at | timestamp | Creation time |

---

## Security (Row Level Security – RLS)
- Interns can access only their own records
- Admin has full access to all tables
- Unauthorized access is blocked at database level
