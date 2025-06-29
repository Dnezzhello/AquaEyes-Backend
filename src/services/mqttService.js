const mqtt = require("mqtt");
const { Device, SensorReading, Alert } = require("../models");
// const roundToTwoDecimals = require("../../utils/formatNumber.js");

const roundToTwoDecimals = (value) => {
  if (value === null || value === undefined || isNaN(parseFloat(value))) {
    return value;
  }
  return Math.round((value + Number.EPSILON) * 100) / 100;
};

class MqttService {
  constructor(io) {
    this.io = io;
    this.client = null;
    this.mqttConfig = {
      broker: process.env.MQTT_BROKER,
      port: process.env.MQTT_PORT,
      clientId: `AquaEyes_Backend_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
      protocol: "mqtts",
    };
    this.topics = {
      waterLevel: "aquaeyes/+/water_level",
      flowRate: "aquaeyes/+/flow_rate",
      rainfall: "aquaeyes/+/rainfall",
      soilMoisture: "aquaeyes/+/soil_moisture",
      status: "aquaeyes/+/status",
      battery: "aquaeyes/+/battery",
      config: "aquaeyes/+/config",
    };
  }

  async connect() {
    try {
      this.client = mqtt.connect(this.mqttConfig.broker, {
        port: this.mqttConfig.port,
        clientId: this.mqttConfig.clientId,
        username: this.mqttConfig.username,
        password: this.mqttConfig.password,
        protocol: this.mqttConfig.protocol,
        rejectUnauthorized: false,
      });

      this.client.on("connect", () => {
        console.log("Connected to MQTT broker");
        this.subscribe();
      });

      this.client.on("error", (error) => {
        console.error("MQTT error:", error);
      });

      this.client.on("close", () => {
        console.log("MQTT connection closed");
      });

      // handle incoming messages
      this.client.on("message", (topic, message) => {
        this.handleMessage(topic, message);
      });
    } catch (error) {
      console.error("Failed to connect to MQTT broker:", error);
    }
  }

  subscribe() {
    // Subscribe to all device topics
    Object.values(this.topics).forEach((topic) => {
      this.client.subscribe(topic, (err) => {
        if (err) {
          console.error(`Error subscribing to ${topic}:`, err);
        } else {
          console.log(`Subscribed to ${topic}`);
        }
      });
    });
  }

  async handleMessage(topic, message) {
    try {
      console.log(`Received message on topic: ${topic}`);

      // Parse message as JSON
      const payload = JSON.parse(message.toString());

      // Extract device ID from topic (format: aquaeyes/DEV001/sensor_type)
      const topicParts = topic.split("/");
      const deviceId = topicParts[1];
      const messageType = topicParts[2];

      // Process message based on type
      switch (messageType) {
        case "water_level":
        case "flow_rate":
        case "rainfall":
        case "soil_moisture":
          await this.processSensorReading(deviceId, messageType, payload);
          break;
        case "status":
          await this.processStatusUpdate(deviceId, payload);
          break;
        case "battery":
          await this.processBatteryUpdate(deviceId, payload);
          break;
        default:
          console.log(`Unhandled message type: ${messageType}`);
      }
    } catch (error) {
      console.error("Error handling MQTT message:", error);
    }
  }

  async processSensorReading(deviceId, sensorType, payload) {
    try {
      const sensorId = payload.sensor_id;
      const roundedValue = roundToTwoDecimals(payload.value);
      let reading;
      if (!sensorId) {
        console.warn(
          `Warning: Message from ${deviceId} missing sensor_id. Using generated ID.`,
        );

        // Generate a fallback ID based on device and sensor type
        let fallbackId;
        switch (sensorType) {
          case "water_level":
            fallbackId = `WL_${deviceId}_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
            break;
          case "flow_rate":
            fallbackId = `FL_${deviceId}_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
            break;
          case "rainfall":
            fallbackId = `RG_${deviceId}_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
            break;
          case "soil_moisture":
            fallbackId = `SM_${deviceId}_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
            break;
          default:
            fallbackId = `UNKNOWN_${deviceId}_${sensorType}_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
        }

        // Create new sensor reading with fallback ID
        reading = new SensorReading({
          sensor_reading_id: `SRD_${Date.now()}_${Math.random().toString(36).substring(2, 10)}_${deviceId}`,
          device_id: deviceId,
          sensor_id: fallbackId,
          timestamp: payload.timestamp
            ? new Date(payload.timestamp)
            : new Date(),
          value: roundedValue,
          unit: payload.unit,
          metadata: payload.metadata || {},
        });

        await reading.save();
      } else {
        // Create new sensor reading with the actual sensor ID
        reading = new SensorReading({
          sensor_reading_id: `SRD_${Date.now()}_${Math.random().toString(36).substring(2, 10)}_${deviceId}`,
          device_id: deviceId,
          sensor_id: sensorId, // Use the actual sensor ID from the device
          timestamp: new Date(payload.timestamp) || new Date(),
          value: roundedValue,
          unit: payload.unit,
          metadata: payload.metadata || {},
        });
        await reading.save();
      }

