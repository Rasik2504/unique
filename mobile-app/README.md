# Unique Brothers - Mobile App

React Native mobile application for Unique Brothers computer shop sales management system.

## Features

- 🔐 Secure authentication with JWT
- 👤 Employee dashboard (data entry only)
- 👑 Owner dashboard (full access with statistics)
- 📱 Cross-platform (iOS & Android)
- 🎨 Modern dark theme UI
- 🔄 Pull-to-refresh
- 📊 Real-time statistics
- 💾 Persistent login sessions

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo Go app on your mobile device
- Backend server running

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure API endpoint:**
   - Open `src/constants/theme.js`
   - Update `API_BASE_URL` to your backend URL:
     ```javascript
     export const API_BASE_URL = 'http://YOUR_IP_ADDRESS:5000/api';
     ```
   - **Note:** Use your computer's IP address (not localhost) when testing on a physical device

## Running the App

1. **Start the development server:**
   ```bash
   npm start
   ```

2. **Run on your device:**
   - Install **Expo Go** app from App Store (iOS) or Play Store (Android)
   - Scan the QR code shown in terminal with:
     - **iOS:** Camera app
     - **Android:** Expo Go app
   - The app will load on your device

3. **Alternative: Run on emulator:**
   ```bash
   # For Android
   npm run android
   
   # For iOS (Mac only)
   npm run ios
   ```

## Login Credentials

### Owner Account
- **Username:** owner
- **Password:** password
- **Access:** Full dashboard with statistics, view, edit, delete

### Employee Account
- **Username:** employee
- **Password:** password
- **Access:** Data entry only (cannot view data)

## App Structure

```
src/
├── constants/
│   └── theme.js          # Colors, fonts, spacing
├── contexts/
│   └── AuthContext.js    # Authentication context
├── navigation/
│   └── AppNavigator.js   # Navigation setup
├── screens/
│   ├── LoginScreen.js    # Login screen
│   ├── EmployeeScreen.js # Employee dashboard
│   └── OwnerScreen.js    # Owner dashboard
└── services/
    └── api.js            # API service layer
```

## Features by Role

### Employee Features
- ✅ Enter sales data for today
- ✅ Multiple entries per day
- ✅ Product, quantity, price, customer, payment method
- ✅ Real-time total calculation
- ❌ Cannot view submitted data

### Owner Features
- ✅ View all sales data
- ✅ Statistics (total sales, entries, average)
- ✅ Delete entries
- ✅ Pull-to-refresh
- ✅ Filter and search (coming soon)
- ✅ Edit entries (coming soon)

## Troubleshooting

### Connection Issues
1. Make sure backend is running on port 5000
2. Check your computer's IP address:
   - Windows: `ipconfig` (look for IPv4)
   - Mac/Linux: `ifconfig` or `ip addr`
3. Update `API_BASE_URL` in `src/constants/theme.js`
4. Ensure phone and computer are on same WiFi network

### App Not Loading
1. Clear Expo cache: `npm start -- --clear`
2. Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
3. Check Expo Go app is updated to latest version

## Building for Production

### Android (APK)
```bash
npx expo build:android
```

### iOS (IPA)
```bash
npx expo build:ios
```

## License

© 2026 Unique Brothers. All rights reserved.
