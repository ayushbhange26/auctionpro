# 🏆 BidMaster - Online Bidding Platform

A modern full-stack online bidding platform that enables users to create auctions, participate in real-time bidding, monitor auction activity, and securely manage transactions. The platform is designed to deliver a seamless, transparent, and engaging auction experience for buyers, sellers, and administrators.

---

## 📌 Overview

BidMaster is a real-time online auction platform where sellers can list products for bidding and buyers can compete by placing live bids until the auction ends. The platform provides secure authentication, instant bid updates, personalized dashboards, and an intuitive user interface to ensure a reliable online auction experience.

---

## ✨ Key Features

### 🔐 Authentication & Authorization

- User Registration & Login
- Secure JWT Authentication
- Password Hashing with bcrypt
- Protected Routes
- Role-Based Access Control
- User Profile Management

---

### 🛍️ Auction Management

- Create and Manage Auctions
- Upload Product Images
- Set Starting Price
- Reserve Price Support
- Auction Start & End Scheduling
- Product Categories
- Product Descriptions
- Edit or Delete Auctions
- Seller Dashboard

---

### 💰 Live Bidding System

- Real-Time Bid Updates
- Highest Bid Tracking
- Instant Bid Validation
- Automatic Winner Selection
- Auction Countdown Timer
- Bid History
- Prevent Invalid or Duplicate Bids

---

### 📊 Dashboards

#### Buyer Dashboard

- Active Bids
- Won Auctions
- Bid History
- Watchlist

#### Seller Dashboard

- Active Auctions
- Sold Products
- Auction Statistics
- Revenue Overview

#### Admin Dashboard

- User Management
- Auction Monitoring
- Platform Analytics
- Report Management
- Fraud Monitoring

---

### 🔔 Notifications

- Outbid Alerts
- Highest Bid Notifications
- Auction Ending Reminder
- Auction Winner Notification
- Seller Updates

---

## 🚀 Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Framer Motion

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JWT
- bcrypt
- HTTP-Only Cookies

### Real-Time Communication

- Socket.IO

### Image Storage

- Cloudinary

### Deployment

- Vercel
- Render
- MongoDB Atlas

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/bidmaster.git
cd bidmaster
```

### Install Dependencies

Backend

```bash
cd server
npm install
```

Frontend

```bash
cd client
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret

CLIENT_URL=http://localhost:5173
```

---

## ▶️ Running the Project

Start the backend server

```bash
npm run dev
```

Start the frontend

```bash
npm run dev
```

Open your browser and visit:

```
http://localhost:5173
```

---

## 🔄 Application Workflow

1. Users register or log in.
2. Sellers create auctions by adding product details.
3. Buyers browse active auctions.
4. Users place bids in real time.
5. The highest bid is updated instantly across all connected users.
6. The auction automatically closes when the timer expires.
7. The highest bidder is declared the winner.
8. Auction history is stored for future reference.

---

## 🛡️ Security Features

- JWT Authentication
- Password Encryption using bcrypt
- Protected API Routes
- Role-Based Authorization
- Input Validation
- Secure HTTP-Only Cookies
- CORS Configuration
- Rate Limiting
- Helmet Security Middleware
- MongoDB Injection Protection

---

## 📈 Future Enhancements

- AI-Based Product Price Prediction
- AI Fraud Detection
- Auto Bidding (Proxy Bidding)
- Live Video Auctions
- Integrated Payment Gateway (Stripe/Razorpay)
- Email & SMS Notifications
- Chat Between Buyer and Seller
- Voice Search
- Voice Bidding
- Multi-Language Support
- Dark Mode
- Mobile Application
- Auction Recommendation System
- Wishlist & Favorites
- QR Code Payments
- Advanced Analytics Dashboard

---

## 🧪 Testing

Run the test suite using:

```bash
npm test
```

---

## 🤝 Contributing

Contributions are always welcome!

1. Fork the repository.
2. Create a new feature branch.

```bash
git checkout -b feature/your-feature
```

3. Commit your changes.

```bash
git commit -m "Add your feature"
```

4. Push to your branch.

```bash
git push origin feature/your-feature
```

5. Open a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Ayush Bhange**

MERN Stack Developer

- GitHub: https://github.com/yourusername
- LinkedIn: https://linkedin.com/in/yourprofile

---

## ⭐ Support

If you found this project helpful, please consider giving it a **⭐** on GitHub. Your support helps the project grow and motivates further development.
