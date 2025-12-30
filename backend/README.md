# Product Inventory Management System - Backend

This is the RESTful API server for the Product Inventory Management System, built using Node.js, Express, and MongoDB.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

The application uses the following environment variables. You can set them in a `.env` file or rely on the defaults in `server.js`.

- `PORT`: Port number for the server (default: `3000`)
- `MONGO_URI`: MongoDB connection string (default: `mongodb://localhost:27017/ProductDB`)

## Running the Server

Start the server using node:
```bash
node server.js
```

## API Endpoints

The API is served at `http://localhost:3000/api`.

| Method | Endpoint        | Description           | Request Body (JSON)                                      |
| :----- | :-------------- | :-------------------- | :------------------------------------------------------- |
| GET    | `/products`     | Retrieve all products | N/A                                                      |
| GET    | `/products/:id` | Retrieve a product    | N/A                                                      |
| POST   | `/products`     | Create a new product  | `{ "productCode": "...", "productName": "...", "category": "...", "price": 0 }` |
| PUT    | `/products/:id` | Update a product      | `{ "productName": "...", "price": 0 }`                   |
| DELETE | `/products/:id` | Delete a product      | N/A                                                      |