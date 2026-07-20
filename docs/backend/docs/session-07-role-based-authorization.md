# Session 04 - Role-Based Authorization

## Objective

The objective of this session was to control what different users are allowed to do after logging in.

Authentication answers:

> Who are you?

Authorization answers:

> What are you allowed to do?

---

## Changes Made

### Database

Added a `role` column to the `users` table.

```sql
ALTER TABLE users
ADD COLUMN role VARCHAR(20) DEFAULT 'customer';
```

Default role:

- customer

An administrator account was updated using:

```sql
UPDATE users
SET role = 'admin'
WHERE email = 'wanguiyvonne333@gmail.com';
```

---

### JWT Token

Added the user's role to the JWT payload.

Example:

```javascript
{
    id: user.id,
    email: user.email,
    role: user.role
}
```

---

### Authentication Middleware

Verified JWT tokens.

If valid:

- Stored the decoded payload in `req.user`
- Called `next()`

If invalid:

- Returned `401 Unauthorized`

---

### Authorization Middleware

Created:

```
src/middleware/authorizeAdmin.js
```

The middleware:

- Checked `req.user.role`
- Allowed only users with the `admin` role
- Returned `403 Forbidden` for other users

---

### Protected Routes

Protected these routes:

- POST /products
- PUT /products/:id
- DELETE /products/:id

Flow:

Client

↓

authenticateToken

↓

authorizeAdmin

↓

Controller

---

## HTTP Status Codes

- 200 OK
- 201 Created
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 500 Internal Server Error

---

## Key Concepts Learned

- Authentication
- Authorization
- JWT Payload
- User Roles
- Middleware Chaining
- Admin vs Customer Permissions