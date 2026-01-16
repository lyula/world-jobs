# Deployment Guide

## Backend Deployment (Vercel)

The backend server needs to be deployed separately. You have two options:

### Option 1: Deploy Backend to Vercel

1. **Create a separate repository or monorepo structure** for the backend
2. **Update `vercel.json`** (already created) with proper configuration
3. **Set Environment Variables in Vercel:**
   - `MONGODB_URI` - Your MongoDB connection string
   - `FRONTEND_URL` - `https://world-jobs.vercel.app`
   - `NODE_ENV` - `production`

4. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy Backend Separately (Recommended)

You can deploy the backend to:
- **Railway** - Easy MongoDB integration
- **Render** - Free tier available
- **Heroku** - Traditional option
- **DigitalOcean App Platform**
- **AWS/GCP** - For production scale

## Frontend Deployment

The frontend is already deployed at: https://world-jobs.vercel.app/

### Update Frontend Environment Variables

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api
   ```
   Or use your backend deployment URL

## Environment Variables Setup

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/world-expert-jobs
FRONTEND_URL=https://world-jobs.vercel.app
NODE_ENV=production
PORT=3000
```

### Frontend (Vercel Environment Variables)
```env
VITE_API_URL=https://your-backend-url.vercel.app/api
```

## CORS Configuration

The backend is configured to allow requests from:
- `http://localhost:5173` (local dev)
- `http://localhost:5174` (local dev alternate port)
- `https://world-jobs.vercel.app` (production frontend)

Make sure to add your backend URL to the CORS whitelist if deploying separately.

## MongoDB Connection

Ensure your MongoDB Atlas cluster:
1. Has your IP address whitelisted (or allow all: `0.0.0.0/0`)
2. Has a database user created
3. Connection string is correct in environment variables

## Testing Deployment

1. **Test Backend:**
   ```bash
   curl https://your-backend-url.vercel.app/health
   ```

2. **Test API:**
   ```bash
   curl https://your-backend-url.vercel.app/api/jobs
   ```

3. **Test Frontend:**
   - Visit https://world-jobs.vercel.app
   - Check browser console for API errors
   - Verify jobs are loading from MongoDB

## Troubleshooting

### CORS Errors
- Verify `FRONTEND_URL` is set correctly
- Check CORS configuration in `server/config/cors.js`
- Ensure frontend URL is in allowed origins list

### MongoDB Connection Issues
- Verify `MONGODB_URI` is set in Vercel environment variables
- Check MongoDB Atlas IP whitelist
- Verify database user credentials
- Check connection string format

### API Not Working
- Verify backend is deployed and accessible
- Check `VITE_API_URL` in frontend environment variables
- Verify API endpoints are correct
- Check server logs for errors
