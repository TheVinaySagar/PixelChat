# Pixel Chat Auth

A full-stack chat application with user authentication, built with React + Vite frontend and Express.js + MongoDB backend.

## Architecture

- **Frontend**: React + TypeScript + Vite + TailwindCSS + shadcn/ui
- **Backend**: Express.js + MongoDB + JWT Authentication
- **State Management**: Redux Toolkit
- **Styling**: TailwindCSS with shadcn/ui components

## Project Structure

```
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   ├── pages/             # Page components
│   └── store/             # Redux store and slices
├── server/                # Backend source code
│   ├── models/            # MongoDB models
│   ├── routes/            # Express routes
│   ├── middleware/        # Custom middleware
│   └── server.js          # Server entry point
└── public/                # Static assets
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment setup:**
   ```bash
   # Create .env file
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment setup:**
   ```bash
   # Copy and configure .env file
   cp .env.example .env
   # Update MONGODB_URI and JWT_SECRET in .env
   ```

4. **Start the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## Development

### Running Both Services

1. **Terminal 1 - Backend:**
   ```bash
   cd server
   npm run dev
   ```

2. **Terminal 2 - Frontend:**
   ```bash
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## Features

- User registration and authentication
- JWT token-based session management
- Secure password hashing
- Credit system for users
- Modern React UI with shadcn/ui components
- Real-time form validation
- Responsive design
- Protected routes

## API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/signout` - User logout
- `PATCH /api/auth/credits` - Update user credits

## Contributing

1. Clone the repository
2. Create a feature branch
3. Make your changes
4. Test both frontend and backend
5. Submit a pull request

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
