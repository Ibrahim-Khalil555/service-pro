# ServicePro - Professional Services Booking Platform

ServicePro is a modern, full-stack booking platform designed for service-based businesses. It provides a seamless experience for users to find, filter, and book professional services while offering a robust management interface for administrators.

## 🚀 Key Features

- **Dynamic Service Catalog**: Real-time fetching of services from Firebase Firestore.
- **Smart Filtering & Search**: Easily find services by category, name, or description.
- **Secure Checkout**: Integration-ready checkout flow with order confirmation.
- **Automated Email Notifications**: Instant booking confirmations sent via Gmail SMTP.
- **Admin Dashboard**: Centralized panel to manage bookings, confirm service requests, and track platform activity.
- **Fully Responsive**: Optimized for a premium experience on mobile, tablet and desktop devices.

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS.
- **Icons**: Lucide React.
- **Backend**: Node.js, Express.
- **Database**: Firebase Firestore (via Firebase Admin SDK).
- **Communication**: Gmail SMTP (via `gmail-send`).
- **Development Tools**: Concurrently (runs both server and client together).

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

## ⚙️ Setup & Installation

ServicePro has been separated into independent `frontend` and `backend` projects. Follow these steps to deploy and run them:

### 1. Backend Setup & Deployment
First, deploy or run the backend server.
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with your credentials:
   ```env
   PORT=5000
   GMAIL_USER=your-email@gmail.com
   GMAIL_PASS=your-app-password
   ```
4. Setup Firebase:
   - Generate a New Private Key from Firebase Console (Project Settings > Service Accounts).
   - Rename the file to `firebase-service-account.json` and place it in the `backend` directory.
5. Deploy or run locally:
   ```bash
   npm start
   ```

### 2. Frontend Setup & Deployment
Once the backend is deployed, you will get a live backend API URL.

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Open `src/config/api.ts` and replace the `API_BASE_URL` with your deployed backend URL.
   ```typescript
   // frontend/src/config/api.ts
   const API_BASE_URL = 'https://your-deployed-backend-url.com';
   export default API_BASE_URL;
   ```
3. Install frontend dependencies:
   ```bash
   npm install
   ```
4. Deploy to Vercel/Netlify or run locally:
   ```bash
   npm run dev
   ```

## 🔮 Future Roadmap

ServicePro is built with scalability in mind. Future enhancements could include:
- **Admin Service Management**: Enable adding, editing, and deleting service categories directly from the Admin Panel.
- **User Authentication**: Implement customer accounts to track booking history.
- **Payment Integration**: Connect Stripe or PayPal for real-time payment processing.
- **Review System**: Allow customers to leave ratings and feedback for completed services.

## 📄 License
This project is licensed under the MIT License.
