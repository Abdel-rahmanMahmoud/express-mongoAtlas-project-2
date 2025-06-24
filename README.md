#  Back-End Projects

## 📝 Description  
This repository contains my practice tasks during my internship at **StackSoft**.  
Each task focuses on back-end development using **Node.js** and follows best practices for clean architecture, modular design, and RESTful API development.  
All APIs are connected to a cloud-hosted **MongoDB Atlas** database for scalable and secure data management.

## 🛠️ Technologies Used  
- Node.js  
- Express.js  
- MongoDB Atlas  
- Mongoose  
- JavaScript  
- Git & GitHub  
- Postman (for API testing)  
- JWT (for authentication and authorization)  
- Role-Based Access Control (RBAC) for authorization  
- Middleware Validation for all incoming data  
- MVC Architecture  

## 🔐 Security & Access Control
- **Authentication:** Using JWT tokens to verify user identity after login.
- **Authorization:** Role-based access system is implemented (e.g. admin, writer, user) to restrict routes and actions.
- **Validation:** Input data is validated using custom middlewares to prevent invalid or malicious data from reaching the database.

## 🚀 Goal  
To build a solid foundation in real-world back-end development by working with cloud-based databases, RESTful APIs, authentication systems, and modular code structures.  
These hands-on assignments are reviewed regularly with feedback from mentors to ensure best practices are followed.

> ⚠️ **Note:**  
> The `.env` file is **not included** by default for security reasons. You must create it manually in the root directory with variables like:
PORT=8000
MONGO_URL=**********
JWT_SECRET=**********

📤 Postman Collection:
A Postman collection file for testing the API has been **uploaded** and is included in the repository.

### live-Url (Production)
```https
https://express-mongoatlas-project-2.onrender.com
