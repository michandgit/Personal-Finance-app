# Personal Finance Visualizer

## Overview
Personal Finance Visualizer is a web application designed to help users track their personal finances efficiently. It allows users to log transactions, categorize expenses, and visualize financial data using charts.

## Features
### Stage 1: Basic Transaction Tracking
- Add, edit, and delete transactions (amount, date, description)
- View a list of all transactions
- Monthly expenses bar chart
- Basic form validation

### Stage 2: Categories
- All Stage 1 features plus:
- Predefined categories for transactions
- Category-wise expense breakdown using a pie chart
- Dashboard with summary cards:
  - Total expenses
  - Category breakdown
  - Most recent transactions

## Tech Stack
- **Frontend:** React.js, Material-UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Charting:** Recharts

## Installation
### Prerequisites
- Node.js & npm installed
- MongoDB running locally or using a cloud database like MongoDB Atlas

### Steps to Run Locally
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/personal-finance-visualizer.git
   cd personal-finance-visualizer
   ```
2. Install dependencies for both frontend and backend:
   ```sh
   # frontend
   npm install
   cd backend # Navigate to backend
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the `server` directory and add:
     ```env
     MONGODB_URI=your_mongodb_connection_string
     ```
4. Start the backend:
   ```sh
   cd backend
   npm start
   ```
5. Start the frontend:
   ```sh
   npm start
   ```
6. Open your browser and go to `http://localhost:3000`

## API Endpoints
| Method | Endpoint          | Description |
|--------|------------------|-------------|
| GET    | /api/transactions | Get all transactions |
| POST   | /api/transactions | Add a new transaction |
| PUT    | /api/transactions/:id | Update a transaction |
| DELETE | /api/transactions/:id | Delete a transaction |

## Future Improvements
- User authentication & authorization
- Budgeting feature to set spending limits
- Export transaction data to CSV
- Dark mode support



