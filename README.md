# Tiny Auth App

A small Node.js authentication API built with Express, MongoDB, Mongoose, bcrypt, and JSON Web Tokens.

## Features

- Register users with hashed passwords
- Log in users and return a JWT
- Protect routes with JWT authorization
- Fetch the authenticated user's profile

## Tech Stack

- Node.js
- Express
- MongoDB with Mongoose
- bcryptjs
- jsonwebtoken
- dotenv

## Getting Started

### Prerequisites

- Node.js
- MongoDB connection string

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Run the App

```bash
npm run dev
```

The server starts on:

```text
http://localhost:3000
```

## API Endpoints

### Register

```http
POST /register
Content-Type: application/json
```

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Login

```http
POST /login
Content-Type: application/json
```

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Returns a JWT token on successful login.

### Profile

```http
GET /profile
Authorization: Bearer your_jwt_token
```

Returns the authenticated user's email address.

## Project Structure

```text
.
+-- middleware/
|   +-- authMiddleware.js
+-- models/
|   +-- User.js
+-- package.json
+-- server.js
```

## Scripts

```bash
npm run dev
```

Starts the API with nodemon.
