# Product Inventory Management System - Frontend

This is the client-side application for the Product Inventory Management System, built with [Angular](https://angular.io/). It provides a user interface to interact with the backend API for managing product inventory.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Angular CLI](https://github.com/angular/angular-cli) installed globally:
  ```bash
  npm install -g @angular/cli
  ```

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

## Development Server

Run the development server:

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Features

- **Product Form**: Create and update products with validation.
- **Product List**: View all products in a responsive table.
- **Actions**: Edit and delete functionality directly from the list.
- **Feedback**: Success and error notifications.

## Configuration

The application is configured to communicate with the backend server at `http://localhost:3000/api`. Ensure the backend server is running before interacting with the data.

## Build

To build the project for production:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.
