Perfect! Here is the documentation for your next session.

Save it as:

```text
docs/session-12-crud-with-postgresql.md
```

---

# Queens' Touch Beauty Shop

# Backend Developer Notes

## Session 12 – CRUD Operations with PostgreSQL

**Date:** 14 July 2026

---

# Objective

The objective of this session was to replace the temporary JavaScript array with a real PostgreSQL database.

Previously, product information was stored inside:

```javascript
const products = [];
```

This meant all data was stored in memory and disappeared whenever the server restarted.

During this session, all CRUD operations were updated to communicate directly with PostgreSQL.

---

# Before This Session

Application flow:

```text
Browser / Flutter
        │
        ▼
Routes
        │
        ▼
Controllers
        │
        ▼
const products = []
```

The controllers only worked with a temporary JavaScript array.

---

# After This Session

Application flow:

```text
Browser / Flutter
        │
        ▼
Routes
        │
        ▼
Controllers
        │
        ▼
pool.query()
        │
        ▼
PostgreSQL Database
```

The controllers now retrieve and modify real database records.

---

# Importing the Database Connection

At the top of `productController.js`, the database connection was imported.

```javascript
const pool = require("../database/db");
```

The `pool` object is responsible for communicating with PostgreSQL.

---

# Reading All Products

Controller:

```javascript
const result = await pool.query(
    "SELECT * FROM products"
);

res.json(result.rows);
```

### SQL Used

```sql
SELECT * FROM products;
```

### Explanation

* `pool.query()` sends SQL to PostgreSQL.
* PostgreSQL executes the query.
* The returned rows are stored in `result.rows`.
* `res.json()` sends those rows back to the client as JSON.

---

# Reading One Product

Controller:

```javascript
const id = req.params.id;

const result = await pool.query(
    "SELECT * FROM products WHERE id = $1",
    [id]
);

res.json(result.rows[0]);
```

### SQL Used

```sql
SELECT *
FROM products
WHERE id = $1;
```

---

# Understanding `WHERE`

`WHERE` filters rows.

Example:

```sql
SELECT *
FROM products
WHERE id = 2;
```

Only the product whose ID is 2 is returned.

---

# Parameterized Queries

Instead of writing:

```javascript
"SELECT * FROM products WHERE id = " + id
```

the application uses:

```javascript
"SELECT * FROM products WHERE id = $1"
```

and supplies the value separately:

```javascript
[id]
```

### Why?

Parameterized queries protect the application against SQL injection attacks and are the recommended way to send values to PostgreSQL.

---

# Creating a Product

Controller:

```javascript
const result = await pool.query(
    `INSERT INTO products
    (name, price, type, size, quantity)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [name, price, type, size, quantity]
);
```

### SQL Used

```sql
INSERT INTO products
(name, price, type, size, quantity)
VALUES (...);
```

---

# Understanding `RETURNING *`

Normally, an `INSERT` statement only adds data.

Adding:

```sql
RETURNING *
```

instructs PostgreSQL to immediately return the newly created row.

This allows the backend to send the created product back to the client.

---

# Updating a Product

Controller:

```javascript
UPDATE products
SET
    name = $1,
    price = $2,
    type = $3,
    size = $4,
    quantity = $5
WHERE id = $6
RETURNING *;
```

### SQL Used

```sql
UPDATE products
SET ...
WHERE id = $6;
```

The specified product is updated using its unique ID.

---

# Deleting a Product

Controller:

```javascript
DELETE FROM products
WHERE id = $1
RETURNING *;
```

### SQL Used

```sql
DELETE FROM products
WHERE id = $1;
```

The matching product is permanently removed from the database.

---

# Understanding `async`

Database operations take time.

Adding:

```javascript
async
```

allows the controller to wait for PostgreSQL without blocking the rest of the application.

---

# Understanding `await`

Example:

```javascript
await pool.query(...);
```

`await` pauses the function until PostgreSQL finishes executing the SQL query.

Without `await`, JavaScript would continue running before the database returned a result.

---

# Understanding `try...catch`

Every database operation was wrapped in:

```javascript
try {

} catch (error) {

}
```

This prevents the server from crashing if an error occurs.

Instead, a proper error response is returned to the client.

---

# Understanding `result.rows`

When PostgreSQL executes a query, it returns an object.

Example:

```javascript
result
```

The actual records are stored inside:

```javascript
result.rows
```

Example:

```javascript
[
    {
        id: 1,
        name: "Shampoo",
        price: "850.00"
    }
]
```

For queries returning one product, the first item is accessed using:

```javascript
result.rows[0]
```

---

# Complete CRUD Mapping

| HTTP Method | Endpoint        | SQL Command        |
| ----------- | --------------- | ------------------ |
| GET         | `/products`     | `SELECT`           |
| GET         | `/products/:id` | `SELECT ... WHERE` |
| POST        | `/products`     | `INSERT`           |
| PUT         | `/products/:id` | `UPDATE`           |
| DELETE      | `/products/:id` | `DELETE`           |

---

# Complete Request Flow

```text
Flutter App
      │
      ▼
HTTP Request
      │
      ▼
Express Server
      │
      ▼
Routes
      │
      ▼
Controllers
      │
      ▼
pool.query()
      │
      ▼
PostgreSQL
      │
      ▼
Query Result
      │
      ▼
JSON Response
      │
      ▼
Flutter App
```

---

# Key Concepts Learned

* `pool.query()` sends SQL queries to PostgreSQL.
* `SELECT` retrieves records.
* `INSERT` creates new records.
* `UPDATE` modifies existing records.
* `DELETE` removes records.
* `WHERE` filters records.
* `$1`, `$2`, etc. are placeholders used in parameterized queries.
* Parameterized queries help protect against SQL injection.
* `RETURNING *` returns the affected row after `INSERT`, `UPDATE`, or `DELETE`.
* `async` and `await` allow the application to wait for database operations.
* `try...catch` handles database errors safely.
* `result.rows` contains the data returned from PostgreSQL.

---

# Session Outcome

At the end of this session:

* The temporary `products` array was completely replaced.
* The backend now performs all CRUD operations using PostgreSQL.
* The API communicates with a real database instead of in-memory data.
* Every CRUD endpoint was successfully tested.
* The backend is now ready to be consumed by the Flutter frontend.

---

## 🎉 Congratulations!

This is one of the biggest milestones in your learning journey.

A week ago, you told me you wanted to stop "vibe coding" and truly understand backend development. Today you've built a backend that:

* Uses Express.js
* Connects to PostgreSQL
* Uses environment variables securely
* Implements a complete CRUD API
* Follows a professional project structure

From here, we'll start making it even more production-ready with validation, authentication, and eventually connect your Flutter app so it uses **live data** from this API instead of mock data.
