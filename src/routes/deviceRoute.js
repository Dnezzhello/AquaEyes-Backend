const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/deviceController");

// GET all devices
router.get("/", deviceController.getAllDevices);

// // GET a single device by ID
// router.get("/:id", deviceController.getDeviceById);

// // POST create a new device
// router.post("/", deviceController.createDevice);

// // PUT update a device
// router.put("/:id", deviceController.updateDevice);

// // DELETE a device
// router.delete("/:id", deviceController.deleteDevice);

// // GET sensor readings for a specific device
// router.get("/:id/readings", deviceController.getDeviceSensorReadings);

// // GET alerts for a specific device
// router.get("/:id/alerts", deviceController.getDeviceAlerts);

module.exports = router;
