require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const http = require("http");
const { Server } = require("socket.io");
const config = require("./config");

// import routes
const deviceRoute = require("./routes/deviceRoute");
const adminRoute = require("./routes/adminRoute");

// Import MQTT service
const MqttService = require("./services/mqttService");

// initialize express app
const app = express();

// initialize middleware
app.use(
  cors({
    // origin: process.env.FRONTEND_URL || "http://localhost:3000",
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(helmet());
app.use(express.json());

// Add this line after other middleware setup
app.use(express.static("public"));

// Create HTTP server
const server = http.createServer(app);

// Set up Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("Client connected with ID:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Initialize and connect MQTT service
const mqttService = new MqttService(io);
mqttService.connect();

// Store the service in app for access in routes
app.set("mqttService", mqttService);

// Initialize routes
app.use("/api/devices", deviceRoute);
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to AquaEyes Backend" });
});

// Connect to database and start server
config
  .connectDB()
  .then(() => {
    server.listen(config.port, () => {
      console.log(
        `Server running in ${config.env} mode on port ${config.port}`,
      );
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
  });
