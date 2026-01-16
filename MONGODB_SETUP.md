# MongoDB Backend Setup Guide

This guide will help you set up the MongoDB backend for World Expert Jobs.

## Quick Start

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up MongoDB:**
   - **Option A: Local MongoDB** - Install MongoDB locally
   - **Option B: MongoDB Atlas** - Use free cloud MongoDB (recommended for easy setup)

3. **Configure environment:**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/world-expert-jobs
   PORT=3000
   VITE_API_URL=http://localhost:3000/api
   ```

4. **Migrate data:**
   ```bash
   pnpm migrate
   ```

5. **Start the server:**
   ```bash
   pnpm server
   ```

6. **Start the frontend** (in another terminal):
   ```bash
   pnpm dev
   ```

## MongoDB Atlas Setup (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (free tier M0)
4. Create a database user:
   - Database Access → Add New Database User
   - Choose username and password
   - Save credentials securely
5. Whitelist your IP:
   - Network Access → Add IP Address
   - Click "Allow Access from Anywhere" for development (0.0.0.0/0)
6. Get your connection string:
   - Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `world-expert-jobs` (or your preferred name)
7. Update `.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/world-expert-jobs?retryWrites=true&w=majority
   ```

## Local MongoDB Setup

1. **Install MongoDB:**
   - Windows: Download from [MongoDB Downloads](https://www.mongodb.com/try/download/community)
   - macOS: `brew install mongodb-community`
   - Linux: Follow [MongoDB Installation Guide](https://www.mongodb.com/docs/manual/installation/)

2. **Start MongoDB:**
   - Windows: MongoDB should start as a service
   - macOS/Linux: `brew services start mongodb-community` or `sudo systemctl start mongod`

3. **Verify MongoDB is running:**
   ```bash
   mongosh
   ```
   If it connects, MongoDB is running!

4. **Update `.env`:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/world-expert-jobs
   ```

## Migration Commands

```bash
# Import data from db.json (skips duplicates)
pnpm migrate

# Clear database and import fresh data
pnpm migrate:clear
```

## Available Scripts

- `pnpm server` - Start the backend server
- `pnpm server:dev` - Start server with auto-reload (development)
- `pnpm migrate` - Import jobs from db.json
- `pnpm migrate:clear` - Clear database and import from db.json
- `pnpm dev` - Start frontend development server

## Troubleshooting

### Connection Error
- Check if MongoDB is running (local) or accessible (Atlas)
- Verify connection string in `.env`
- Check firewall settings for MongoDB Atlas

### Migration Fails
- Ensure MongoDB is running and accessible
- Check that `db.json` exists in the root directory
- Verify the connection string is correct

### Port Already in Use
- Change `PORT` in `.env` to a different port
- Update `VITE_API_URL` in `.env` to match

## API Endpoints

All endpoints are prefixed with `/api`:

- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create new job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

## Production Deployment

For production:

1. Use MongoDB Atlas (cloud)
2. Set environment variables in your hosting platform
3. Update `VITE_API_URL` to your production API URL
4. Deploy backend separately or as part of full-stack app
