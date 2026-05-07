# 🚀 Opinion Forecasting Platform

A full-stack prediction and opinion forecasting platform where users can participate in YES/NO based forecasts using virtual wallet balance. The platform allows users to stake amounts on predictions, track forecasting history, and receive rewards based on correct outcomes.

The project focuses heavily on backend business logic including authentication, wallet management, prediction lifecycle handling, reward settlement, and secure API architecture.

---

# 🌟 Features

## 🔐 Authentication System

- User Registration & Login
- JWT-based Authentication
- HTTP-only Cookie Authentication
- Protected Routes
- Role-Based Access

---

## 💰 Wallet System

- Automatic wallet creation on signup
- Initial virtual balance allocation
- Wallet balance deduction during forecasting
- Reward distribution for winning forecasts

---

## 📊 Prediction & Forecasting

- Create Predictions
- YES / NO Forecast Submission
- Time-based Prediction Status
- Live / Upcoming / Closed / Settled States
- Duplicate Forecast Prevention
- Reward Settlement Engine

---

## 📈 Forecast History

- View previously submitted forecasts
- Track prediction outcomes
- View reward amounts and results

---

# 🛠 Tech Stack

## Frontend

```bash
React.js
Vite
Tailwind CSS
React Router DOM
Axios
Context API
```

## Backend

```bash
Node.js
Express.js
JWT Authentication
Cookie Parser
bcrypt
REST APIs
Middleware
```

## Database

```bash
MongoDB
Mongoose
```

## Deployment

```bash
Frontend -> Vercel
Backend -> Render
Database -> MongoDB Atlas
```

---

# 🚀 Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/anubhav-2212/OpinionForecastingPlatform.git
cd OpinionForecastingPlatform
```

---

## 2️⃣ Backend Setup

```bash
cd server
npm install
npm run dev
```

---

## 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

# 🔐 Environment Variables

Create `.env` inside `server`

```env
PORT=8001
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
NODE_ENV=development
```

---

# 📂 Project Structure

```bash
OpinionForecastingPlatform/
│
├── client/
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js
│
└── README.md
```

---

# 🔥 Core Backend Logic

## Authentication Flow

```bash
User Login/Register
↓
JWT Token Generated
↓
Token Stored in HTTP-only Cookies
↓
Protected Middleware Verifies Token
↓
User Access Granted
```

---

## Forecast Flow

```bash
Admin Creates Prediction
↓
Prediction Goes Live
↓
User Submits YES/NO Forecast
↓
Wallet Balance Deducted
↓
Prediction Result Declared
↓
Winning Users Receive Rewards
```

---

# 🧠 Key Features Implemented

## Validation Logic

- Forecast amount validation
- Duplicate forecast prevention
- Time-based prediction validation
- Wallet balance verification
- Prediction status checks

---

## Database Relationships

Implemented relationships between:

```bash
User
Wallet
Prediction
UserForecast
```

Using Mongoose references and `populate()`.

---

# 🔥 Business Logic Highlights

- Users cannot submit multiple forecasts on same prediction
- Forecasting only allowed during live period
- Reward distribution handled dynamically
- Prediction status calculated using timestamps
- Wallet balances updated atomically

---

# 📸 Screenshots

```bash
Add:
1. Home Page
2. Login Page
3. Prediction Dashboard
4. Wallet Page
5. Forecast History
```

---

# 📈 Why This Project Stands Out

- Real-world backend business logic
- Secure authentication architecture
- Wallet & transaction management
- Prediction settlement engine
- Time-based workflow implementation
- REST API architecture
- MongoDB relationship handling

---

# 💼 Resume Description

Developed a full-stack opinion forecasting platform enabling users to participate in YES/NO based predictions using virtual wallet balance with secure JWT authentication, reward settlement logic, prediction lifecycle management, and MongoDB-based relational data handling.

---

# 🔥 Future Improvements

- Real-time prediction updates using WebSockets
- Live leaderboards
- Admin analytics dashboard
- Razorpay/Stripe integration
- AI-based trend analysis
- Real-time notifications

---

# 👨‍💻 Author

```bash
Anubhav Srivastva
```

---

# ⭐ Support

If you liked this project, give it a ⭐ on GitHub.
