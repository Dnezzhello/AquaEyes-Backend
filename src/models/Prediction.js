const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema(
  {
    prediction_id: {
      type: String,
      required: true,
      unique: true,
    },
    prediction_type: {
      type: String,
      required: true,
      enum: [
        "flood level",
        "flow rate",
        "rainfall_intensity",
        "soil_saturation",
      ],
    },
    location: {
      name: String,
      coordinates: {
        type: Number,
        index: "2dsphere",
      },
      waterway: String,
    },
    timeframe: {
      start: Date,
      end: Date,
    },
    values: [
      {
        timestamp: Date,
        value: Number,
        confidence: Number,
      },
    ],
    risk_level: {
      type: String,
      enum: ["low", "medium", "high"],
    },
    input_data: {
      type: Object,
      default: {},
    },
    model_version: String,
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  },
);
