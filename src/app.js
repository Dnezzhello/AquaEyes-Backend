const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const config = require("./config");

// import routes
const deviceRoute = require("./routes/deviceRoute");

// initialize express app
const app = express();

// initialize middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// initialize routes
// app.use("/api/devices", deviceRoute);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to AquaEyes Backend" });
});

// connect to database and start server
config
  .connectDB()
  .then(() => {
    app.listen(config.port, () => {
      console.log(
        `Server running in ${config.env} mode on port ${config.port}`,
      );
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
  });
