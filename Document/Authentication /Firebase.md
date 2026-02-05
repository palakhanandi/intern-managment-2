# Firebase Setup Guide

This project uses Firebase for authentication and role-based access control with separate Admin and Intern dashboards.

---

## 1. Create Firebase Project
- Go to Firebase Console
- Create a new project
- Disable Google Analytics (optional)

---

## 2. Register Web App
- Open Project Settings → Add Web App
- Copy Firebase configuration keys
- Store the keys in an env file

---

## 3. Install Firebase
```bash
npm install firebase

```
---
## 4. Initialize Firebase
- Create firebase.js and initialize Firebase Auth and Firestore.
---

## 5. Enable Authentication

-In Firebase Console → Authentication → Sign-in method:

-Enable Email/Password

-Enable Google Sign-In

---
## 6. Configure Firestore

-Create Firestore Database

-Start in test mode

-Choose a nearby region

---
## 7. Role-Based Access Control

User roles are stored in Firestore.

---
## 8. Dashboard Access

--Admin users → Admin Dashboard

-Intern users → Intern Dashboard

-Role is fetched after login and used for redirection

---
## 9. Security Rules

-Firestore rules restrict access based on user role to protect admin-only data.
---

## 10. Test Setup

-Login using Email/Password or Google

-Verify role assignment in Firestore

-Confirm correct dashboard access

