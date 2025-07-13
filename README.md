# OTP Authentication System

A full-stack OTP (One-Time Password) authentication system built with Node.js backend and Next.js frontend.

## Features

- User registration and login with OTP verification
- Secure OTP generation and validation
- Modern UI with Tailwind CSS
- RESTful API endpoints
- MongoDB database integration

## Project Structure

```
otp/
├── backend/          # Node.js Express server
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   └── server.js     # Main server file
├── frontend/         # Next.js React application
│   ├── components/   # React components
│   ├── pages/        # Next.js pages
│   └── styles/       # CSS styles
└── package.json      # Root package.json
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/AditiRP18/otp.git
cd otp
```

2. Install dependencies for both backend and frontend:
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Configuration

1. Create a `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

2. Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Running the Application

### Backend
```bash
cd backend
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend
```bash
cd frontend
npm run dev
```

The frontend application will run on `http://localhost:3000`

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-otp` - OTP verification
- `GET /api/auth/profile` - Get user profile (protected)

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB, JWT
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Database**: MongoDB
- **Authentication**: JWT tokens with OTP verification

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 