😂 Good catch.

You're right—I only told you **what** to include. I forgot to actually write the documentation like we've been doing after every milestone.

Let's fix that.

---

# Queens' Touch Beauty Shop

# Backend Developer Notes

## Session 10 – Introduction to PostgreSQL

**Date:** 14 July 2026

---

# Objective

The objective of this session was to move from storing data in a temporary JavaScript array to using a real PostgreSQL database.

During this session, I learned what databases are, why they are important, how SQL works, and how to create a database, table, and insert data into PostgreSQL.

---

# Why We Need a Database

Previously, products were stored in memory using:

```javascript
const products = [];
```

This worked while the server was running.

However, once the server stopped or the computer restarted, all products disappeared because the array exists only in RAM.

A database solves this problem by storing data permanently.

---

# What is a Database?

A database is an organized place for storing information permanently.

Instead of writing information in a notebook, applications store information inside a database.

For Queens' Touch Beauty Shop, the database will eventually store:

* Products
* Customers
* Orders
* Payments
* Installment Plans
* Categories

---

# Database Terminology

A database contains one or more tables.

Each table contains rows.

Each row contains columns.

Example:

| id | name    | price | quantity |
| -: | ------- | ----: | -------: |
|  1 | Shampoo |   850 |       20 |
|  2 | Lotion  |  1200 |       10 |

### Database

The entire collection of tables.

### Table

A collection of related information.

Example:

```text
products
```

### Column

The headings of the table.

Examples:

* id
* name
* price
* quantity

Each column stores one type of information.

### Row

One complete record in a table.

Example:

| id | name    | price | quantity |
| -: | ------- | ----: | -------: |
|  1 | Shampoo |   850 |       20 |

This row represents one product.

---

# Designing the Products Table

Before creating the table, I identified the information each product should store.

| Column   | Purpose                   |
| -------- | ------------------------- |
| id       | Unique product identifier |
| name     | Product name              |
| price    | Product price             |
| type     | Product category          |
| size     | Product size              |
| quantity | Number of items in stock  |

---

# What is SQL?

SQL stands for **Structured Query Language**.

SQL is the language used to communicate with a database.

Just as JavaScript communicates with Node.js, SQL communicates with PostgreSQL.

---

# Basic SQL Commands

| CRUD Operation | SQL Command | Purpose              |
| -------------- | ----------- | -------------------- |
| Create         | INSERT      | Add new data         |
| Read           | SELECT      | Retrieve data        |
| Update         | UPDATE      | Modify existing data |
| Delete         | DELETE      | Remove existing data |

---

# Reading Data

To retrieve every product from the database:

```sql
SELECT * FROM products;
```

Meaning:

* SELECT → Retrieve
* * → Everything
* FROM → From the table
* products → Named products

---

# Inserting Data

To add a new product:

```sql
INSERT INTO products (name, price, type, size, quantity)
VALUES (
    'Shampoo',
    850,
    'Hair Care',
    '250ml',
    20
);
```

This inserts one new row into the products table.

---

# Updating Data

SQL uses UPDATE to modify existing data.

Example:

```sql
UPDATE products
SET price = 950
WHERE id = 1;
```

This updates only the product whose ID is 1.

---

# Deleting Data

SQL uses DELETE to remove data.

Example:

```sql
DELETE FROM products
WHERE id = 1;
```

This removes the product whose ID is 1.

---

# Installing PostgreSQL

PostgreSQL was installed successfully using the default installation settings.

The default port remained:

```text
5432
```

The Stack Builder application was offered after installation but was not required for this project.

---

# Creating the Database

Using pgAdmin, a new database was created.

Database name:

```text
queens_touch_beauty
```

This database will store all data for the Queens' Touch Beauty Shop application.

---

# Creating the Products Table

Inside the database, the following SQL was executed:

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    type VARCHAR(50),
    size VARCHAR(50),
    quantity INTEGER NOT NULL
);
```

---

# Understanding the Data Types

### SERIAL

Automatically generates sequential IDs.

Example:

```text
1
2
3
4
...
```

### PRIMARY KEY

Ensures every row has a unique identifier.

### VARCHAR

Stores text.

Examples:

* Shampoo
* Lotion
* Lipstick

### DECIMAL

Stores numbers with decimal places.

Examples:

* 850.00
* 1200.50

### INTEGER

Stores whole numbers.

Examples:

* 5
* 20
* 100

### NOT NULL

Makes a field mandatory.

A value must be provided before the row can be saved.

---

# Primary Keys

The primary key uniquely identifies every row.

Product names cannot be used because two products may have the same name.

Instead, each product receives a unique ID.

Example:

| id | name    | price |
| -: | ------- | ----: |
|  1 | Shampoo |   850 |
|  2 | Shampoo |   900 |

Although both products have the same name, their IDs are different.

---

# Inserting the First Product

The first product was inserted using:

```sql
INSERT INTO products (name, price, type, size, quantity)
VALUES (
    'Shampoo',
    850,
    'Hair Care',
    '250ml',
    20
);
```

Because the `id` column uses `SERIAL`, PostgreSQL automatically generated the product ID.

---

# Viewing Stored Data

To display all stored products:

```sql
SELECT * FROM products;
```

The query successfully displayed the first product stored inside PostgreSQL.

---

# Comparing Memory Storage and Database Storage

## Previous Approach

```javascript
const products = [];
```

* Stored only in memory.
* Lost when the server stopped.
* Not suitable for production.

## Current Approach

```text
PostgreSQL Database
        │
        └── products table
```

* Stored permanently.
* Survives server restarts.
* Suitable for real applications.

---

# Key Concepts Learned

* A database stores information permanently.
* A database contains tables.
* Tables contain rows.
* Rows contain columns.
* SQL is the language used to communicate with a database.
* CRUD operations map to SQL commands:

  * SELECT
  * INSERT
  * UPDATE
  * DELETE
* Every table should have a primary key.
* `SERIAL` automatically generates unique IDs.
* PostgreSQL stores data permanently instead of in memory.
* The `products` table is the first table created for the Queens' Touch Beauty Shop application.

---

# Session Outcome

At the end of this session:

* PostgreSQL was successfully installed.
* A new database named **`queens_touch_beauty`** was created.
* A **`products`** table was created.
* The first product was inserted into the database.
* Data was successfully retrieved using `SELECT`.

The backend is now ready for the next phase: **connecting the Express application to PostgreSQL so that the API uses the database instead of the temporary JavaScript array.**

---

Save this as:

```text
docs/session-10-postgresql-basics.md
```

This keeps your documentation consistent with the previous sessions and records another major milestone in your backend learning journey.
