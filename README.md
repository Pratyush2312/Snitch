# Snitch

Snitch is a full-stack clothing e-commerce application built with React, Node.js, Express, and MongoDB.

The platform supports customer authentication, seller product management, product browsing, cart management, image uploads, and role-based access control.

## Features

- User registration and login
- Role-based authentication
  - Buyer/User
  - Seller
- JWT-based authentication
- Access token and refresh token authentication
- HTTP-only refresh token cookies
- Product listing and product details
- Seller product management
- Create, update and delete products
- Product image uploads using ImageKit
- Product size and stock management
- Shopping cart
- Add products to cart
- Remove products from cart
- Product ownership authorization
- Responsive React frontend
- Toast notifications for user feedback

---

## Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- React Hook Form
- Axios
- Lucide React
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Express Validator
- Multer
- ImageKit

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- Image Storage: ImageKit

---

## Project Structure

```text
Snitch/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── products/
│   │   │   ├── seller/
│   │   │   └── cart/
│   │   ├── routes/
│   │   ├── shared/
│   │   ├── assets/
│   │   ├── api/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── src/
    │   ├── app/
    │   ├── config/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   ├── services/
    │   ├── utils/
    │   ├── validators/
    │   └── server.js
    │
    ├── package.json
```

---

# Getting Started

## Prerequisites

Make sure the following are installed:

- Node.js
- npm
- MongoDB Atlas account
- ImageKit account

You can verify Node.js and npm using:

```bash
node --version
npm --version
```

---

# Installation

## 1. Clone the repository

```bash
git clone https://github.com/Pratyush2312/Snitch.git
```

Navigate into the project:

```bash
cd Snitch
```

---

# Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` directory.

Example:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

Start the backend in development mode:

```bash
npm run dev
```

For production:

```bash
npm start
```

The backend will run on:

```text
http://localhost:3000
```

---

# Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000/api
```

Start the frontend:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

# Environment Variables

## Backend

| Variable | Description |
|---|---|
| `PORT` | Port on which the Express server runs |
| `MONGO_URI` | MongoDB Atlas connection string |
| `ACCESS_TOKEN_SECRET` | Secret used to sign access tokens |
| `REFRESH_TOKEN_SECRET` | Secret used to sign refresh tokens |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private key |

## Frontend

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the backend API |


---

# Authentication

Snitch uses JWT-based authentication.

The authentication system uses:

- Access token
- Refresh token
- HTTP-only cookie for refresh token
- Role-based authorization

The access token is sent in the request header:

```text
Authorization: Bearer <access_token>
```

The refresh token is stored in an HTTP-only cookie and is used to generate a new access token when the existing access token expires.

---

# User Roles

The application supports two roles:

### Buyer

Regular customers can:

- Browse products
- View product details
- Add products to cart
- Remove products from cart

### Seller

Sellers can:

- Browse products
- Create products
- View their products
- Update their products
- Delete their products
- Manage product stock and sizes

---

# API Documentation

Base URL:

```text
/api
```

For local development:

```text
http://localhost:3000/api
```

---

# Authentication Endpoints

## Register

Creates a new user account.

```http
POST /api/auth/register
```

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password@123",
  "confirmPassword": "Password@123",
  "role": "user"
}
```

### Seller Registration

```json
{
  "name": "Jane Seller",
  "email": "seller@example.com",
  "password": "Password@123",
  "confirmPassword": "Password@123",
  "role": "seller"
}
```

### Response

