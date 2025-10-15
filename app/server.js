const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files

// MongoDB Connection - Environment-Aware Setup
const MONGODB_URI = `mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PWD}@${process.env.MONGO_DB_HOST}:27017/${process.env.MONGO_DB_NAME}?authSource=admin`;

// Enhanced MongoDB connection with robust error handling
const connectWithRetry = () => {
  
  
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  })
  .then(() => {
    console.log("✅ Connected to MongoDB successfully");
    console.log("📊 Database: user-account");
    console.log("📋 Collection: users");
    console.log("🌐 MongoExpress available at: http://localhost:8081");
  })
  .catch((err) => {
    
    
    // Log specific error details
    if (err.name === 'MongoNetworkError') {
      console.error('🔌 Network error: Please check if MongoDB is running');
    } else if (err.name === 'MongooseServerSelectionError') {
      console.error('🔍 Server selection error: MongoDB may not be available');
    } else if (err.name === 'MongoError' && err.code === 18) {
      console.error('🔐 Authentication failed: Please check your username and password');
    }
    
    // Retry connection after 5 seconds
    setTimeout(connectWithRetry, 5000);
  });
};

// Initialize connection
connectWithRetry();

// Event listeners for MongoDB connection
mongoose.connection.on('error', err => {
  
});

mongoose.connection.on('disconnected', () => {

});

mongoose.connection.on('reconnected', () => {
  
});

// Handle application termination
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    
    process.exit(0);
  } catch (err) {
    
    process.exit(1);
  }
});

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  bio: {
    type: String,
    default: ""
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const User = mongoose.model("User", userSchema);

// Middleware to check database connection
const checkDBConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ 
      error: "Database temporarily unavailable",
      message: "Please try again in a few moments"
    });
  }
  next();
};

// Routes

// Serve the main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Health check endpoint
app.get("/health", (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
  res.json({
    status: "OK",
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Get user profile
app.get("/api/profile", checkDBConnection, async (req, res) => {
  try {
    // Try to find the user - using a fixed email for demo
    // In a real app, you'd use authentication
    let user = await User.findOne({ email: "anna.samson@example.com" });
    
    // If no user exists, create a default one
    if (!user) {
      user = await User.create({
        name: "Anna Samson",
        email: "anna.samson@example.com",
        bio: "Passionate about coding and web development"
      });
      console.log("✅ Default user created");
    }
    
    res.json(user);
  } catch (err) {
  
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update user profile
app.post("/api/update-profile", checkDBConnection, async (req, res) => {
  try {
    const { name, email, bio } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { name, bio },
      { 
        upsert: true, // Create if doesn't exist
        new: true, // Return the updated document
        runValidators: true // Validate against schema
      }
    );

    console.log("✅ Profile updated in MongoDB:", updatedUser);
    res.json({ success: true, user: updatedUser });
  } catch (err) {
    
    
    // Handle specific MongoDB errors
    if (err.name === 'MongoNetworkError') {
      res.status(503).json({ error: "Database unavailable", message: "Please try again later" });
    } else if (err.name === 'ValidationError') {
      res.status(400).json({ error: "Validation Error", details: err.errors });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

// Get all users (for testing)
app.get("/api/users", checkDBConnection, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Graceful shutdown handling
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
  } catch (err) {
    console.error('Error during shutdown:', err);
    process.exit(1);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🏥 Health check available at http://localhost:${PORT}/health`);
});