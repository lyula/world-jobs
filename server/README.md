# World Expert Jobs - Backend Server

Professional MongoDB backend server for the World Expert Jobs platform, built with Express.js following MVC architecture.

## Architecture

```
server/
├── config/           # Configuration files
│   ├── database.js  # MongoDB connection
│   └── cors.js      # CORS configuration
├── controllers/      # Business logic
│   └── jobController.js
├── middleware/       # Custom middleware
│   ├── errorHandler.js
│   └── notFound.js
├── models/          # Mongoose models
│   └── Job.js
├── routes/          # API routes
│   └── jobs.js
├── scripts/         # Utility scripts
│   └── migrate.js
└── index.js         # Server entry point
```

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- pnpm

## Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Configure environment variables:**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/world-expert-jobs
   PORT=3000
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development
   ```

3. **Start MongoDB:**
   - If using local MongoDB, make sure MongoDB is running
   - If using MongoDB Atlas, ensure your connection string is correct

4. **Migrate data from db.json:**
   ```bash
   # Migrate without clearing existing data
   pnpm migrate
   
   # Or migrate and clear existing data first
   pnpm migrate:clear
   ```

5. **Start the server:**
   ```bash
   # Production mode
   pnpm server
   
   # Development mode with auto-reload
   pnpm server:dev
   ```

## API Endpoints

Base URL: `http://localhost:3000/api`

### Jobs

- `GET /api/jobs` - Get all jobs
  - Response: `{ success: true, count: number, data: Job[] }`
  
- `GET /api/jobs/:id` - Get job by ID
  - Response: `{ success: true, data: Job }`
  
- `POST /api/jobs` - Create a new job
  - Body: Job object (without id)
  - Response: `{ success: true, data: Job }`
  
- `PUT /api/jobs/:id` - Update a job
  - Body: Partial Job object
  - Response: `{ success: true, data: Job }`
  
- `DELETE /api/jobs/:id` - Delete a job
  - Response: `{ success: true, message: string, data: {} }`

### Health Check

- `GET /health` - Check server status
  - Response: `{ success: true, status: 'OK', message: string, timestamp: string }`

## Error Handling

The API uses standardized error responses:

```json
{
  "success": false,
  "error": "Error message"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## Project Structure

### Config
- **database.js**: MongoDB connection configuration
- **cors.js**: CORS settings for API

### Controllers
- **jobController.js**: Handles all job-related business logic
  - getAllJobs
  - getJobById
  - createJob
  - updateJob
  - deleteJob

### Middleware
- **errorHandler.js**: Global error handling middleware
- **notFound.js**: 404 handler for undefined routes

### Models
- **Job.js**: Mongoose schema for Job documents

### Routes
- **jobs.js**: Job API routes (RESTful)

### Scripts
- **migrate.js**: Data migration script from db.json to MongoDB

## MongoDB Setup Options

### Option 1: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/world-expert-jobs`

### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier M0)
3. Create a database user
4. Get your connection string
5. Add your IP address to the whitelist
6. Update `.env` with your connection string

## Migration Script

The migration script imports jobs from `db.json` into MongoDB.

**Features:**
- Imports all jobs from `db.json`
- Skips duplicates (checks by title and company)
- Converts numeric IDs to MongoDB ObjectIds
- Provides detailed migration summary

**Usage:**
```bash
# Regular migration (skips duplicates)
pnpm migrate

# Clear and migrate (removes all existing jobs first)
pnpm migrate:clear
```

## Development

### Available Scripts

- `pnpm server` - Start production server
- `pnpm server:dev` - Start development server with auto-reload
- `pnpm migrate` - Import data from db.json
- `pnpm migrate:clear` - Clear database and import from db.json

### Code Style

- Follows MVC (Model-View-Controller) architecture
- Separated concerns (routes, controllers, models)
- Standardized API responses
- Comprehensive error handling
- Environment-based configuration

## Production Deployment

For production deployment:

1. Set environment variables in your hosting platform:
   - `MONGODB_URI`
   - `PORT`
   - `FRONTEND_URL`
   - `NODE_ENV=production`

2. Ensure MongoDB Atlas or managed MongoDB service is accessible

3. Update `VITE_API_URL` in frontend environment variables

4. Deploy both frontend and backend

## Security Considerations

- Environment variables for sensitive data
- CORS configuration
- Input validation via Mongoose schemas
- Error message sanitization
- Proper HTTP status codes
