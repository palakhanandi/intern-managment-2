
## Creating a FireStore Database 

- Firebase Console → Build → Firestore Database

- Click Create database

- Choose:

- Test mode (for learning/dev)

- Location → nearest (ex: asia-south1)

- Click Enable

- Firestore is now live.

### Steps to Create a New Document (Firebase Console)

1. Open **Firebase Console**
2. Select your project
3. Navigate to **Firestore Database → Data**
4. Click on the **users** collection  
   - If it does not exist, click **Start collection** and name it `users`
5. Click **Add document**
6. Set **Document ID** as the user’s Firebase Authentication UID
7. Add the following fields:
   - `email` → string  
   - `role` → `intern` (default)
8. Click **Save**



---

## 3. Firestore Security Rules
Role-based access control is enforced using Firestore rules.

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /users/{userId} {
      allow read, create, update, delete: if request.auth != null
        && request.auth.uid == userId;
    }

    match /tasks/{taskId} {
      allow read, write: if request.auth != null
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }

    match /attendance/{attendanceId} {
      allow read, write: if request.auth != null;
    }

    match /certificates/{certificateId} {
      allow read, write: if request.auth != null;
    }
  }
}

---
### Important Notes
- Document ID must match the authenticated user UID
- Role-based access is enforced using Firestore security rules
- Only authenticated users can access Firestore data

