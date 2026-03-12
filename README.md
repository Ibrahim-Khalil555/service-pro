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

Follow these steps to get your local development environment running:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/service-pro.git
cd service-pro
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add your credentials:
```env
PORT=3001
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
```
> **Note**: For `GMAIL_PASS`, you should use a Google [App Password](https://support.google.com/accounts/answer/185833?hl=en), not your regular password.

### 4. Setup Firebase
1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Firestore Database**.
3. Go to **Project Settings > Service Accounts**.
4. Click **Generate New Private Key** and download the JSON file.
5. Rename the file to `firebase-service-account.json` and place it in the project root.

### 5. Start the Application
```bash
npm run dev
```
The application will launch on:
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **API Server**: [http://localhost:3001](http://localhost:3001)
- **Admin Panel**: [http://localhost:5173/admin](http://localhost:5173/admin)

## 🔮 Future Roadmap

ServicePro is built with scalability in mind. Future enhancements could include:
- **Admin Service Management**: Enable adding, editing, and deleting service categories directly from the Admin Panel.
- **User Authentication**: Implement customer accounts to track booking history.
- **Payment Integration**: Connect Stripe or PayPal for real-time payment processing.
- **Review System**: Allow customers to leave ratings and feedback for completed services.

## 📄 License
This project is licensed under the MIT License.
