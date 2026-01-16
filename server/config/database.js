// config/database.js
import mongoose from 'mongoose';

const connectDatabase = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error(
        'MONGODB_URI is not defined in .env file. ' +
        'Please create .env in the server folder with MONGODB_URI=mongodb://localhost:27017/your-db-name'
      );
    }

    const conn = await mongoose.connect(uri);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    // Optional: log the attempted URI safely (only if it exists)
    if (process.env.MONGODB_URI) {
      const safeUri = process.env.MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@');
      console.error(`🔗 Attempted URI: ${safeUri}`);
    }
    process.exit(1);
  }
};

export default connectDatabase;