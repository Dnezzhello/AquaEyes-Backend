// src/controllers/deviceController.js
const { Device, SensorReading, Alert } = require("../models");

// Get all devices
exports.getAllDevices = async (req, res) => {
  try {
    const devices = await Device.find();
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single device by ID
exports.getDeviceById = async (req, res) => {
  try {
    const device = await Device.findOne({ device_id: req.params.id });
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    res.status(200).json(device);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new device
exports.createDevice = async (req, res) => {
  try {
    const deviceData = req.body;

    // Generate a unique device_id if not provided
    if (!deviceData.device_id) {
      deviceData.device_id = `DEV${Date.now().toString()}`;
    }

    // Create device
    const device = new Device(deviceData);
    const savedDevice = await device.save();

    res.status(201).json(savedDevice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a device
exports.updateDevice = async (req, res) => {
  try {
    const updatedDevice = await Device.findOneAndUpdate(
      { device_id: req.params.id },
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedDevice) {
      return res.status(404).json({ message: "Device not found" });
    }

    res.status(200).json(updatedDevice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a device
exports.deleteDevice = async (req, res) => {
  try {
    const deletedDevice = await Device.findOneAndDelete({
      device_id: req.params.id,
    });

    if (!deletedDevice) {
      return res.status(404).json({ message: "Device not found" });
    }

    res.status(200).json({ message: "Device deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get device sensor readings
exports.getDeviceReadings = async (req, res) => {
  try {
    // Get sensor type filter from query parameters (optional)
    const { sensorType, limit = 50 } = req.query;

    // Build query based on filter
    const query = { device_id: req.params.id };

    // If sensor type filter is specified
    if (sensorType) {
      // Match sensor IDs based on pattern for the requested type
      if (sensorType === "water_level") {
        query.sensor_id = { $regex: /^WL/ };
      } else if (sensorType === "flow_rate") {
        query.sensor_id = { $regex: /^FL/ };
      } else if (sensorType === "rainfall") {
        query.sensor_id = { $regex: /^RG/ };
      } else if (sensorType === "soil_moisture") {
        query.sensor_id = { $regex: /^SM/ };
      }
    }

    // Find readings based on query
    const readings = await SensorReading.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));

    res.status(200).json(readings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all sensors for a device
exports.getDeviceSensors = async (req, res) => {
  try {
    // Find all unique sensor IDs for this device
    const sensorReadings = await SensorReading.find({
      device_id: req.params.id,
    }).distinct("sensor_id");

    // Get device details including configured sensors
    const device = await Device.findOne({ device_id: req.params.id });

    // Create sensor details array
    const sensors = [];

    // Process each unique sensor found
    for (const sensorId of sensorReadings) {
      // Determine sensor type from ID prefix
      let sensorType = "unknown";
      if (sensorId.startsWith("WL")) sensorType = "water_level";
      else if (sensorId.startsWith("FL")) sensorType = "flow_rate";
      else if (sensorId.startsWith("RG")) sensorType = "rainfall";
      else if (sensorId.startsWith("SM")) sensorType = "soil_moisture";

      // Get latest reading for this sensor
      const latestReading = await SensorReading.findOne({
        device_id: req.params.id,
        sensor_id: sensorId,
      }).sort({ timestamp: -1 });

      // Find sensor config in device.sensors array if it exists
      const sensorConfig =
        device?.sensors?.find((s) => s.sensor_id === sensorId) || {};

      sensors.push({
        sensor_id: sensorId,
        type: sensorType,
        latest_reading: latestReading || null,
        model: sensorConfig.model || "Unknown",
        thresholds: sensorConfig.thresholds || {},
      });
    }

    res.status(200).json(sensors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get readings for a specific sensor
exports.getSensorReadings = async (req, res) => {
  try {
    const { id, sensorId } = req.params;
    const { limit = 50 } = req.query;

    // Find readings for the specific device and sensor
    const readings = await SensorReading.find({
      device_id: id,
      sensor_id: sensorId,
    })
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));

    res.status(200).json(readings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get alerts for a device
exports.getDeviceAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({
      devices: req.params.id,
    }).sort({ created_at: -1 });
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update device configuration
exports.updateDeviceConfig = async (req, res) => {
  try {
    const deviceId = req.params.id;
    const configData = req.body;

    // Get MQTT service
    const mqttService = req.app.get("mqttService");

    // Update device in database
    const updatedDevice = await Device.findOneAndUpdate(
      { device_id: deviceId },
      { $set: { "sensors.$[].thresholds": configData.thresholds } },
      { new: true },
    );

    if (!updatedDevice) {
      return res.status(404).json({ message: "Device not found" });
    }

    // Send config to device via MQTT
    const success = mqttService.sendConfigToDevice(deviceId, configData);

    res.status(200).json({
      device: updatedDevice,
      configSent: success,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Simulate an alert (for testing)
exports.simulateAlert = async (req, res) => {
  try {
    const { type, severity, message, devices, location } = req.body;

    const alert = new Alert({
      alert_id: `ALT-${Date.now().toString()}`,
      type: type || "flood_warning",
      severity: severity || "warning",
      message: message || "Simulated alert for testing",
      devices: devices || ["DEV001"],
      location: location || {
        name: "Vientiane Test Site",
        coordinates: [102.6331, 17.9757],
      },
      status: "pending",
      created_at: new Date(),
      updated_at: new Date(),
    });

    const savedAlert = await alert.save();

    // Emit real-time event if Socket.IO is available
    const io = req.app.get("io");
    if (io) {
      io.emit("new-alert", savedAlert);
    }

    res.status(201).json(savedAlert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Simulate a sensor reading (for testing)
exports.simulateReading = async (req, res) => {
  try {
    const { device_id, sensor_id, value, unit, timestamp } = req.body;

    const reading = new SensorReading({
      sensor_reading_id: `SRD-${Date.now().toString()}`,
      device_id: device_id || "DEV001",
      sensor_id: sensor_id || "WL001",
      timestamp: timestamp ? new Date(timestamp) : new Date(),
      value: value !== undefined ? value : Math.random() * 100,
      unit: unit || "cm",
    });

    const savedReading = await reading.save();

    // Check for thresholds and trigger alerts if needed
    // Get MQTT service
    const mqttService = req.app.get("mqttService");

    // Determine sensor type from ID
    let sensorType = "unknown";
    if (sensor_id.startsWith("WL")) sensorType = "water_level";
    else if (sensor_id.startsWith("FL")) sensorType = "flow_rate";
    else if (sensor_id.startsWith("RG")) sensorType = "rainfall";
    else if (sensor_id.startsWith("SM")) sensorType = "soil_moisture";

    // Check thresholds via MQTT service
    if (mqttService) {
      await mqttService.checkThresholds(device_id, sensorType, savedReading);
    }

    // Emit real-time event if Socket.IO is available
    const io = req.app.get("io");
    if (io) {
      io.emit("new-reading", {
        deviceId: device_id,
        sensorType,
        reading: savedReading,
      });
    }

    res.status(201).json(savedReading);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
