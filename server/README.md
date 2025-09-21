# Pixel Chat Auth Server

Express.js server with MongoDB for user authentication.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment setup:**
   - Copy `.env.example` to `.env`
   - Update the MongoDB connection string in `.env`
   - Change the JWT_SECRET to a secure random string

3. **MongoDB setup:**
   - Make sure MongoDB is running locally or use MongoDB Atlas
   - The database will be created automatically when the server starts

4. **Start the server:**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - Login user
- `POST /api/auth/signout` - Logout user (client-side token removal)
- `GET /api/auth/me` - Get current user profile (requires auth)
- `PATCH /api/auth/credits` - Update user credits (requires auth)

### Health Check
- `GET /api/health` - Server health check

## Environment Variables

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRE` - JWT token expiration time
- `CLIENT_URL` - Client URL for CORS

## Features

- User registration and authentication
- Password hashing with bcrypt
- JWT token-based authentication
- Rate limiting
- CORS configuration
- Security headers with Helmet
- MongoDB integration with Mongoose
- Input validation
- Error handling
