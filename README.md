# Computer Shop Data Management System

A hybrid mobile and web application for managing computer shop sales data with role-based access control.

## Features

- **Employee Access**: Write-only data entry for today's sales (no viewing)
- **Owner Access**: Full CRUD operations, analytics, and reporting
- **Secure Authentication**: JWT-based authentication
- **Real-time Statistics**: Sales tracking and analytics
- **Modern UI**: Premium dark theme with smooth animations

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React.js, Vite
- **Authentication**: JWT
- **Styling**: Custom CSS with modern design system

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation & Setup

### 1. Clone or Navigate to Project
```bash
cd computer-shop-app
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit .env file if needed (MongoDB URI, JWT secret, etc.)

# Seed database with demo users
node seed.js

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd web-frontend

# Dependencies are already installed
# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

## Demo Credentials

**Owner Account:**
- Username: `owner`
- Password: `password`

**Employee Account:**
- Username: `employee`
- Password: `password`

## Usage

### Employee Workflow
1. Login with employee credentials
2. Enter sales data (Product, Quantity, Price, Customer, Payment Method)
3. Submit multiple entries throughout the day
4. Data is immediately hidden after submission (write-only access)

### Owner Workflow
1. Login with owner credentials
2. View all sales data in a table
3. See real-time statistics (Total Sales, Total Entries, Average Sale)
4. Edit or delete any entry
5. Track daily/historical sales data

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Register new user (Owner only)
- `GET /api/auth/me` - Get current user

### Data
- `GET /api/data` - Get all data (Owner only)
- `POST /api/data` - Create new entry
- `PUT /api/data/:id` - Update entry (Owner only)
- `DELETE /api/data/:id` - Delete entry (Owner only)
- `GET /api/data/stats` - Get statistics (Owner only)

## Project Structure

```
computer-shop-app/
├── backend/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   ├── server.js        # Main server file
│   ├── seed.js          # Database seeding
│   └── .env             # Environment variables
│
└── web-frontend/
    ├── src/
    │   ├── components/  # React components
    │   ├── contexts/    # React contexts
    │   ├── services/    # API services
    │   ├── App.jsx      # Main app component
    │   └── index.css    # Global styles
    └── package.json
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Date-based entry restrictions for employees
- Protected API routes

## Future Enhancements

- Mobile app (React Native)
- Excel export functionality
- Advanced analytics and charts
- Date range filtering
- Multi-shop support
- Email notifications

## License

MIT
