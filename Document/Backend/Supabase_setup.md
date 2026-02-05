## Supabase Database Setup Guide

The following steps describe how to set up Supabase and configure the PostgreSQL database for the Intern Management System.

---

### Step 1: Create a Supabase Account
1. Visit **https://supabase.com**
2. Sign up using GitHub or email
3. Log in to the Supabase Dashboard

---

### Step 2: Create a New Supabase Project
1. Click **New Project**
2. Select an organization
3. Enter a project name
4. Set a strong database password
5. Choose the nearest region
6. Click **Create Project** and wait for initialization

---

### Step 3: Get Project Credentials
1. Open the created project
2. Navigate to **Project Settings → API**
3. Copy the following:
   - **Project URL**
   - **Anon public key**
4. These credentials are used to connect the frontend to Supabase

---

### Step 4: Create Database Tables
1. Go to **Database → SQL Editor**
2. Use SQL queries to create required tables such as:
   - `users`
   - `interns`
   - `tasks`
   - `attendance`
   - `learning_resources`
3. Execute the queries to create tables in PostgreSQL

---

### Step 5: Enable Row Level Security (RLS)
1. Navigate to **Database → Tables**
2. Select a table
3. Enable **Row Level Security (RLS)**
4. Repeat this step for all tables

---

### Step 6: Configure Access Policies
1. Open **Authentication → Policies** or **Table → Policies**
2. Create policies to:
   - Allow interns to access only their own records
   - Allow admin users full access
3. Save the policies after configuration

---

### Step 7: Link Firebase Authentication with Supabase
1. Store the Firebase Authentication UID in Supabase tables
2. Use `firebase_uid` as a reference to identify users
3. This enables role-based access and user-specific data control

---

### Step 8: Connect Supabase to the Application
- Install Supabase client in the project
     - npm install @supabase/supabase-js
