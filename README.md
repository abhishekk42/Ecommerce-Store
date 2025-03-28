# Ecommerce Store (Vite + React + Express)

This is an eCommerce store built using **Vite (React)** for the frontend and **Express.js** for the backend, with API integration for managing products, cart, and checkout functionalities.

## 📌 Features
- Product listing and details
- Add to cart & remove from cart
- checkout process
- Admin panel for checkout analysis and discount code generation

---

## 🚀 Setup & Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/ecommerce-store.git
cd ecommerce-store
```

### 2️⃣ Install Dependencies
#### Install frontend dependencies
```sh
cd client  # Navigate to the React frontend
npm install
```

#### Install backend dependencies
```sh
cd ../server  # Navigate to the Express backend
npm install
```

---

## ▶️ Running the Project

### 1️⃣ Start the Backend (Express.js)
```sh
cd server
npm start
```
The backend will run on `http://localhost:5000`

### 2️⃣ Start the Frontend (Vite + React)
```sh
cd client
npm run dev
```
The frontend will be available at `http://localhost:5173`

---

## 🔗 API Endpoints
The Express backend provides several API endpoints:

- **`GET /products`** - Fetch all products
- **`POST /cart`** - Add item to cart
- **`GET /cart`** - Retrieve cart items
- **`DELETE /cart/:id`** - Remove item from cart
- **`POST /checkout`** - Process checkout

Ensure the backend is running before interacting with these endpoints.

---

## 🛠️ Built With
- **Frontend:** React, Vite, React Router, Tailwind CSS, ShadCN/UI, Sonner (toasts)
- **Backend:** Node.js, Express.js
- **State Management:** React Context API
