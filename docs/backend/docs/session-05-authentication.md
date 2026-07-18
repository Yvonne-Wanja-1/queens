# Session 03 - User Authentication

## What I Learned

### User Registration
- Created a `users` table.
- Added a registration endpoint (`POST /auth/register`).
- Validated user input.
- Checked for duplicate email addresses.
- Hashed passwords using `bcrypt`.
- Saved users to PostgreSQL.

### User Login
- Created a login endpoint (`POST /auth/login`).
- Retrieved users by email.
- Compared passwords using `bcrypt.compare()`.
- Generated JWT tokens using `jsonwebtoken`.

### JWT Authentication
- Learned what JWT tokens are.
- Stored the secret key in `.env`.
- Created `authMiddleware.js`.
- Verified JWT tokens using `jwt.verify()`.
- Attached authenticated user data to `req.user`.
- Protected product creation, update, and delete routes with authentication middleware.

## Key Packages

- express
- pg
- bcrypt
- jsonwebtoken
- dotenv

## HTTP Status Codes Used

- 200 OK
- 201 Created
- 400 Bad Request
- 401 Unauthorized
- 404 Not Found
- 500 Internal Server Error

## Request Flow

Client
→ Express Routes
→ Authentication Middleware
→ Controller
→ PostgreSQL
→ Response