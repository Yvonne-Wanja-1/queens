

---

# Queens' Touch Beauty Shop

# Backend Developer Notes

## Session 3 – Professional Backend Structure

**Date:** 8 July 2026

---

# Objective

The objective of this session was to reorganize the backend into a professional project structure before adding new features.

Instead of placing all backend code inside a single `server.js` file, we began separating responsibilities into different folders and files. This makes the application easier to maintain, test, and expand as it grows.

---

# Project Structure Before This Session

The backend initially looked like this:

```text
backend/
├── node_modules/
├── package.json
├── package-lock.json
└── server.js
```

Although this works for small projects, it quickly becomes difficult to manage once authentication, products, orders, payments, and other features are added.

---

# Step 1 – Create the `src` Folder

Inside the `backend` folder, create a new folder named:

```text
src
```

The project now becomes:

```text
backend/
├── node_modules/
├── src/
├── package.json
├── package-lock.json
└── server.js
```

---

# Why Create the `src` Folder?

`src` stands for **Source**.

It contains all of the application's source code.

Instead of placing every file inside the root directory, we keep the application's code inside one dedicated folder.

This makes the project easier to organize.

---

# Step 2 – Create the Main Source Folders

Inside the `src` folder, create the following folders:

```text
config
controllers
middleware
models
routes
services
utils
```

The project now becomes:

```text
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
│
├── package.json
├── package-lock.json
└── server.js
```

---

# Purpose of Each Folder

## `config/`

Stores application configuration.

Examples include:

* Database connection
* Environment variables
* API configuration
* Application settings

---

## `controllers/`

Controllers receive requests from routes.

They process the request and send a response back.

Example:

A customer requests:

```
GET /products
```

The controller retrieves the products and returns them.

Think of the controller as the salesperson assisting customers.

---

## `middleware/`

Middleware runs before a request reaches the controller.

Examples:

* Authentication
* Authorization
* Logging
* Error handling

Think of middleware as the shop's security guard checking customers before they enter.

---

## `models/`

Models describe the application's data.

Later we will create models such as:

* Product
* Customer
* Order
* Payment
* Installment

These models define how data will be stored in PostgreSQL.

---

## `routes/`

Routes define the application's endpoints.

Examples:

```
GET /products
POST /login
POST /orders
```

Think of routes as the receptionist directing customers to the correct department.

---

## `services/`

Services contain the application's business logic.

Examples:

* Calculate installment balances
* Generate invoices
* Apply discounts
* Process payments

Controllers ask services to perform business operations.

---

## `utils/`

Utility functions that can be reused throughout the project.

Examples:

* Format currency
* Format dates
* Generate receipt numbers
* Validation helpers

Think of this folder as the application's toolbox.

---

# Step 3 – Create `app.js`

Inside the `src` folder, create a new file named:

```text
backend/
└── src/
    └── app.js
```

The project structure now becomes:

```text
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── app.js
│
├── package.json
├── package-lock.json
└── server.js
```

---

# Why Create `app.js`?

As the application grows, putting everything inside `server.js` would make it difficult to maintain.

To solve this, we separate responsibilities.

`app.js` will contain the application itself.

`server.js` will only start the application.

This follows the software engineering principle known as **Separation of Concerns**, where each file has one clear responsibility.

---

# Understanding `app.js` vs `server.js`

## `app.js`

Responsibilities:

* Create the Express application.
* Register middleware.
* Define routes.
* Configure the application.
* Export the Express application.

Think of `app.js` as everything that happens **inside the beauty shop** once it opens.

---

## `server.js`

Responsibilities:

* Import the Express application.
* Specify the port number.
* Start the server.
* Listen for incoming requests.

Think of `server.js` as unlocking the shop, turning on the lights, and opening the doors for customers.

---

# Step 4 – Move the Express Application into `app.js`

Open:

```text
backend/src/app.js
```

Paste the following code:

```javascript
const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Queens' Touch Beauty Shop API! 🚀");
});

module.exports = app;
```

---

# Code Explanation

## Import Express

```javascript
const express = require("express");
```

Imports the Express framework.

---

## Create the Express Application

```javascript
const app = express();
```

Creates the Express application object.

---

## Register Middleware

```javascript
app.use(express.json());
```

Registers Express's built-in JSON middleware.

Purpose:

Whenever the frontend sends JSON data, Express automatically converts it into a JavaScript object.

Example request:

```json
{
  "name": "Lipstick",
  "price": 850
}
```

Without this middleware, Express would not automatically parse the JSON request body.

---

## Create the Home Route

```javascript
app.get("/", (req, res) => {
  res.send("Welcome to Queens' Touch Beauty Shop API! 🚀");
});
```

Creates the first route in the application.

When a user visits:

```
http://localhost:3000
```

The server responds with:

```
Welcome to Queens' Touch Beauty Shop API! 🚀
```

---

## Export the Application

```javascript
module.exports = app;
```

Exports the Express application so that other files can use it.

Currently, `server.js` will import this application.

---

# Step 5 – Update `server.js`

Open:

```text
backend/server.js
```

Replace its contents with:

```javascript
const app = require("./src/app");

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

---

# Code Explanation

## Import the Express Application

```javascript
const app = require("./src/app");
```

Imports the application that was created inside `src/app.js`.

The path `./src/app` tells Node.js to load the `app.js` file from the `src` folder.

---

## Set the Port

```javascript
const PORT = 3000;
```

Stores the port number that the server will use.

Later in the project, this value will be moved to an environment variable.

---

## Start the Server

```javascript
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

Starts the Express server and begins listening for incoming requests on port `3000`.

---

# Step 6 – Test the Application

Save both files.

From the `backend` folder, run:

```bash
node server.js
```

Expected output:

```text
Server is running on http://localhost:3000
```

Then open a browser and visit:

```
http://localhost:3000
```

Expected result:

```
Welcome to Queens' Touch Beauty Shop API! 🚀
```

This confirms that `app.js` and `server.js` are working together correctly.

---

# How the Application Starts

```text
node server.js
        │
        ▼
server.js starts
        │
        ▼
Imports app.js
        │
        ▼
app.js creates the Express application
        │
        ▼
Registers middleware
        │
        ▼
Registers routes
        │
        ▼
Exports the application
        │
        ▼
server.js starts listening on port 3000
        │
        ▼
The API is ready to receive requests
```

---

# Concepts Learned

* Professional backend project structure
* Source (`src`) directory
* Separation of Concerns
* Folder organization
* `app.js`
* `server.js`
* Express middleware
* Express routes
* `module.exports`
* `require()`
* Application startup flow

---

# Final Project Structure

```text
backend/
│
├── node_modules/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── app.js
│
├── package.json
├── package-lock.json
└── server.js
```

---

# Key Takeaways

* Create a dedicated `src` folder to hold all application source code.
* Organize code into folders with a single responsibility.
* Create `app.js` inside the `src` folder to build and configure the Express application.
* Keep `server.js` focused on starting the server.
* Use `module.exports` and `require()` so `server.js` and `app.js` can work together.
* Test the backend after structural changes to verify everything still works.

---


