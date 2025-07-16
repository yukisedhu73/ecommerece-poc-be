# ecommerce-poc-be

## backend readme

# 🛒 E-commerce Backend API

A simple backend REST API for managing e-commerce products, built with **Node.js**, **Express.js**, and **PostgreSQL**.

---

## 📦 Features

- List all products
- Get product details by ID
- Add new products (Admin task)
- Update existing products
- Delete products

---

## 🏗️ Tech Stack

- Node.js
- Express.js
- PostgreSQL
- DBeaver (or any PostgreSQL client)
- dotenv

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yukisedhu73/ecommerece-poc-be.git
cd ecommerece-poc-be
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Create a .env file in the root and add your database config:

```bash
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_NAME=ecommerce_db
```

### 4. Set up the PostgreSQL database:

```bash
CREATE DATABASE ecommerce_db;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  imageurl TEXT
);
```

### 5. Run the serve :

```bash
npm run dev
```