```json
{
  "message": "User created",
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## Login

Authenticates a user and returns an access token.

```http
POST /auth/login
```

### Request Body

```json
{
  "email": "john@example.com",
  "password": "Password@123"
}
```

### Response

```json
{
  "message": "Login successful",
  "data": {
    "accessToken": "your_access_token",
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

The refresh token is sent as an HTTP-only cookie.

---

## Logout

Logs out the currently authenticated user.

```http
POST /auth/logout
```

### Authentication

Required.

```text
Authorization: Bearer <access_token>
```

---

## Refresh Access Token

Generates a new access token using the refresh token.

```http
POST /api/auth/refresh-token
```

The refresh token is automatically sent through the HTTP-only cookie.

---

# Product Endpoints

## Get All Products

Returns all available products.

```http
GET /products
```

### Response

```json
{
  "message": "Products data fetched successfully",
  "data": {
    "products": []
  }
}
```

---

## Get Product by ID

Returns details of a specific product.

```http
GET /products/:id
```

### Example

```http
GET /products/64f123456789abcdef123456
```

---

## Create Product

Creates a new product.

Only authenticated sellers can create products.

```http
POST /products
```

### Authentication

Required.

```text
Authorization: Bearer <access_token>
```

### Content-Type

```text
multipart/form-data
```

### Form Data

```text
title
description
price
sizes
images
```

### Example

```text
title = Oversized Essential T-Shirt

description = Premium cotton oversized t-shirt with a relaxed fit and breathable fabric.

price = {
  "amount": 899,
  "currency": "INR"
}

sizes = [
  {
    "size": "XS",
    "stock": 5
  },
  {
    "size": "S",
    "stock": 10
  },
  {
    "size": "M",
    "stock": 20
  },
  {
    "size": "L",
    "stock": 15
  },
  {
    "size": "XL",
    "stock": 8
  }
]
```

Up to 5 product images can be uploaded.

---

## Update Product

Updates an existing product.

Only the seller who owns the product can update it.

```http
PUT /products/:id
```

### Authentication

Required.

```text
Authorization: Bearer <access_token>
```

### Content-Type

```text
multipart/form-data
```

### Form Data

```text
title
description
price
sizes
images
```

---

## Delete Product

Deletes a product.

Only the seller who owns the product can delete it.

```http
DELETE /products/:id
```

### Authentication

Required.

```text
Authorization: Bearer <access_token>
```

---

# Seller Endpoints

## Get Seller Products

Returns products belonging to the currently authenticated seller.

```http
GET /seller/products
```

### Authentication

Required.

### Role

```text
seller
```

### Response

```json
{
  "message": "Seller products fetched successfully",
  "data": {
    "products": []
  }
}
```

---

# Cart Endpoints

## Get Cart

Returns the current user's cart.

```http
GET /cart
```

### Authentication

Required.

```text
Authorization: Bearer <access_token>
```

The response contains the products in the user's cart along with quantity and selected size.

---

## Add Product to Cart

Adds a product to the user's cart.

```http
POST /cart
```

### Authentication

Required.

```text
Authorization: Bearer <access_token>
```

### Request Body

```json
{
  "productID": "64f123456789abcdef123456",
  "quantity": 2,
  "size": "M"
}
```

The API validates:

- Product existence
- Selected size
- Available stock
- Existing cart item
- Requested quantity

If the same product and size already exist in the cart, the quantity is increased.

---

## Remove Product from Cart

Removes a specific product-size combination from the cart.

```http
DELETE /cart
```

### Authentication

Required.

```text
Authorization: Bearer <access_token>
```

### Request Body

```json
{
  "productID": "64f123456789abcdef123456",
  "size": "M"
}
```

---

# Product Data Structure

A product follows this general structure:

```json
{
  "_id": "product_id",
  "title": "Oversized Essential T-Shirt",
  "description": "Premium cotton oversized t-shirt with a relaxed fit and breathable fabric.",
  "images": [
    "https://imagekit.io/example-image.jpg"
  ],
  "price": {
    "amount": 899,
    "currency": "INR"
  },
  "sizes": [
    {
      "size": "XS",
      "stock": 5
    },
    {
      "size": "S",
      "stock": 10
    },
    {
      "size": "M",
      "stock": 20
    },
    {
      "size": "L",
      "stock": 15
    },
    {
      "size": "XL",
      "stock": 8
    }
  ],
  "seller": "seller_user_id"
}
```

Supported currencies:

```text
INR
USD
```

Supported sizes:

```text
XS
S
M
L
XL
```

---

# Cart Data Structure

A cart contains products with their selected size and quantity.

```json
{
  "user": "user_id",
  "products": [
    {
      "product": "product_id",
      "quantity": 2,
      "size": "M"
    }
  ]
}
```

---

# Image Uploads

Product images are uploaded using:

- Multer
- Memory storage
- ImageKit

The API accepts up to:

```text
5 images per product
```

Maximum file size:

```text
1 MB per image
```

Uploaded images are stored in ImageKit and their URLs are saved in MongoDB.

---

# Validation

The backend validates incoming data using Express Validator and Mongoose validation.

Examples include:

- Required product title
- Product description length
- Valid email address
- Strong password requirements
- Password confirmation
- Valid product price
- Valid product sizes
- Non-negative stock
- Maximum number of product images

Passwords must contain:

- At least 6 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

Example:

```text
Password@123
```

---

# Authorization

Protected endpoints require a valid access token.

Example:

```http
Authorization: Bearer <access_token>
```

Seller-only endpoints additionally verify that the authenticated user's role is:

```text
seller
```

Product modification endpoints verify that the seller owns the product before allowing updates or deletion.

---

# Frontend Routing

The application uses React Router.

Main routes include:

```text
/
 /login
 /register
 /products
 /products/:id
 /cart
 /seller
 /seller/products/:id/edit
```

Seller routes are only available to authenticated sellers.

---


# API Summary

| Method | Endpoint | Authentication | Role |
|---|---|---|---|
| POST | `/api/auth/register` | No | All |
| POST | `/api/auth/login` | No | All |
| POST | `/api/auth/logout` | Yes | All |
| POST | `/api/auth/refresh-token` | Refresh Cookie | All |
| GET | `/api/products` | No | All |
| GET | `/api/products/:id` | No | All |
| POST | `/api/products` | Yes | Seller |
| PUT | `/api/products/:id` | Yes | Product Owner |
| DELETE | `/api/products/:id` | Yes | Product Owner |
| GET | `/api/seller/products` | Yes | Seller |
| GET | `/api/cart` | Yes | User |
| POST | `/api/cart` | Yes | User |
| DELETE | `/api/cart` | Yes | User |

---

# Running the Project

Start the backend:

```bash
cd backend
npm install
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

# Example User Flow

### Customer

```text
Register
   ↓
Login
   ↓
Browse Products
   ↓
View Product
   ↓
Select Size
   ↓
Add to Cart
   ↓
View Cart
   ↓
Remove Cart Items
```

### Seller

```text
Register as Seller
   ↓
Login
   ↓
Seller Dashboard
   ↓
Create Product
   ↓
Upload Product Images
   ↓
Manage Stock & Sizes
   ↓
Edit Product
   ↓
Delete Product
```

---

# Security Considerations

- Passwords are hashed using bcrypt.
- Access tokens are used for authenticated API requests.
- Refresh tokens are stored using HTTP-only cookies.
- Seller actions are protected using role-based authorization.
- Product modification requires product ownership.
- Sensitive environment variables are stored outside the source code.
- MongoDB credentials should never be committed to the repository.

---

# Future Improvements

Possible future improvements include:

- Product search
- Category filtering
- Product sorting
- Wishlist
- Order management
- Online payment integration
- Product reviews and ratings
- Seller analytics dashboard
- Inventory alerts
- Pagination
- Advanced product recommendations
- Order tracking


