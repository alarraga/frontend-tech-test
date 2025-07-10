# Frontend Engineer Interview

## Technical Test

### Problem Statement

You are tasked with creating a "Transaction Management" web application for customers on both mobile and desktop. This application should display a list of payment transactions in a table format with the ability to view, filter, and manage transaction data through API interactions.

### Requirements

1. The application should display a list of payment transactions in a table format
2. Each payment transaction has an amount, currency, and status
3. The application should support filtering by currency and status
4. The application can handle pagination for large datasets

### Expected Deliverables

- A single-page application with a transaction table
- Filter controls for currency and status

## API Documentation

### GET /api/transactions

Retrieves a list of transactions with optional filtering and pagination.

**Query Parameters:**

- `page` (optional): Page number for pagination (starts at 1)
- `pageSize` (optional): Number of items per page
- `currency` (optional): Filter by currency (USD, EUR, GBP, AUD)
- `status` (optional): Filter by status (Success, Failed, Pending)

**Response:**

```json
{
  "data": [
    {
      "amount": 114.91,
      "currency": "USD",
      "status": "Success"
    }
  ],
  "page": 1,
  "pageSize": 10,
  "total": 104,
  "totalPages": 11
}
```

## Notes

- The API intentionally includes random failures and delays
- Feel free to use your UI design skills, there is no boundary to how this web application should look
- Feel free to add additional features that enhance the user experience

## Setup Instructions

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd frontend-engineer-tech-test
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
