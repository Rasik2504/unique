# Unique Brothers - Sales Management System

![Unique Brothers Logo](./logo.png)

A hybrid mobile and web application for **Unique Brothers** computer shop to manage daily sales data with strict role-based access control.

**Services:** Browsing | Designing | LED Board | Stickers | Gifts

## Features

- 🔐 **Secure Authentication**: JWT-based authentication with password hashing
- 👤 **Employee Access**: Write-only data entry for today's sales (no viewing)
- 👑 **Owner Access**: Full CRUD operations, analytics, and reporting
- 📊 **Real-time Statistics**: Sales tracking and analytics
- 📱 **Mobile App**: React Native app for iOS & Android
- 🌐 **Web App**: Modern React web application
- 🎨 **Premium UI**: Modern dark theme with smooth animations
- 📥 **Excel Export**: Download sales data in Excel format

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcrypt

### Web Frontend
- React.js
- Vite
- Modern CSS with Glassmorphism
- React Router

### Mobile App
- React Native
- Expo
- React Navigation
- AsyncStorage

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn
- Expo Go app (for mobile testing)

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

### 3. Web Frontend Setup

Open a new terminal:

```bash
cd web-frontend

# Install dependencies (if needed)
npm install

# Start development server
npm run dev
```

Web frontend will run on `http://localhost:5173`

### 4. Mobile App Setup

Open a new terminal:

```bash
cd mobile-app

# Install dependencies
npm install

# Configure API endpoint
# Edit src/constants/theme.js
# Update API_BASE_URL to your computer's IP address

# Start Expo server
npm start
```

Scan QR code with Expo Go app to run on your device.

See [mobile-app/README.md](./mobile-app/README.md) for detailed mobile setup.

## Demo Credentials

### Owner Account
- **Username:** `owner`
- **Password:** `password`
- **Access:** Full dashboard, statistics, edit, delete

### Employee Account
- **Username:** `employee`
- **Password:** `password`
- **Access:** Data entry only (cannot view data)

## Usage

### Employee Workflow
1. Login with employee credentials
2. Enter sales data using the Excel-like table:
   - Product Name
   - Quantity
   - Price
   - Customer Name
   - Payment Method (Cash/Card/UPI/etc.)
3. Add multiple rows and submit all at once
4. Data is immediately hidden after submission (write-only access)

### Owner Workflow
1. Login with owner credentials
2. View dashboard with real-time statistics:
   - Total Sales (₹)
   - Total Entries
   - Average Sale Amount
3. View all sales data in a table
4. Edit or delete any entry
5. Export data to Excel (today, this month, or all data)
6. Add new entries directly from owner dashboard

## Application Screenshots

### Web Application
- **Login Page:** Unique Brothers logo with modern dark theme
- **Employee Dashboard:** Excel-like data entry table
- **Owner Dashboard:** Statistics + Data table with CRUD operations

### Mobile Application
- **Login Screen:** Logo with clean mobile UI
- **Employee Screen:** Mobile-optimized data entry form
- **Owner Screen:** Statistics cards + scrollable data list

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Register new user (Owner only)
- `GET /api/auth/me` - Get current user

### Data
- `GET /api/data` - Get all data (Owner only, returns empty for employees)
- `POST /api/data` - Create new entry (Employees: today only)
- `PUT /api/data/:id` - Update entry (Owner only)
- `DELETE /api/data/:id` - Delete entry (Owner only)
- `GET /api/data/stats` - Get statistics (Owner only)

## Project Structure

```
computer-shop-app/
├── backend/                # Node.js + Express API
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication middleware
│   ├── server.js          # Main server file
│   ├── seed.js            # Database seeding
│   └── .env               # Environment variables
│
├── web-frontend/          # React Web Application
│   ├── public/
│   │   └── logo.png       # Unique Brothers logo
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── contexts/      # React contexts
│   │   ├── services/      # API services
│   │   ├── utils/         # Excel export utilities
│   │   ├── App.jsx        # Main app component
│   │   └── index.css      # Global styles
│   └── index.html
│
└── mobile-app/            # React Native Mobile App
    ├── assets/
    │   └── logo.png       # Unique Brothers logo
    ├── src/
    │   ├── constants/     # Theme, colors, API URL
    │   ├── contexts/      # Auth context
    │   ├── navigation/    # App navigator
    │   ├── screens/       # Login, Employee, Owner screens
    │   └── services/      # API service
    ├── App.js
    └── app.json
```

## Security Features

✅ Password hashing with bcrypt (10 salt rounds)  
✅ JWT token authentication  
✅ Role-based access control middleware  
✅ Date-based entry restrictions for employees  
✅ Protected API routes  
✅ Input validation  
✅ Secure token storage (localStorage/AsyncStorage)

## Features by Role

### Employee Features
- ✅ Enter sales data for today only
- ✅ Submit multiple entries per day
- ✅ Excel-like table interface (web)
- ✅ Mobile-optimized form (mobile)
- ❌ Cannot view any submitted data
- ❌ Cannot modify past entries

### Owner Features
- ✅ View all sales data (any date)
- ✅ Real-time statistics dashboard
- ✅ Edit any entry (inline editing on web)
- ✅ Delete any entry
- ✅ Export to Excel (web)
- ✅ Add new entries
- ✅ Pull-to-refresh (mobile)

## Deployment

### Backend
- Deploy to Heroku, Railway, or any Node.js hosting
- Configure MongoDB Atlas for production database
- Set environment variables for JWT secret and MongoDB URI

### Web Frontend
- Deploy to Vercel, Netlify, or any static hosting
- Update API base URL in production build

### Mobile App
- Build APK for Android: `npx expo build:android`
- Build IPA for iOS: `npx expo build:ios`
- Publish to Google Play Store / Apple App Store

## Future Enhancements

- [ ] Edit functionality in mobile app
- [ ] Advanced analytics with charts
- [ ] Date range filtering
- [ ] Product inventory management
- [ ] Multi-shop support
- [ ] Email notifications
- [ ] Receipt generation
- [ ] Backup and restore

## Support

For issues or questions, contact Unique Brothers support.

## License

© 2026 Unique Brothers. All rights reserved.
