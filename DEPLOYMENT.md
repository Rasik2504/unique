# 🚀 Deployment Guide - Computer Shop App

This guide will help you host your application online so you can access it from anywhere (phones, laptops, etc.).

We will use **Render** for the Backend (Server) and **Vercel** for the Frontend (website). Both have excellent free tiers.

---

## 1. Prerequisites

Before starting, ensure you have:
1.  A **GitHub Account**.
2.  Your code pushed to a **GitHub Repository**.
    - If you haven't done this, create a new repo on GitHub and push your code there.
3.  A **MongoDB Atlas** account (for the online database).

---

## 2. Set up the Database (MongoDB Atlas)

Since your local database won't work online, you need a cloud database.

1.  Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up/login.
2.  Create a **New Cluster** (select the **Shared / Free** tier).
3.  Go to **Database Access** -> **Add New Database User**.
    - Create a username/password (e.g., `admin` / `securepassword123`).
    - **Crucial:** Save this password!
4.  Go to **Network Access** -> **Add IP Address**.
    - Select **"Allow Access from Anywhere"** (0.0.0.0/0).
    - This allows your online server to connect to the database.
5.  Go to **Database** -> **Connect** -> **Drivers**.
    - Copy the connection string (e.g., `mongodb+srv://admin:<password>@cluster0...`).
    - Replace `<password>` with the password you created in step 3.
    - **Save this connection string.**

---

## 3. Deploy Backend (Render)

1.  Go to [Render.com](https://render.com) and sign up/login.
2.  Click **"New +"** and select **"Web Service"**.
3.  Connect your GitHub repository.
4.  Configure the service:
    - **Name:** `computer-shop-backend` (or similar)
    - **Root Directory:** `backend` (IMPORTANT: This tells Render the server code is in the 'backend' folder)
    - **Environment:** Node
    - **Build Command:** `npm install`
    - **Start Command:** `npm start`
5.  Scroll down to **Environment Variables** and add:
    - `MONGODB_URI`: Paste your MongoDB connection string from Step 2.
    - `JWT_SECRET`: Enter a long random secret key (e.g., `mysupersecretkey123`).
    - `NODE_ENV`: `production`
6.  Click **Create Web Service**.
7.  Wait for deployment to finish. Render will give you a URL (e.g., `https://computer-shop-backend.onrender.com`).
    - **Copy this URL.** You need it for the frontend.

---

## 4. Deploy Frontend (Vercel)

1.  Go to [Vercel.com](https://vercel.com) and sign up/login.
2.  Click **"Add New..."** -> **Project**.
3.  Import your GitHub repository.
4.  Configure the project:
    - **Framework Preset:** Vite (should be auto-detected).
    - **Root Directory:** Edit this and select the `web-frontend` folder.
5.  Open **Environment Variables** and add:
    - **Key:** `VITE_API_URL`
    - **Value:** `https://computer-shop-backend.onrender.com/api` (The URL from Step 3, with `/api` at the end).
6.  Click **Deploy**.
7.  Wait for the build to complete. Vercel will give you a live URL (e.g., `https://computer-shop-frontend.vercel.app`).

---

## 5. Final Testing

1.  Open your Vercel URL on your phone or computer.
2.  **First login:** You may need to seed the database or manually register an owner user if you haven't set up a registration route for owners (or you can use a tool like Postman to hit your live backend registration endpoint).
    - *Tip: If you have a `seed.js` script, you can run it locally but point it to your production MongoDB URI to create your initial admin user.*
3.  Test adding data and checking the dashboard.

SUCCESS! Your app is now online. 🌍