      // Emit real-time update via Socket.IO
      if (this.io) {
        // Add debug logging
        console.log("Socket.IO instance exists, emitting reading:", {
          deviceId,
          sensorType,
          readingId: reading.sensor_reading_id,
          value: reading.value,
        });

        this.io.emit("new-reading", {
          deviceId,
          sensorType,
          reading: reading,
        });
      } else {
        console.error("No Socket.IO instance available in MqttService");
      }
      // Check for thresholds and trigger alerts if needed
      await this.checkThresholds(deviceId, sensorType, reading);
    } catch (error) {
      console.error("Error processing sensor reading:", error);
    }
  }

  async processStatusUpdate(deviceId, payload) {
    try {
      // Update device status in database
      await Device.findOneAndUpdate(
        { device_id: deviceId },
        {
          "status.last_check_in": new Date(payload.timestamp) || new Date(),
          "status.signal_strength": payload.signal_strength,
          "status.battery": payload.battery,
        },
      );

      // Emit status update via Socket.IO
      if (this.io) {
        this.io.emit("device-status", {
          deviceId,
          status: payload,
        });
      }
    } catch (error) {
      console.error("Error processing status update:", error);
    }
  }

  async processBatteryUpdate(deviceId, payload) {
    try {
      // Update battery status in database
      await Device.findOneAndUpdate(
        { device_id: deviceId },
        { "status.battery": payload.value },
      );

      // Check if battery is low and trigger alert if needed
      if (payload.value < 20) {
        const alert = new Alert({
          alert_id: `ALT_BATTERY_${deviceId}_${Date.now()}_${Math.random().toString(36).substring(2, 12)}`,
          type: "battery_low",
          severity: payload.value < 10 ? "critical" : "warning",
          message: `Low battery: ${payload.value}% remaining on device ${deviceId}`,
          devices: [deviceId],
          triggered_by: {
            level: payload.value,
            voltage: payload.metadata?.voltage || null,
          },
          status: "pending",
          created_at: new Date(),
          updated_at: new Date(),
        });

        await alert.save();

        // Emit alert via Socket.IO
        if (this.io) {
          this.io.emit("new-alert", alert);
        }
      }
    } catch (error) {
      console.error("Error processing battery update:", error);
    }
  }

  async checkThresholds(deviceId, sensorType, reading) {
    try {
      // Get device with sensor thresholds
      const device = await Device.findOne({ device_id: deviceId });
      if (!device) return;

      // Find the correct sensor in the device
      let sensorInfo;
      for (const sensor of device.sensors) {
        if (
          (sensorType === "water_level" && sensor.type === "water_level") ||
          (sensorType === "flow_rate" && sensor.type === "flow_rate") ||
          (sensorType === "rainfall" && sensor.type === "rainfall") ||
          (sensorType === "soil_moisture" && sensor.type === "soil_moisture")
        ) {
          sensorInfo = sensor;
          break;
        }
      }

      if (!sensorInfo || !sensorInfo.thresholds) return;

      // Check if reading exceeds thresholds
      const value = reading.value;
      let alertType = null;
      let alertSeverity = null;

      // Determine alert type and severity based on sensor type
      if (sensorType === "water_level") {
        // Ultrasonic sensor: lower distance = higher water level = more dangerous
        if (value <= sensorInfo.thresholds.critical) {
          alertType = "flood_warning";
          alertSeverity = "critical";
        } else if (value <= sensorInfo.thresholds.danger) {
          alertType = "flood_warning";
          alertSeverity = "danger";
        } else if (value <= sensorInfo.thresholds.warning) {
          alertType = "flood_warning";
          alertSeverity = "warning";
        }
      } else if (sensorType === "flow_rate") {
        // Flow rate: higher values = more dangerous
        if (value >= sensorInfo.thresholds.critical) {
          alertType = "flood_warning";
          alertSeverity = "critical";
        } else if (value >= sensorInfo.thresholds.danger) {
          alertType = "flood_warning";
          alertSeverity = "danger";
        } else if (value >= sensorInfo.thresholds.warning) {
          alertType = "flood_warning";
          alertSeverity = "warning";
        }
      } else if (sensorType === "rainfall") {
        // Rainfall: higher values = more dangerous
        if (value >= sensorInfo.thresholds.critical) {
          alertType = "rainfall_warning";
          alertSeverity = "critical";
        } else if (value >= sensorInfo.thresholds.danger) {
          alertType = "rainfall_warning";
          alertSeverity = "danger";
        } else if (value >= sensorInfo.thresholds.warning) {
          alertType = "rainfall_warning";
          alertSeverity = "warning";
        }
      } else if (sensorType === "soil_moisture") {
        // Soil moisture: higher values = more dangerous
        if (value >= sensorInfo.thresholds.critical) {
          alertType = "soil_saturation_warning";
          alertSeverity = "critical";
        } else if (value >= sensorInfo.thresholds.danger) {
          alertType = "soil_saturation_warning";
          alertSeverity = "danger";
        } else if (value >= sensorInfo.thresholds.warning) {
          alertType = "soil_saturation_warning";
          alertSeverity = "warning";
        }
      }

      if (alertType && alertSeverity) {
        // Create alert
        const alert = new Alert({
          alert_id: `ALT_THRESHOLD_${sensorType.toUpperCase()}_${deviceId}_${Date.now()}_${Math.random().toString(36).substring(2, 12)}`,
          type: alertType,
          severity: alertSeverity,
          message: this.createAlertMessage(
            sensorType,
            value,
            reading.unit,
            sensorInfo.thresholds,
            alertSeverity,
          ),
          devices: [deviceId],
          triggered_by: {
            condition: this.createConditionText(sensorType, alertSeverity),
            readings: [value],
            threshold: sensorInfo.thresholds[alertSeverity],
          },
          status: "pending",
          created_at: new Date(),
          updated_at: new Date(),
        });

        await alert.save();

        // Emit alert via Socket.IO
        if (this.io) {
          this.io.emit("new-alert", alert);
        }
      }
    } catch (error) {
      console.error("Error checking thresholds:", error);
    }
  }

  getSensorTypeName(sensorType) {
    switch (sensorType) {
      case "water_level":
        return "Water level";
      case "flow_rate":
        return "Flow rate";
      case "rainfall":
        return "Rainfall";
      case "soil_moisture":
        return "Soil moisture";
      default:
        return sensorType;
    }
  }

  createAlertMessage(sensorType, value, unit, thresholds, severity) {
    const sensorName = this.getSensorTypeName(sensorType);
    const threshold = thresholds[severity];

    return `${sensorName} alert: ${value} ${unit} (Threshold: ${threshold} ${unit})`;
  }

  createConditionText(sensorType, severity) {
    const sensorName = this.getSensorTypeName(sensorType);
    
    if (sensorType === "water_level") {
      return `${sensorName} below ${severity} distance threshold`;
    } else {
      return `${sensorName} exceeds ${severity} threshold`;
    }
  }

  // Method to send configuration to devices
  sendConfigToDevice(deviceId, config) {
    try {
      if (!this.client || !this.client.connected) {
        console.error("MQTT client not connected");
        return false;
      }

      const topic = `aquaeyes/${deviceId}/config`;
      const message = JSON.stringify(config);

      this.client.publish(topic, message, { qos: 1, retain: true }, (error) => {
        if (error) {
          console.error(`Error publishing config to ${topic}:`, error);
          return false;
        }
        console.log(`Config published to ${topic}`);
        return true;
      });
    } catch (error) {
      console.error("Error sending config to device:", error);
      return false;
    }
  }

  disconnect() {
    if (this.client && this.client.connected) {
      this.client.end();
      console.log("MQTT client disconnected");
    }
  }
}

module.exports = MqttService;
