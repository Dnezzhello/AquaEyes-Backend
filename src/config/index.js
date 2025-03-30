require("dotenv").config();

const config = {
  // server setting
  port: process.env.PORT || 4558,
  env: process.env.NODE_ENV || "development",

  // database settings
  mongoURI: process.env.MONGODB_URI || "mongodb://localhost:27017/aquaeyes",

  // basic sms settings (for future)
  smsEnabled: process.env.SMS_ENABLED || false,

  connectDB: async function () {
    const mongoose = require("mongoose");
    try {
      await mongoose.connect(this.mongoURI);
      console.log("MongoDB connected");
      return mongoose.connection;
    } catch (error) {
      console.error("MongoDB connection error:", error.message);
      process.exit(1);
    }
  },
};

module.exports = config;
