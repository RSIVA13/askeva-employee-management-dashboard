# Employee Management Dashboard

A full-stack Employee Management Dashboard built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). The application provides secure JWT authentication, employee CRUD operations, search and filtering, analytics dashboards, and pagination.

## Features

### Authentication

* Admin Login
* JWT Authentication
* Protected Routes
* Logout Functionality
* Form Validation

### Employee Management

* Add Employee
* Edit Employee
* Delete Employee
* Employee Listing Table

### Search & Filter

* Search by Employee Name
* Search by Employee Email
* Filter by Department
* Filter by Status
* Debounced Search

### Analytics Dashboard

* Total Employees
* Active Employees
* Inactive Employees
* Department Wise Employee Count
* Monthly Joined Employees Chart
* Employee Status Distribution Pie Chart

### Other Features

* Pagination
* Loading States
* Error Handling
* Empty States
* Toast Notifications
* Responsive UI
* Tailwind CSS Styling

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* Recharts
* React Toastify

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs

## Project Structure

employee-management-dashboard

frontend/

* src/
* components/
* pages/
* App.jsx

backend/

* config/
* controllers/
* middleware/
* models/
* routes/
* server.js

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd employee-management-dashboard
```

### Backend Setup

```bash
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a .env file inside backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## API Endpoints

### Authentication

POST /api/auth/login

### Employees

GET /api/employees

POST /api/employees

PUT /api/employees/:id

DELETE /api/employees/:id

## Screens Included

* Login Page
* Employee Dashboard
* Analytics Dashboard
* Employee CRUD Operations
* Search & Filters

## Author

Siva R

MERN Stack Developer
