⭐ One small addition

I'd also write this note at the end of your summary:

Important: The terminal running node server.js must remain open. If you close it, the backend stops running. Press Ctrl + C in the terminal when you want to stop the server.

All codes should be written in the backend- directory


# 📚 Queens' Touch Beauty Shop

## Developer Notes

# Session 1 - Backend Setup (Node.js + Express)

**Date:** 6th July 2026

---

# Objective

Set up the backend environment and create our first Express server.

---

# Step 1: Open the Backend Folder

Open **Command Prompt** and navigate to the backend folder.

```cmd
cd C:\Users\HHP\Desktop\queens\backend
```

---

# Step 2: Initialize the Node.js Project

Run:

```cmd
npm init -y
```

### What it does

Creates:

```text
package.json
```

### What is package.json?

It is the identity card of a Node.js project.

It stores:

* Project name
* Version
* Installed packages
* Scripts
* Dependencies

Every Node.js project has one.

---

# Step 3: Install Express

Run:

```cmd
npm install express
```

### What it creates

```text
node_modules/
package-lock.json
```

and updates

```text
package.json
```

---

## What are these?

### node_modules

Contains every package your project depends on.

Never create this folder manually.

Never edit files inside it.

Never upload it to GitHub.

---

### package-lock.json

Stores the exact versions of every installed package.

This ensures every developer installs identical versions.

---

# Step 4: Create server.js

Inside the backend folder create

```text
server.js
```

Paste:

```javascript
const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to Queens' Touch Beauty Shop API! 🚀");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

---

# Understanding the Code

## 1.

```javascript
const express = require("express");
```

Imports the Express framework into the project.

Without this line, Express cannot be used.

---

## 2.

```javascript
const app = express();
```

Creates an Express application.

Think of this as opening the beauty shop before customers arrive.

---

## 3.

```javascript
const PORT = 3000;
```

Defines the port number that our server will use.

### What is a Port?

A port is like a numbered door on your computer.

Our application is listening at door:

```text
3000
```

---

## 4.

```javascript
app.get("/", (req, res) => {
    res.send("Welcome to Queens' Touch Beauty Shop API! 🚀");
});
```

Creates our first route.

When a browser visits:

```text
http://localhost:3000/
```

the server responds with

```text
Welcome to Queens' Touch Beauty Shop API! 🚀
```

---

## 5.

```javascript
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

Starts the server and waits for incoming requests.

---

# Step 5: Run the Server

Run:

```cmd
node server.js
```

Expected output:

```text
Server is running on http://localhost:3000
```

---

# Step 6: Test the Server

Open your browser and visit:

```text
http://localhost:3000
```

Expected result:

```text
Welcome to Queens' Touch Beauty Shop API! 🚀
```

---

# Backend Folder Structure After Session 1

```text
backend/
│
├── node_modules/
├── package-lock.json
├── package.json
└── server.js
```

---

# Problems We Encountered

## 1. PowerShell Execution Policy

Error:

```text
running scripts is disabled on this system
```

### Solution

Use **Command Prompt** instead of PowerShell.

We'll configure VS Code to use Command Prompt later.

---

## 2. Node Not Recognized

Error:

```text
'node' is not recognized...
```

### Solution

Verify installation:

```cmd
where node
```

```cmd
node -v
```

Result:

```text
v24.18.0
```

---

## 3. Installing Packages in the Wrong Folder

Always check where you are before installing packages.

Verify location:

```cmd
cd
```

Correct location:

```text
C:\Users\HHP\Desktop\queens\backend
```

---

# Commands Learned Today

```cmd
cd
```

Shows the current directory.

---

```cmd
dir
```

Lists files and folders.

---

```cmd
npm init -y
```

Creates a Node.js project.

---

```cmd
npm install express
```

Installs Express.

---

```cmd
node server.js
```

Runs the backend server.

---

```cmd
node -v
```

Displays the installed Node.js version.

---

```cmd
npm -v
```

Displays the installed npm version.

---

```cmd
where node
```

Shows where Node.js is installed.

---

```cmd
where npm
```

Shows where npm is installed.

---

# Important Notes

* Keep the terminal open while the server is running.
* Press **Ctrl + C** to stop the server.
* Always run commands from the correct project folder.
* Do not edit files inside `node_modules`.
* Do not upload `node_modules` to GitHub.

---

# What We Learned

By the end of Session 1, you understand:

* ✅ What Node.js is
* ✅ What Express is
* ✅ What `package.json` is
* ✅ What `package-lock.json` is
* ✅ What `node_modules` is
* ✅ How to create a backend
* ✅ How to create an Express server
* ✅ What a route is
* ✅ What a port is
* ✅ How to run a backend server
* ✅ How to troubleshoot common setup issues

---

# Next Session

We'll transform our simple backend into a **professional project structure**.

We'll create:

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
├── server.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

We'll also learn **why each folder exists** before creating it.

---

# 💜 Mentor's Note

One thing I'd like us to add to these notes after every session is a **"Why?"** section. Instead of just recording *what* we did, we'll also capture *why* we did it. That habit will make you much stronger in interviews because you'll be able to explain the reasoning behind your decisions, not just repeat the steps.

By the end of this project, you'll have your own developer handbook for **Queens' Touch Beauty Shop**—something you can refer back to long after the app is finished.
4