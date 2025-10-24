# 🛍️ Aliconcon Backend API (E-Commerce)

> A production-grade, scalable RESTful API built with Node.js, Express, Redis, RabbitMQ, AWS, MySQL, and MongoDB for a full-featured e-commerce platform with microservices architecture.

[![Node.js](https://img.shields.io/badge/Node.js-22.x-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.x-brightgreen.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Design Patterns](#design-patterns)
- [Security Features](#security-features)
- [Performance Optimizations](#performance-optimizations)
- [Future Enhancements](#future-enhancements)

## 🎯 Overview

This backend system powers a modern e-commerce platform with enterprise-level features including multi-shop support, advanced discount management, real-time inventory tracking, and asynchronous order processing. Built with scalability and maintainability in mind, the system implements industry best practices and proven design patterns.

### Why This Project?

- **Production-Ready**: Implements security, error handling, and monitoring best practices
- **Scalable Architecture**: Microservices design with message queues for horizontal scaling
- **Clean Code**: Repository pattern, Factory pattern, and SOLID principles
- **Cloud-Native**: Integrated with AWS S3 and Cloudinary for file storage
- **Modern Stack**: Latest versions of Node.js, Express, Redis, RabbitMQ, AWS, MySQL, and MongoDB

## ✨ Key Features

### 🔐 Authentication & Authorization

- JWT-based authentication with refresh token rotation
- Token reuse detection for enhanced security
- API key validation for service-to-service communication
- Role-based access control (RBAC)

### 🛒 E-Commerce Core

- **Product Management**
  - Multi-type product support (Electronics, Clothing, etc.)
  - Dynamic product attributes
  - Draft and publish workflows
  - Full-text search capabilities
- **Shopping Cart**
  - Real-time cart updates
  - Multi-shop cart support
  - Automatic price validation
- **Checkout System**
  - Multi-shop order processing
  - Discount code validation and application
  - Inventory locking with Redis
  - Atomic transaction handling
- **Discount Management**
  - Percentage and fixed-value discounts
  - Product-specific or shop-wide promotions
  - Usage limits and expiration dates
  - Minimum order value requirements

### 📦 Advanced Features

- **Inventory Management**: Real-time stock tracking with distributed locking
- **Order Processing**: Asynchronous order handling and notification system with RabbitMQ
- **File Upload**: Multi-cloud storage (AWS S3, Cloudinary) with pre-signed URLs
- **Notifications**: Real-time event logs via Discord webhooks
- **Comments System**: Nested comments with parent-child relationships
- **Caching Layer**: Redis-based caching for improved performance

## 🏗️ Architecture

_TODO_

### Microservices Components

1. **Main API Service** (`backend-api/`)

   - RESTful API endpoints
   - Business logic layer
   - Data access layer

2. **Message Queue Service** (`sys-message-queue/`)
   - Asynchronous task processing
   - Event-driven communication
   - Decoupled service integration

## 🛠️ Tech Stack

### Core Technologies

- **Runtime**: Node.js 22+
- **Framework**: Express.js 5.x
- **Database**: MongoDB 8.x with Mongoose ODM
- **Cache**: Redis 5.x
- **Message Queue**: RabbitMQ (amqplib)

### Key Libraries

- **Authentication**: bcrypt, jsonwebtoken
- **Security**: helmet, express-rate-limit
- **File Upload**: multer
- **Cloud Storage**: @aws-sdk/client-s3, cloudinary
- **Utilities**: lodash, slugify
- **Logging**: morgan, discord.js (webhook integration)
- **Performance**: compression

### Development Tools

- **Package Manager**: npm
- **Code Style**: CommonJS modules
- **Environment**: dotenv

## 📁 Project Structure

```
aliconcon-backend-api-main/
│
├── backend-api/                    # Main API service
│   ├── src/
│   │   ├── auth/                   # Authentication utilities
│   │   │   ├── authUtils.js        # JWT token generation/validation
│   │   │   └── checkAuth.js        # API key & permission checks
│   │   │
│   │   ├── config/                 # Configuration files
│   │   │   ├── mongodb.config.js   # MongoDB connection settings
│   │   │   ├── cloudinary.config.js
│   │   │   ├── s3.config.js        # AWS S3 configuration
│   │   │   └── multer.config.js    # File upload settings
│   │   │
│   │   ├── controllers/                # Request handlers
│   │   │   ├── access.controller.js    # Auth endpoints
│   │   │   ├── product.controller.js   # Product CRUD
│   │   │   ├── cart.controller.js      # Cart operations
│   │   │   ├── checkout.controller.js  # Order processing
│   │   │   ├── discount.controller.js  # Discount management
│   │   │   ├── comment.controller.js   # Comments system
│   │   │   ├── notification.controller.js
│   │   │   └── upload.controller.js    # File uploads
│   │   │
│   │   ├── core/                  # Core response handlers
│   │   │   ├── error.response.js  # Custom error classes
│   │   │   └── success.response.js
│   │   │
│   │   ├── dbs/                   # Database initialization
│   │   │   └── init.mongodb.js
│   │   │
│   │   ├── helpers/               # Utility helpers
│   │   │   ├── asyncErrorHandler.js
│   │   │   └── check.connect.js   # Connection monitoring
│   │   │
│   │   ├── loggers/               # Logging services
│   │   │   └── discord.log.js     # Discord webhook logger
│   │   │
│   │   ├── middlewares/           # Custom middleware
│   │   │   └── index.js
│   │   │
│   │   ├── models/                # Data models
│   │   │   ├── product.model.js
│   │   │   ├── shop.model.js
│   │   │   ├── cart.model.js
│   │   │   ├── order.model.js
│   │   │   ├── discount.model.js
│   │   │   ├── inventory.model.js
│   │   │   ├── comment.model.js
│   │   │   ├── notification.model.js
│   │   │   ├── keyToken.model.js
│   │   │   ├── apikey.model.js
│   │   │   │
│   │   │   └── repositories/      # Data access layer
│   │   │       ├── product.repo.js
│   │   │       ├── cart.repo.js
│   │   │       ├── discount.repo.js
│   │   │       └── inventory.repo.js
│   │   │
│   │   ├── routes/                # API routes
│   │   │   ├── index.js           # Main router
│   │   │   ├── access/            # Auth routes
│   │   │   ├── product/           # Product routes
│   │   │   ├── cart/              # Cart routes
│   │   │   ├── checkout/          # Checkout routes
│   │   │   ├── discount/          # Discount routes
│   │   │   ├── comment/           # Comment routes
│   │   │   ├── notification/      # Notification routes
│   │   │   └── upload/            # Upload routes
│   │   │
│   │   ├── services/              # Business logic layer
│   │   │   ├── access.service.js
│   │   │   ├── product.service.js
│   │   │   ├── cart.service.js
│   │   │   ├── checkout.service.js
│   │   │   ├── discount.service.js
│   │   │   ├── comment.service.js
│   │   │   ├── notification.service.js
│   │   │   ├── upload.service.js
│   │   │   ├── redis.service.js   # Caching & locking
│   │   │   ├── keyToken.service.js
│   │   │   ├── shop.service.js
│   │   │   └── apikey.service.js
│   │   │
│   │   ├── tests/                 # Test files
│   │   │   └── message_queue/     # RabbitMQ tests
│   │   │       └── rabbitmq/
│   │   │           ├── producer.js
│   │   │           ├── consumer.js
│   │   │           ├── ordered.producer.js
│   │   │           ├── ordered.consumer.js
│   │   │           └── producerDLX.js  # Dead Letter Exchange
│   │   │
│   │   ├── types/                 # Type definitions & constants
│   │   │   └── index.js
│   │   │
│   │   ├── utils/                 # Utility functions
│   │   │   ├── index.js
│   │   │   └── httpStatusCode/
│   │   │       ├── statusCodes.js
│   │   │       └── reasonPhrases.js
│   │   │
│   │   ├── app.js                 # Express app setup
│   │   └── server.js              # Server entry point
│   │
│   └── package.json
│
└── sys-message-queue/             # Message queue microservice
    ├── src/
    │   ├── dbs/
    │   │   └── init.rabbitmq.js   # RabbitMQ initialization
    │   ├── services/
    │   │   └── consumerQueue.service.js
    │   ├── tests/
    │   │   ├── mongodb.test.js
    │   │   └── rabbitmq.test.js
    │   └── server.js
    │
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 22.x or higher
- MongoDB 8.x
- Redis 5.x
- RabbitMQ 3.x (optional, for message queue features)
- AWS Account (for S3 storage)
- Cloudinary Account (for image CDN)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd aliconcon-backend-api-main
   ```

2. **Install dependencies for main API**

   ```bash
   cd backend-api
   npm install
   ```

3. **Install dependencies for message queue service**

   ```bash
   cd ../sys-message-queue
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in `backend-api/` directory:

   ```env
   # Server Configuration
   PORT=3055
   NODE_ENV=development

   # Database
   MONGODB_URI=mongodb://localhost:27017/ecommerce

   # Redis
   REDIS_HOST=localhost
   REDIS_PORT=6379

   # RabbitMQ
   RABBITMQ_URL=amqp://localhost:5672

   # JWT Secrets
   JWT_ACCESS_SECRET=your-access-token-secret
   JWT_REFRESH_SECRET=your-refresh-token-secret

   # AWS S3
   AWS_BUCKET_NAME=your-bucket-name
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=your-access-key
   AWS_SECRET_ACCESS_KEY=your-secret-key

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # Discord Webhook (Optional)
   DISCORD_WEBHOOK_URL=your-webhook-url
   ```

5. **Start MongoDB**

   ```bash
   mongod --dbpath /path/to/data
   ```

6. **Start Redis**

   ```bash
   redis-server
   ```

7. **Start RabbitMQ** (optional)

   ```bash
   rabbitmq-server
   ```

8. **Run the main API**

   ```bash
   cd backend-api
   npm run dev
   ```

9. **Run the message queue service** (in a separate terminal)
   ```bash
   cd sys-message-queue
   npm start
   ```

The API will be available at `http://localhost:3055`

## 📚 API Documentation

### Base URL

```
http://localhost:3055/v1/api
```

### Authentication

All authenticated endpoints require:

- **Header**: `x-api-key` - Your API key
- **Header**: `authorization` - JWT access token
- **Header**: `x-client-id` - User/Shop ID

### API Endpoints

#### 🔐 Authentication (`/shops`)

| Method | Endpoint               | Description                 | Auth Required |
| ------ | ---------------------- | --------------------------- | ------------- |
| POST   | `/shops/signup`        | Register a new shop         | No            |
| POST   | `/shops/login`         | Login and get tokens        | No            |
| POST   | `/shops/logout`        | Logout and invalidate token | Yes           |
| POST   | `/shops/refresh-token` | Refresh access token        | Yes           |

**Signup Request:**

```json
{
  "name": "My Shop",
  "email": "shop@example.com",
  "password": "securePassword123"
}
```

**Login Response:**

```json
{
  "code": 200,
  "message": "Login Success",
  "metadata": {
    "shop": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "My Shop",
      "email": "shop@example.com"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
    }
  }
}
```

#### 🛍️ Products (`/products`)

| Method | Endpoint                      | Description            | Auth Required |
| ------ | ----------------------------- | ---------------------- | ------------- |
| GET    | `/products`                   | Get all products       | No            |
| GET    | `/products/:id`               | Get product by ID      | No            |
| GET    | `/products/search/:keySearch` | Search products        | No            |
| POST   | `/products`                   | Create a product       | Yes           |
| PATCH  | `/products/:productId`        | Update a product       | Yes           |
| GET    | `/products/drafts/all`        | Get all draft products | Yes           |
| GET    | `/products/published/all`     | Get published products | Yes           |
| POST   | `/products/publish/:id`       | Publish a product      | Yes           |
| POST   | `/products/unpublish/:id`     | Unpublish a product    | Yes           |

**Create Product Request:**

```json
{
  "name": "Smartphone X",
  "description": "Latest flagship smartphone",
  "thumb": "https://example.com/image.jpg",
  "price": 999.99,
  "quantity": 100,
  "type": "Electronics",
  "attributes": {
    "manufacturer": "TechCorp",
    "model": "X-2024",
    "color": "Black"
  }
}
```

#### 🛒 Cart (`/carts`)

| Method | Endpoint | Description           | Auth Required |
| ------ | -------- | --------------------- | ------------- |
| GET    | `/carts` | Get user cart         | Yes           |
| POST   | `/carts` | Add item to cart      | Yes           |
| PATCH  | `/carts` | Update cart item      | Yes           |
| DELETE | `/carts` | Remove item from cart | Yes           |

**Add to Cart Request:**

```json
{
  "productId": "507f1f77bcf86cd799439011",
  "quantity": 2
}
```

#### 💰 Discounts (`/discounts`)

| Method | Endpoint                 | Description                 | Auth Required |
| ------ | ------------------------ | --------------------------- | ------------- |
| POST   | `/discounts`             | Create discount code        | Yes           |
| GET    | `/discounts`             | Get all discount codes      | Yes           |
| GET    | `/discounts/:code`       | Get discount by code        | No            |
| PATCH  | `/discounts/:discountId` | Update discount             | Yes           |
| DELETE | `/discounts/:discountId` | Delete discount             | Yes           |
| POST   | `/discounts/apply`       | Apply discount to products  | Yes           |
| DELETE | `/discounts/cancel`      | Cancel discount application | Yes           |

**Create Discount Request:**

```json
{
  "name": "Summer Sale",
  "description": "20% off all items",
  "type": "percentage",
  "value": 20,
  "code": "SUMMER2024",
  "startDate": "2024-06-01",
  "endDate": "2024-08-31",
  "quantity": 1000,
  "maxUsesPerUser": 1,
  "minOrderValue": 50,
  "appliedTo": "all",
  "isActive": true
}
```

#### 💳 Checkout (`/checkout`)

| Method | Endpoint           | Description                  | Auth Required |
| ------ | ------------------ | ---------------------------- | ------------- |
| POST   | `/checkout/review` | Review order before checkout | Yes           |
| POST   | `/checkout/order`  | Place an order               | Yes           |

**Checkout Review Request:**

```json
{
  "cartId": "507f1f77bcf86cd799439011",
  "shopOrderItems": [
    {
      "shopId": "507f1f77bcf86cd799439012",
      "shopDiscounts": [
        {
          "shopId": "507f1f77bcf86cd799439012",
          "discountId": "507f1f77bcf86cd799439013",
          "code": "SUMMER2024"
        }
      ],
      "items": [
        {
          "productId": "507f1f77bcf86cd799439014",
          "quantity": 2,
          "price": 999.99
        }
      ]
    }
  ]
}
```

**Place Order Request:**

```json
{
  "cartId": "507f1f77bcf86cd799439011",
  "userPayment": {
    "method": "credit_card",
    "cardNumber": "****1234"
  },
  "userAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "shopOrderItems": [...]
}
```

#### 💬 Comments (`/comments`)

| Method | Endpoint               | Description                | Auth Required |
| ------ | ---------------------- | -------------------------- | ------------- |
| POST   | `/comments`            | Create a comment           | Yes           |
| GET    | `/comments`            | Get comments for a product | No            |
| DELETE | `/comments/:commentId` | Delete a comment           | Yes           |

#### 📤 File Upload (`/upload`)

| Method | Endpoint           | Description                | Auth Required |
| ------ | ------------------ | -------------------------- | ------------- |
| POST   | `/upload/image`    | Upload image to Cloudinary | Yes           |
| POST   | `/upload/images`   | Upload multiple images     | Yes           |
| POST   | `/upload/image/s3` | Upload image to S3         | Yes           |

#### 🔔 Notifications (`/notifications`)

| Method | Endpoint         | Description            | Auth Required |
| ------ | ---------------- | ---------------------- | ------------- |
| GET    | `/notifications` | Get user notifications | Yes           |

### Response Format

All API responses follow this structure:

**Success Response:**

```json
{
  "code": 200,
  "message": "Success message",
  "metadata": {
    // Response data here
  }
}
```

**Error Response:**

```json
{
  "status": "error",
  "code": 400,
  "message": "Error message",
  "error": "Detailed error stack (in development)"
}
```

### HTTP Status Codes

| Code | Description                             |
| ---- | --------------------------------------- |
| 200  | OK - Request successful                 |
| 201  | Created - Resource created successfully |
| 400  | Bad Request - Invalid input             |
| 401  | Unauthorized - Authentication required  |
| 403  | Forbidden - Insufficient permissions    |
| 404  | Not Found - Resource not found          |
| 409  | Conflict - Resource already exists      |
| 500  | Internal Server Error                   |

## 🔧 Environment Variables

| Variable                | Description                          | Default     | Required |
| ----------------------- | ------------------------------------ | ----------- | -------- |
| `PORT`                  | Server port                          | 3055        | No       |
| `NODE_ENV`              | Environment (development/production) | development | No       |
| `MONGODB_URI`           | MongoDB connection string            | -           | Yes      |
| `REDIS_HOST`            | Redis host                           | localhost   | Yes      |
| `REDIS_PORT`            | Redis port                           | 6379        | Yes      |
| `RABBITMQ_URL`          | RabbitMQ connection URL              | -           | No       |
| `JWT_ACCESS_SECRET`     | JWT access token secret              | -           | Yes      |
| `JWT_REFRESH_SECRET`    | JWT refresh token secret             | -           | Yes      |
| `AWS_BUCKET_NAME`       | S3 bucket name                       | -           | Yes      |
| `AWS_REGION`            | AWS region                           | -           | Yes      |
| `AWS_ACCESS_KEY_ID`     | AWS access key                       | -           | Yes      |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key                       | -           | Yes      |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name                | -           | Yes      |
| `CLOUDINARY_API_KEY`    | Cloudinary API key                   | -           | Yes      |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret                | -           | Yes      |
| `DISCORD_WEBHOOK_URL`   | Discord webhook for logging          | -           | No       |

## 🎨 Design Patterns

### 1. Factory Pattern

Used in `ProductFactory` to create different types of products (Electronics, Clothing) dynamically.

```javascript
// Register product types
ProductFactory.registerProductType("Electronics", Electronic);
ProductFactory.registerProductType("Clothing", Clothing);

// Create products dynamically
const product = await ProductFactory.createProduct({
  type: "Electronics",
  payload: productData,
});
```

### 2. Repository Pattern

Abstracts data access logic for better testability and maintainability.

```javascript
// Data access through repository
const products = await ProductRepo.findAllProducts({
  limit: 50,
  sort: "ctime",
  filter: { isPublished: true },
});
```

### 3. Strategy Pattern

Different product types implement their own create/update strategies.

```javascript
class Clothing extends Product {
  async createProduct() {
    // Clothing-specific creation logic
  }
  async updateProduct() {
    // Clothing-specific update logic
  }
}
```

### 4. Middleware Chain Pattern

Express middleware for request processing pipeline.

```javascript
// Logging → Security → Authentication → Business Logic
app.use(morgan("dev"));
app.use(helmet());
app.use(authentication);
app.use("/v1/api", routes);
```

### 5. Service Layer Pattern

Separates business logic from HTTP layer for better organization.

```
Controller → Service → Repository → Database
```

## 🔒 Security Features

### 1. Authentication & Authorization

- **JWT Tokens**: Stateless authentication with access and refresh tokens
- **Token Rotation**: Automatic refresh token rotation on use
- **Token Reuse Detection**: Invalidates all tokens if reuse detected
- **API Key Validation**: Service-to-service authentication

### 2. Password Security

- **Bcrypt Hashing**: Passwords hashed with bcrypt (10 rounds)
- **Never Stored Plain**: Original passwords never stored or logged

### 3. HTTP Security Headers

```javascript
helmet() - // Sets secure HTTP headers
  X -
  Frame -
  Options -
  X -
  Content -
  Type -
  Options -
  X -
  XSS -
  Protection -
  Strict -
  Transport -
  Security;
```

### 4. Input Validation

- **Request Validation**: All inputs validated before processing
- **SQL Injection Prevention**: MongoDB's prepared statements
- **XSS Protection**: Input sanitization

### 5. Rate Limiting

Can be implemented using `express-rate-limit` (in future progress)

### 6. CORS Configuration

Configurable CORS settings for API access control

## ⚡ Performance Optimizations

### 1. Redis Caching

```javascript
// Distributed locking for inventory
const keyLock = await RedisService.acquireLock({
  productId,
  shopId,
  quantity,
});
```

### 2. Database Indexing

Strategic indexes on frequently queried fields:

- Product search indexes
- Shop and user ID indexes
- Timestamp indexes for sorting

### 3. Compression

```javascript
app.use(compression()); // Gzip compression for responses
```

### 4. Connection Pooling

MongoDB connection pooling for efficient database access

### 5. Async/Await

Non-blocking I/O operations throughout the codebase

### 6. Pagination

Built-in pagination for large data sets:

```javascript
findAllProducts({ limit: 50, page: 1, sort: "ctime" });
```

### 7. Selective Field Projection

Return only necessary fields to reduce payload size:

```javascript
select: ["_id", "name", "price", "thumb"];
```

## 🧪 Testing

### Run Tests (In future progress)

```bash
cd backend-api
npm test
```

## 🚢 Deployment (In futrue progress)

### Docker Deployment (Optional)

Create `Dockerfile`:

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3055
CMD ["npm", "start"]
```

Create `docker-compose.yml`:

```yaml
version: "3.8"
services:
  api:
    build: ./backend-api
    ports:
      - "3055:3055"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/ecommerce
      - REDIS_HOST=redis
    depends_on:
      - mongo
      - redis

  mongo:
    image: mongo:8
    volumes:
      - mongo-data:/data/db

  redis:
    image: redis:7-alpine

volumes:
  mongo-data:
```

## 🔮 Future Enhancements

### Short-term

- [ ] Add comprehensive unit and integration tests
- [ ] Implement API rate limiting
- [ ] Add request validation middleware (Joi/Zod)
- [ ] Implement email notifications (SendGrid/Nodemailer)
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Implement logging with Winston/Pino

### Mid-term

- [ ] Migrate to TypeScript for type safety
- [ ] Create consistent DTO
- [ ] Add GraphQL API alongside REST
- [ ] Implement payment gateway integration (Stripe/PayPal)
- [ ] Add real-time features with WebSockets
- [ ] Implement search with Elasticsearch
- [ ] Add recommendation engine
- [ ] Implement data analytics and reporting

### Long-term

- [ ] Microservices decomposition (separate services per domain)
- [ ] Event sourcing and CQRS pattern
- [ ] Kubernetes deployment
- [ ] Multi-region deployment
- [ ] Machine learning-based product recommendations
- [ ] Advanced fraud detection
- [ ] A/B testing infrastructure
- [ ] Deployment using CI/CD
- [ ] Refactor Repo
- [ ] AI Agent Support
- [ ] Chat Feature
- [ ] Add Golang Upload Image Service
- [ ] Implement Frontend using React
- [ ] Implement e2e

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

Khanh Chung

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Built with ❤️ using Node.js, Express, and MongoDB**
