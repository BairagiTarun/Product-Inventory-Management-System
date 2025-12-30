# Product Inventory Management System

This is a full-stack web application designed to manage product inventories. It utilizes the MEAN stack (MongoDB, Express.js, Angular, Node.js) to provide a seamless interface for creating, reading, updating, and deleting product records.

## Features

- **Product Management:** Add, edit, and delete products.
- **Inventory View:** Display a list of all products with details like Code, Name, Category, and Price.
- **Responsive Design:** Styled with custom CSS for a clean user interface.
- **Real-time Feedback:** Success and error messages for user actions.

## Tech Stack

- **Frontend:** Angular
- **Backend:** Node.js with Express.js
- **Database:** MongoDB (Mongoose ODM)

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Angular CLI](https://angular.io/cli)

## Getting Started

### 1. Backend Setup

The backend handles API requests and database connections.

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```
   
   *The server runs on port `3000` by default and connects to MongoDB at `mongodb://localhost:27017/ProductDB`.*

### 2. Frontend Setup

The frontend provides the user interface.

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   ng serve
   ```

4. Open your browser and visit:
   ```
   http://localhost:4200
   ```

## Project Structure

- **backend/**: Contains the Node.js/Express server and API routes.
- **frontend/**: Contains the Angular application source code.