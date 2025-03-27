const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    alert_id: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        "flood_warning",
        "sensor_failure",
        "battery_low",
        "connection_loss",
        "other",
      ],
    },
    severity: {
      type: String,
      required: true,
      enum: ["info", "warning", "danger", "critical"],
    },
    message: String,
    devices: [
      {
        type: String,
        ref: "Device",
      },
    ],
    location: {
      name: String,
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
    },
    triggered_by: {
      type: Object,
      default: {},
      // For sensor triggers: condition, readings, threshold
      // For prediction triggers: prediction_id, confidence
    },
    recipients: [String],
    status: {
      type: String,
      enum: ["pending", "sent", "delivered", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

module.exports = mongoose.model("Alert", alertSchema);
