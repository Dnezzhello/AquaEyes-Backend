const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    device_id: {
      type: String,
      required: true,
      unique: true,
      primary: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      name: String,
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      waterway: String,
      elevation: Number,
    },
    sensors: [
      {
        sensor_id: String,
        type: String,
        model: String,
        installation_date: Date,
        thresholds: {
          warning: Number,
          danger: Number,
          critical: Number,
        },
      },
    ],
    status: {
      battery: Number,
      signal_strength: Number,
      last_check_in: Date,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

module.exports = mongoose.model("Device", deviceSchema);
