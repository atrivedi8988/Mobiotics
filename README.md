# MOBIOTICS

## Links
- [Deployment Link](https://mobiotics.vercel.app/)

## Features Implemented

1. Authentication
   - User signin
   - User signup
   - Password validation
   - Forgot password
   - User logout
   - Reset password (Using User Gmail)
   - Upload profile picture

2. Profile Page
   - User information
     - User name
     - User email
     - User role
     - User profile picture
   - Update user information 
   - Delete user account

3. User List Page
   - Only admin can access
   - All users in Table format
   - Update User role
   - Delete User

## Api Used
   1. User Signup
      - https://mobiotics.up.railway.app/api/user/create
   2. User Login
      - https://mobiotics.up.railway.app/api/user/login
   3. Forgot Password
      - https://mobiotics.up.railway.app/api/user/forgot
   4. Reset Password
      - https://mobiotics.up.railway.app/api/user/reset/${id}/${token}
   5. User Profile
      - https://mobiotics.up.railway.app/api/user/profile
   6. Update User Profile
       - https://mobiotics.up.railway.app/api/user/update/${id}
   7. Delete User Account
       - https://mobiotics.up.railway.app/api/user/delete/${id}
   8. All User 
      - https://mobiotics.up.railway.app/api/user/admin/allusers
   9. Update User Role By Admin
       - https://mobiotics.up.railway.app/api/user/admin/assignadmin/${id}
   10. Delete User By Admin
       - https://mobiotics.up.railway.app/api/user/admin/delete/${id}
   


## Run Locally

1. git clone in your folder
2. npm install
3. create .config file
   - Provide the following information
     - PORT = 8080
     - MONGODB_URI = provide your mongodb uri
     - JWT_SECRET_KEY = provide your jwt secret key
     - JWT_EXPIARY_TIME = 30d
     - SMTP_EMAIL = provide your gmail id
     - SMTP_PASS = provide your google app smtp password
4. npm run dev
5. cd frontend
6. npm install
7. npm start

## Backend Folder Structure
![image](https://user-images.githubusercontent.com/101327752/223956659-74e3d16e-d1f6-40dd-8698-c05d76687473.png)

## Frontend Folder Structure
![image](https://user-images.githubusercontent.com/101327752/223957107-d63ce595-b1c0-4942-870e-0d4ae4175bdb.png)





