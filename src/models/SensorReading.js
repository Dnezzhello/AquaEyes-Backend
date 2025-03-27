const mongoose = require("mongoose");

const sensorReadingSchema = new mongoose.Schema({
  sensor_reading_id: {
    type: String,
    required: true,
    unique: true,
  },
  device_id: {
    type: String,
    required: true,
    ref: "Device",
  },
  sensor_id: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  unit: String,
  metadata: {
    type: Object,
    default: {},
  },
});

sensorReadingSchema.index({ device_id: 1, sensor_id: 1, timestamp: -1 });

module.exports = mongoose.model("SensorReading", sensorReadingSchema);
