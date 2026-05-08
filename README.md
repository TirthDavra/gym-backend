# Gym Management System - Backend

Node.js/Express backend for the Gym Management System with PostgreSQL database and Prisma ORM.

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- PostgreSQL v12+

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration (see Environment Variables section below)

3. **Setup database**
   ```bash
   npx prisma migrate dev
   ```

4. **Start the server**
   ```bash
   # Development (with auto-reload)
   npm run dev

   # Production
   npm start
   ```

The server will start on the port specified in your `.env` file (default: 5000).

## 🔧 Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/gym_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Server Configuration
PORT=5000
NODE_ENV=development
```

### Environment Variables Explanation

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string |  `postgresql://user:pass@localhost:5432/gym_db` |
| `JWT_SECRET` | Secret key for signing JWT tokens | `mysecretkey123` |
| `PORT` | Server port number | `5000` |

## 📁 Project Structure

```
backend/
├── src/
│   ├── app.js                  # Express app setup
│   ├── config/                 # Configuration files
│   ├── controllers/            # Route controllers
│   │   ├── authController.js
│   │   ├── memberController.js
│   │   ├── subscriptionController.js
│   │   ├── attendanceController.js
│   │   └── dashboardController.js
│   ├── lib/
│   │   └── prisma.js          # Prisma client instance
│   ├── middleware/             # Custom middleware
│   │   └── authMiddleware.js
│   ├── routes/                 # API routes
│   │   ├── authRoutes.js
│   │   ├── memberRoutes.js
│   │   ├── subscriptionRoutes.js
│   │   ├── attendanceRoutes.js
│   │   └── dashboardRoutes.js
│   ├── services/               # Business logic
│   │   ├── authService.js
│   │   ├── memberService.js
│   │   ├── subscriptionService.js
│   │   ├── attendanceService.js
│   │   └── dashboardService.js
│   ├── validations/            # Input validation schemas
│   ├── seed/                   # Database seeders
│   │   └── adminSeed.js
│   └── utils/                  # Utility functions
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/             # Database migrations
├── server.js                   # Server entry point
├── package.json
└── .env                        # Environment variables (create this)
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
  - Returns: `{ token, user }`

### Members
- `GET /api/members?page=1&limit=10` - Get all members with pagination
- `POST /api/members` - Create new member
  - Body: `{ fullName, email, phone, joinDate }`
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

### Subscriptions
- `POST /api/subscriptions/assign` - Assign subscription to member
  - Body: `{ memberId, subscriptionType, startDate, endDate }`

### Attendance
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Mark attendance

### Dashboard
- `GET /api/dashboard` - Get dashboard statistics

## 🗄️ Database Schema

The database uses Prisma ORM with PostgreSQL. Key models include:

- **User** - Admin users
- **Member** - Gym members
- **Subscription** - Member subscriptions
- **Attendance** - Attendance records

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. User logs in with email and password
2. Server returns a JWT token
3. Client includes token in `Authorization` header: `Bearer <token>`
4. Middleware validates token on protected routes

## 🛠️ Available Scripts

- `npm run dev` - Start development server with auto-reload (uses nodemon)
- `npm start` - Start production server
- `npx prisma migrate dev` - Create and apply database migration
- `npx prisma studio` - Open Prisma Studio (database GUI)

## 🧪 Testing

Run the following to seed the database with admin user:

```bash
node src/seed/adminSeed.js
```

Demo credentials:
- Email: `admin@gmail.com`
- Password: `admin123`

## 📝 Notes

- All database migrations are tracked in `prisma/migrations/`
- Passwords are hashed using bcrypt before storing
- Tokens expire (configured in authService.js)
- CORS is enabled to allow requests from the frontend

## 🐛 Troubleshooting

### Database Connection Error
- Verify PostgreSQL is running
- Check DATABASE_URL is correct
- Ensure database exists

### Migration Issues
```bash
# Reset database (WARNING: Deletes all data)
npx prisma migrate reset
```

### Port Already in Use
- Change PORT in `.env` file
- Or kill process using the port

## 📄 License

ISC License
