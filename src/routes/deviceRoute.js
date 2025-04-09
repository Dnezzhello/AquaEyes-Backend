// src/routes/deviceRoute.js
const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/deviceController");

// GET all devices
router.get("/", deviceController.getAllDevices);

// GET a single device by ID
router.get("/:id", deviceController.getDeviceById);

// POST create a new device
router.post("/", deviceController.createDevice);

// PUT update a device
router.put("/:id", deviceController.updateDevice);

// DELETE a device
router.delete("/:id", deviceController.deleteDevice);

// GET sensor readings for a specific device
router.get("/:id/readings", deviceController.getDeviceReadings);

// GET a specific sensor's readings
router.get("/:id/sensors/:sensorId/readings", deviceController.getSensorReadings);

// GET all sensors for a device
router.get("/:id/sensors", deviceController.getDeviceSensors);

// GET alerts for a specific device
router.get("/:id/alerts", deviceController.getDeviceAlerts);

// POST update device configuration (which gets sent via MQTT)
router.post("/:id/config", deviceController.updateDeviceConfig);

// POST simulate alert (for testing)
router.post("/simulate/alert", deviceController.simulateAlert);

// POST simulate sensor reading (for testing)
router.post("/simulate/reading", deviceController.simulateReading);

module.exports = router;