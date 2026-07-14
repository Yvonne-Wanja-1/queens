Absolutely! Here's the documentation in the same style as the previous sessions.

---

# Queens' Touch Beauty Shop

# Backend Developer Notes

## Session 11 – Connecting Express to PostgreSQL

**Date:** 14 July 2026

---

# Objective

The objective of this session was to connect the Express backend to the PostgreSQL database.

Before this session, the backend and PostgreSQL existed separately. During this session, I connected them so the backend could execute SQL queries and receive results from the database.

---

# Why We Needed the `pg` Package

Express is written in JavaScript.

PostgreSQL understands SQL.

The `pg` package acts as a translator between the Express backend and PostgreSQL.

It allows JavaScript code to send SQL queries to the database and receive the results.

Application flow:

```text
Flutter App
      │
      ▼
Express Backend
      │
      ▼
pg Package
      │
      ▼
PostgreSQL Database
```

Without the `pg` package, the backend would have no way to communicate with PostgreSQL.

---

# Installing `pg`

The PostgreSQL driver was installed using:

```bash
npm install pg
```

This added the package to the project's dependencies so it can be used throughout the application.

---

# Creating the Database Folder

Inside the `src` folder, a new folder named `database` was created.

Project structure:

```text
backend/
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── database/
│   │      └── db.js
│   └── app.js
│
├── server.js
├── package.json
└── package-lock.json
```

This folder is responsible for everything related to the database.

Keeping database code in its own folder makes the project easier to organize and maintain.

---

# Creating `db.js`

A file named `db.js` was created inside the `database` folder.

Its purpose is to create one database connection that can be reused anywhere in the application.

Instead of creating a new connection inside every controller, controllers will simply import `db.js`.

---

# Understanding the Connection Code

```javascript
require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

module.exports = pool;
```

---

# Understanding Each Part

## `require("dotenv").config();`

Loads all values from the `.env` file into `process.env`.

This allows the application to read sensitive information without hardcoding it into the source code.

---

## `const { Pool } = require("pg");`

Imports the `Pool` class from the `pg` package.

`Pool` manages database connections.

---

## What is a Connection Pool?

A connection pool is a collection of reusable database connections.

Instead of creating a brand-new connection every time a request is made, Express borrows an existing connection from the pool, uses it, and returns it when finished.

```text
Express
    │
    ▼
Connection Pool
 ├── Connection 1
 ├── Connection 2
 ├── Connection 3
 └── ...
        │
        ▼
PostgreSQL
```

Using a pool improves performance and allows many users to use the application efficiently.

---

## Connection Settings

The connection uses the following values:

| Property      | Purpose                               |
| ------------- | ------------------------------------- |
| `DB_USER`     | PostgreSQL username                   |
| `DB_HOST`     | Database location (`localhost`)       |
| `DB_NAME`     | Database name (`queens_touch_beauty`) |
| `DB_PASSWORD` | PostgreSQL password                   |
| `DB_PORT`     | PostgreSQL port (`5432`)              |

---

# Why We Use `localhost`

The host was set to:

```text
localhost
```

`localhost` means the PostgreSQL database is running on the same computer as the Express application.

---

# Why We Export the Pool

```javascript
module.exports = pool;
```

This exports the database connection so other files can import and use it.

Example:

```javascript
const pool = require("../database/db");
```

Controllers will later use this object to execute SQL queries.

---

# Testing the Database Connection

Inside `app.js`, the following query was added:

```javascript
pool.query("SELECT NOW()", (err, result) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Database connected successfully!");
        console.log(result.rows[0]);
    }
});
```

---

# Why `SELECT NOW()`?

`SELECT NOW()` is a simple SQL query that asks PostgreSQL for its current date and time.

It is commonly used to test whether the application can successfully communicate with the database.

It does not depend on any tables, making it ideal for testing the connection.

---

# Successful Connection

After starting the server with:

```bash
node server.js
```

The terminal displayed:

```text
Server is running on http://localhost:3000
Database connected successfully!
{ now: 2026-07-14T10:27:20.248Z }
```

This confirmed that:

* Express started successfully.
* The `pg` package connected to PostgreSQL.
* PostgreSQL accepted the connection.
* SQL queries can now be executed from the backend.
* PostgreSQL returned data successfully.

---

# Securing Database Credentials

Initially, the database password was written directly inside `db.js`.

This is not safe because passwords could be uploaded to GitHub.

To improve security, a `.env` file was created.

Example:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=queens_touch_beauty
DB_PASSWORD=your_password
DB_PORT=5432
```

The application now reads these values using `process.env`.

---

# Installing `dotenv`

The `dotenv` package was installed:

```bash
npm install dotenv
```

`dotenv` loads the values stored inside `.env` into the application.

Flow:

```text
.env
   │
   ▼
dotenv
   │
   ▼
process.env
   │
   ▼
Express Application
```

---

# Updating `.gitignore`

The `.gitignore` file was updated to include:

```gitignore
node_modules/
.env
```

This prevents the `.env` file from being uploaded to GitHub.

Sensitive information such as passwords and API keys should never be committed to a repository.

---

# Project Flow

The backend now follows this architecture:

```text
Flutter App
      │
      ▼
Express API
      │
      ▼
Routes
      │
      ▼
Controllers
      │
      ▼
db.js
      │
      ▼
pg Package
      │
      ▼
PostgreSQL Database
```

---

# Key Concepts Learned

* The `pg` package allows the Express backend to communicate with PostgreSQL.
* A connection pool manages reusable database connections.
* `db.js` centralizes the database connection logic.
* `localhost` means the database is running on the same computer.
* `module.exports` allows the database connection to be reused in other files.
* `SELECT NOW()` is a simple query used to verify that the database connection works.
* `.env` stores sensitive configuration values securely.
* `dotenv` loads values from `.env` into `process.env`.
* `.gitignore` prevents sensitive files such as `.env` from being pushed to GitHub.

---

# Session Outcome

At the end of this session:

* The Express backend successfully connected to PostgreSQL.
* A reusable database connection was created using `Pool`.
* Sensitive database credentials were moved into a `.env` file.
* The `.env` file was protected using `.gitignore`.
* The backend is now ready to replace the temporary `products` array with real SQL queries against the PostgreSQL database.

---

Save this as:

```text
docs/session-11-database-connection.md
```

This documents another major milestone. From the next session onward, we'll begin replacing `const products = []` with actual database queries so your API uses PostgreSQL for real.
