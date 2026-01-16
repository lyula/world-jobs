const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://world-jobs.vercel.app'
]

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true)
    }

    // Check if origin is in allowed list
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } 
    // Allow if FRONTEND_URL is set and matches
    else if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) {
      callback(null, true)
    } 
    // In development, allow localhost
    else if (process.env.NODE_ENV !== 'production' && origin.includes('localhost')) {
      callback(null, true)
    } 
    else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
}

export default corsOptions
