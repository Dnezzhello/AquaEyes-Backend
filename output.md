## Persona

Senior developer with 40 years experience.

## Guidelines

1. Assume questions and code snippets relate to this project unless stated otherwise
2. Follow project's structure, standards and stack
3. Provide step-by-step guidance for changes
4. Explain rationale when asked
5. Be direct and concise
6. Think step by step
7. Use conventional commit format
8. Follow project-specific instructions

## Response Structure

1. Direct answer/solution
2. Brief explanation of approach (when needed)
3. Minimal code snippets during discussion phase

## Code Modification Guidelines

- Discuss the approach before providing complete implementation
- Consider the existing project structure when suggesting new features
- For significant changes, propose a step-by-step implementation plan before writing extensive code

## User Notes

Add any personal notes or reminders about this or other projects here.
This file is private and stored in your user config directory.

## Project Notes

Add project-specific notes, documentation and guidelines here.
This file is stored in the project repository.

# Detailed Repository Content: **AquaEyes-Backend**

# Instructions for AI: ⚠️ COMPLETE PROJECT CONTEXT PROVIDED - NO NEED TO REQUEST ADDITIONAL CONTEXT ⚠️

## Quick Reference

- ✓ = Full content included below

- ✗ = Excluded (not included)

> Generation timestamp: 1744012849.084332
> For updates: Use lc-list-modified-files first to identify changes, then lc-get-files for specific files
> If tools are unavailable, ask the user to run the "lc-changed" CLI command

This context presents a comprehensive view of the _/AquaEyes-Backend_ repository.

## Instructions for AI: 📂 Before Requesting Any Files

1. **SEARCH THIS DOCUMENT** to check if the file is already included
2. **CHECK the repository structure** below to confirm file status (✓, or ✗)
3. Only request ✗ files that are absolutely necessary for your analysis

### How to Request Missing Files

Check if lc-get-files tool is available in your environment before proceeding to option 2.

1. Using the lc-get-files tool (if available in your environment):
   **ROOT PATH must be: /Users/souphaxaynaovalath/Documents/projects/AquaEyes/AquaEyes-Backend**
   Example request:

```json
{
  "root_path": "/Users/souphaxaynaovalath/Documents/projects/AquaEyes/AquaEyes-Backend",
  "paths": [
    "/AquaEyes-Backend/.llm-context/templates/lc-prompt.j2",
    "/AquaEyes-Backend/.llm-context/templates/lc-files.j2"
  ]
}
```

2. Only if lc-get-files is not available, follow these steps (do NOT use the above root_path):

   1. Immediately halt your current response.
   2. Start a new response with a markdown code block (```) on a new line.
   3. List the root-relative paths of the missing files you need, one per line.
   4. Close the markdown code block with another ```.
   5. End your response.

   Example file request:

   ```
   /AquaEyes-Backend/.llm-context/templates/lc-prompt.j2
   /AquaEyes-Backend/.llm-context/templates/lc-files.j2
   ```

   The human will then provide the requested file contents in the next message.

## Repository Structure

```
Status: ✓=Full content, ✗=Excluded
Format: status path bytes (size) age

✓ /AquaEyes-Backend/.gitattributes 66(66.0 B)10d ago
✗ /AquaEyes-Backend/.gitignore 2047(2.0 KB)10d ago
✗ /AquaEyes-Backend/.llm-context/.gitignore 27(27.0 B)3m ago
✗ /AquaEyes-Backend/.llm-context/config.yaml 338(338.0 B)3m ago
✗ /AquaEyes-Backend/.llm-context/lc-project-notes.md 128(128.0 B)3m ago
✗ /AquaEyes-Backend/.llm-context/rules/lc-code.md 927(927.0 B)3m ago
✗ /AquaEyes-Backend/.llm-context/rules/lc-gitignores.md 1441(1.4 KB)3m ago
✗ /AquaEyes-Backend/.llm-context/templates/lc-context-mcp.j2 2208(2.2 KB)3m ago
✗ /AquaEyes-Backend/.llm-context/templates/lc-context.j2 3494(3.4 KB)3m ago
✗ /AquaEyes-Backend/.llm-context/templates/lc-definitions.j2 213(213.0 B)3m ago
✗ /AquaEyes-Backend/.llm-context/templates/lc-files.j2 160(160.0 B)3m ago
✗ /AquaEyes-Backend/.llm-context/templates/lc-highlights.j2 105(105.0 B)3m ago
✗ /AquaEyes-Backend/.llm-context/templates/lc-prompt.j2 205(205.0 B)3m ago
✓ /AquaEyes-Backend/.yarnrc 74(74.0 B)2d ago
✓ /AquaEyes-Backend/package.json 441(441.0 B)2d ago
✓ /AquaEyes-Backend/public/simulator.html 5391(5.3 KB)1d ago
✓ /AquaEyes-Backend/scripts/seedDevices.js 2803(2.7 KB)1d ago
✓ /AquaEyes-Backend/scripts/simulateDate.js 4373(4.3 KB)1d ago
✓ /AquaEyes-Backend/scripts/simulator.js 1522(1.5 KB)1d ago
✓ /AquaEyes-Backend/src/app.js 1668(1.6 KB)1d ago
✓ /AquaEyes-Backend/src/config/index.js 688(688.0 B)2d ago
✓ /AquaEyes-Backend/src/controllers/deviceController.js 8884(8.7 KB)1d ago
✓ /AquaEyes-Backend/src/models/Alert.js 1215(1.2 KB)1d ago
✓ /AquaEyes-Backend/src/models/Device.js 1007(1007.0 B)1d ago
✓ /AquaEyes-Backend/src/models/Prediction.js 972(972.0 B)10d ago
✓ /AquaEyes-Backend/src/models/SensorReading.js 662(662.0 B)8d ago
✓ /AquaEyes-Backend/src/models/index.js 237(237.0 B)2d ago
✓ /AquaEyes-Backend/src/routes/adminRoute.js 236(236.0 B)1d ago
✓ /AquaEyes-Backend/src/routes/deviceRoute.js 1341(1.3 KB)1d ago
✓ /AquaEyes-Backend/src/services/mqttService.js 10989(10.7 KB)1d ago
✗ /AquaEyes-Backend/yarn.lock 49455(48.3 KB)2d ago
```

## Complete File Contents

/AquaEyes-Backend/.yarnrc
॥๛॥
yarn-path: /Users/souphaxaynaovalath/.nvm/versions/node/v22.14.0/bin/yarn

॥๛॥
/AquaEyes-Backend/package.json
॥๛॥
{
"name": "AquaEyes-Backend",
"version": "1.0.0",
"main": "src/app.js",
"author": "Souphaxay Naovalath",
"license": "MIT",
"dependencies": {
"cors": "^2.8.5",
"dotenv": "^16.4.7",
"express": "^4.21.2",
"helmet": "^8.1.0",
"mongoose": "^8.13.0",
"mqtt": "^5.10.4"
},
"devDependencies": {
"nodemon": "^3.1.9"
},
"scripts": {
"start": "node src/app.js",
"dev": "nodemon src/app.js"
}
}

॥๛॥
/AquaEyes-Backend/.gitattributes
॥๛॥

# Auto detect text files and perform LF normalization

- text=auto

॥๛॥
/AquaEyes-Backend/public/simulator.html
॥๛॥

<!DOCTYPE html>
<html>
  <head>
    <title>AquaEyes Simulator</title>
    <link
      href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
      rel="stylesheet"
    />
    <script src="/socket.io/socket.io.js"></script>
  </head>
  <body class="bg-gray-100 p-8">
    <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-6">AquaEyes Simulator</h1>

      <div class="mb-8">
        <h2 class="text-lg font-semibold mb-4">Simulate Sensor Reading</h2>
        <form id="readingForm" class="space-y-4">
          <div>
            <label class="block mb-1">Device ID</label>
            <input
              type="text"
              id="deviceId"
              value="DEV001"
              class="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label class="block mb-1">Sensor ID</label>
            <select id="sensorId" class="w-full p-2 border rounded">
              <option value="WL001">Water Level (WL001)</option>
              <option value="FL001">Flow Rate (FL001)</option>
              <option value="RG001">Rain Gauge (RG001)</option>
              <option value="SM001">Soil Moisture (SM001)</option>
            </select>
          </div>
          <div>
            <label class="block mb-1">Value</label>
            <input
              type="number"
              id="readingValue"
              value="120"
              class="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label class="block mb-1">Unit</label>
            <input
              type="text"
              id="readingUnit"
              value="cm"
              class="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send Reading
          </button>
        </form>
      </div>

      <div>
        <h2 class="text-lg font-semibold mb-4">Simulate Alert</h2>
        <form id="alertForm" class="space-y-4">
          <div>
            <label class="block mb-1">Type</label>
            <select id="alertType" class="w-full p-2 border rounded">
              <option value="flood_warning">Flood Warning</option>
              <option value="sensor_failure">Sensor Failure</option>
              <option value="battery_low">Battery Low</option>
              <option value="connection_loss">Connection Loss</option>
            </select>
          </div>
          <div>
            <label class="block mb-1">Severity</label>
            <select id="alertSeverity" class="w-full p-2 border rounded">
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="danger">Danger</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <div>
            <label class="block mb-1">Message</label>
            <textarea
              id="alertMessage"
              class="w-full p-2 border rounded"
              rows="3"
            >

Water level rising rapidly at Ban Na Than</textarea
            >
</div>
<button
            type="submit"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
Send Alert
</button>
</form>
</div>
</div>

    <script>
      const socket = io();

      document
        .getElementById("readingForm")
        .addEventListener("submit", async (e) => {
          e.preventDefault();

          const reading = {
            device_id: document.getElementById("deviceId").value,
            sensor_id: document.getElementById("sensorId").value,
            value: parseFloat(document.getElementById("readingValue").value),
            unit: document.getElementById("readingUnit").value,
          };

          try {
            const response = await fetch("/api/devices/simulate/reading", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(reading),
            });

            const result = await response.json();
            alert("Reading sent successfully!");
          } catch (error) {
            console.error("Error:", error);
            alert("Failed to send reading");
          }
        });

      document
        .getElementById("alertForm")
        .addEventListener("submit", async (e) => {
          e.preventDefault();

          const alert = {
            type: document.getElementById("alertType").value,
            severity: document.getElementById("alertSeverity").value,
            message: document.getElementById("alertMessage").value,
            devices: [document.getElementById("deviceId").value],
          };

          try {
            const response = await fetch("/api/devices/simulate/alert", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(alert),
            });

            const result = await response.json();
            alert("Alert sent successfully!");
          } catch (error) {
            console.error("Error:", error);
            alert("Failed to send alert");
          }
        });
    </script>

  </body>
</html>

॥๛॥
/AquaEyes-Backend/scripts/seedDevices.js
॥๛॥
// scripts/seedDevices.js
const mongoose = require('mongoose');
const { Device } = require('../src/models');
const config = require('../src/config');

async function seedDevices() {
try {
// Connect with explicit options
await mongoose.connect(config.mongoURI, {
useNewUrlParser: true,
useUnifiedTopology: true
});
console.log('Connected to MongoDB');

    // Clear existing devices
    await Device.deleteMany({});
    console.log('Cleared existing devices');

    // Define the device with explicit type casting
    const deviceData = {
      device_id: 'DEV001',
      name: 'AquaEyes Prototype Node 1',
      location: {
        name: 'Ban Na Than, Pak San',
        coordinates: [Number(102.6123), Number(18.3893)],
        waterway: 'Mekong River',
        elevation: Number(174)
      },
      sensors: [
        {
          sensor_id: 'WL001',
          type: 'water_level',
          model: 'JSN-SR04T',
          installation_date: new Date('2024-03-01'),
          thresholds: {
            warning: Number(150),
            danger: Number(250),
            critical: Number(350)
          }
        },
        {
          sensor_id: 'FL001',
          type: 'flow_rate',
          model: 'YF-S201',
          installation_date: new Date('2024-03-01'),
          thresholds: {
            warning: Number(10),
            danger: Number(20),
            critical: Number(30)
          }
        },
        {
          sensor_id: 'RG001',
          type: 'rainfall',
          model: 'Tipping Bucket',
          installation_date: new Date('2024-03-01'),
          thresholds: {
            warning: Number(10),
            danger: Number(25),
            critical: Number(50)
          }
        },
        {
          sensor_id: 'SM001',
          type: 'soil_moisture',
          model: 'Resistive Probe',
          installation_date: new Date('2024-03-01'),
          thresholds: {
            warning: Number(70),
            danger: Number(85),
            critical: Number(95)
          }
        }
      ],
      status: {
        battery: Number(85),
        signal_strength: Number(-67),
        last_check_in: new Date()
      }
    };

    // Try creating and saving one by one
    const device = new Device(deviceData);
    await device.save();
    console.log('Added test device');

    console.log('Database seeding complete');

} catch (error) {
console.error('Error seeding database:', error.message);
// Print more detailed error information
if (error.errors) {
Object.keys(error.errors).forEach(key => {
console.error(`Field error [${key}]:`, error.errors[key].message);
});
}
} finally {
await mongoose.disconnect();
console.log('Disconnected from MongoDB');
}
}

seedDevices();
॥๛॥
/AquaEyes-Backend/scripts/simulateDate.js
॥๛॥
// src/scripts/simulateData.js
const axios = require('axios');

// Configuration
const API_URL = 'http://localhost:4558/api/devices';
const DEVICE_ID = 'DEV001';
const UPDATE_INTERVAL = 30000; // 30 seconds

// Initial values
let waterLevel = 100; // in cm
let flowRate = 5; // in L/min
let soilMoisture = 60; // in %
let rainfall = 0; // in mm

// Direction of change (1 = increasing, -1 = decreasing)
let waterLevelTrend = 1;
let flowRateTrend = 1;

// Function to simulate natural variations
function simulateNaturalVariation(value, min, max, maxChange = 5) {
const change = (Math.random() _ maxChange _ 2) - maxChange;
let newValue = value + change;

// Keep within bounds
if (newValue < min) newValue = min;
if (newValue > max) newValue = max;

return newValue;
}

// Function to simulate water level with trend
function simulateWaterLevel() {
// Add some randomness
const change = (Math.random() _ 5) _ waterLevelTrend;
waterLevel += change;

// Change direction if reaching limits
if (waterLevel > 350) waterLevelTrend = -1;
if (waterLevel < 50) waterLevelTrend = 1;

return waterLevel;
}

// Function to simulate flow rate
function simulateFlowRate() {
// Flow rate follows water level with some lag
flowRate = (waterLevel / 100) _ 5 + (Math.random() _ 2 - 1);
if (flowRate < 0.5) flowRate = 0.5;
return flowRate;
}

// Function to simulate rainfall
function simulateRainfall() {
// 10% chance of rain
if (Math.random() < 0.1) {
rainfall += Math.random() \* 2;
}
return rainfall;
}

// Function to simulate soil moisture
function simulateSoilMoisture() {
// Soil moisture follows rainfall with lag
if (rainfall > 0) {
soilMoisture += Math.random() _ 0.5;
} else {
soilMoisture -= Math.random() _ 0.2;
}

// Keep in bounds
if (soilMoisture > 100) soilMoisture = 100;
if (soilMoisture < 10) soilMoisture = 10;

return soilMoisture;
}

// Function to send simulated readings
async function sendReadings() {
try {
// Update simulated values
const newWaterLevel = simulateWaterLevel();
const newFlowRate = simulateFlowRate();
const newRainfall = simulateRainfall();
const newSoilMoisture = simulateSoilMoisture();

    // Send water level reading
    await axios.post(`${API_URL}/simulate/reading`, {
      device_id: DEVICE_ID,
      sensor_id: 'WL001',
      value: newWaterLevel.toFixed(1),
      unit: 'cm'
    });

    // Send flow rate reading
    await axios.post(`${API_URL}/simulate/reading`, {
      device_id: DEVICE_ID,
      sensor_id: 'FL001',
      value: newFlowRate.toFixed(2),
      unit: 'L/min'
    });

    // Send rainfall reading
    await axios.post(`${API_URL}/simulate/reading`, {
      device_id: DEVICE_ID,
      sensor_id: 'RG001',
      value: newRainfall.toFixed(2),
      unit: 'mm'
    });

    // Send soil moisture reading
    await axios.post(`${API_URL}/simulate/reading`, {
      device_id: DEVICE_ID,
      sensor_id: 'SM001',
      value: newSoilMoisture.toFixed(1),
      unit: '%'
    });

    console.log(`[${new Date().toISOString()}] Readings sent:`, {
      waterLevel: newWaterLevel.toFixed(1),
      flowRate: newFlowRate.toFixed(2),
      rainfall: newRainfall.toFixed(2),
      soilMoisture: newSoilMoisture.toFixed(1)
    });

    // Check if thresholds are exceeded to trigger alerts
    if (newWaterLevel > 250) {
      await axios.post(`${API_URL}/simulate/alert`, {
        type: 'flood_warning',
        severity: 'critical',
        message: `Water level critical: ${newWaterLevel.toFixed(1)} cm (Threshold: 250 cm)`,
        devices: [DEVICE_ID]
      });

      console.log(`[${new Date().toISOString()}] CRITICAL ALERT triggered!`);
    }
    else if (newWaterLevel > 150) {
      await axios.post(`${API_URL}/simulate/alert`, {
        type: 'flood_warning',
        severity: 'warning',
        message: `Water level warning: ${newWaterLevel.toFixed(1)} cm (Threshold: 150 cm)`,
        devices: [DEVICE_ID]
      });

      console.log(`[${new Date().toISOString()}] WARNING ALERT triggered!`);
    }

} catch (error) {
console.error('Error sending simulated data:', error.message);
}
}

// Start simulation
console.log(`Starting simulation for device ${DEVICE_ID}...`);
sendReadings(); // Send initial readings
setInterval(sendReadings, UPDATE_INTERVAL);
॥๛॥
/AquaEyes-Backend/scripts/simulator.js
॥๛॥
// scripts/simulator.js
const axios = require('axios');
const API_URL = 'http://localhost:4558/api/devices';

// Device and sensor IDs
const devices = [
{
id: 'DEV001',
sensors: [
{ id: 'WL001', type: 'water_level', unit: 'cm', min: 50, max: 250 },
{ id: 'FL001', type: 'flow_rate', unit: 'L/min', min: 1, max: 30 },
{ id: 'RG001', type: 'rainfall', unit: 'mm', min: 0, max: 50 },
{ id: 'SM001', type: 'soil_moisture', unit: '%', min: 20, max: 90 }
]
}
];

// Function to generate random reading between min and max
function generateReading(min, max) {
return min + Math.random() \* (max - min);
}

// Simulate a reading for each sensor of each device
async function simulateReadings() {
try {
for (const device of devices) {
console.log(`Simulating readings for device ${device.id}...`);

      for (const sensor of device.sensors) {
        const value = generateReading(sensor.min, sensor.max).toFixed(2);

        const response = await axios.post(`${API_URL}/simulate/reading`, {
          device_id: device.id,
          sensor_id: sensor.id,
          value: parseFloat(value),
          unit: sensor.unit
        });

        console.log(`Sent ${sensor.type} reading: ${value} ${sensor.unit}`);
      }
    }

    console.log('Simulation complete');

} catch (error) {
console.error('Error simulating readings:', error.message);
}
}

// Run simulation every 30 seconds
simulateReadings();
setInterval(simulateReadings, 30000);
॥๛॥
/AquaEyes-Backend/src/app.js
॥๛॥
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const http = require("http");
const config = require("./config");

// import routes
const deviceRoute = require("./routes/deviceRoute");
const adminRoute = require("./routes/adminRoute");

// Import MQTT service
const MqttService = require("./services/mqttService");

// initialize express app
const app = express();

// initialize middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Add this line after other middleware setup
app.use(express.static('public'));

// Create HTTP server
const server = http.createServer(app);

// Set up Socket.IO
const io = new Server(server, {
cors: {
origin: "\*",
methods: ["GET", "POST"],
},
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

// Socket.IO connection handling
io.on("connection", (socket) => {
console.log("Client connected");

socket.on("disconnect", () => {
console.log("Client disconnected");
});
});

// Connect to database and start server
config
.connectDB()
.then(() => {
server.listen(config.port, () => {
console.log(
`Server running in ${config.env} mode on port ${config.port}`
);
});
})
.catch((err) => {
console.error("Failed to connect to database:", err);
});

॥๛॥
/AquaEyes-Backend/src/config/index.js
॥๛॥
require("dotenv").config();

const config = {
// server setting
port: process.env.PORT || 4558,
env: process.env.NODE_ENV || "development",

// database settings
mongoURI: process.env.MONGODB_URI || "mongodb://localhost:27017/aquaeyes",

// basic sms settings (for future)
smsEnabled: process.env.SMS_ENABLED || false,

connectDB: async function () {
const mongoose = require("mongoose");
try {
await mongoose.connect(this.mongoURI);
console.log("MongoDB connected");
return mongoose.connection;
} catch (error) {
console.error("MongoDB connection error:", error.message);
process.exit(1);
}
},
};

module.exports = config;

॥๛॥
/AquaEyes-Backend/src/models/SensorReading.js
॥๛॥
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

॥๛॥
/AquaEyes-Backend/src/models/Device.js
॥๛॥
const mongoose = require("mongoose");

// Define a separate schema for the sensor
const sensorSchema = new mongoose.Schema({
sensor_id: String,
type: String,
model: String,
installation_date: Date,
thresholds: {
warning: Number,
danger: Number,
critical: Number,
},
});

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
sensors: [sensorSchema], // Use the defined sensor schema
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
॥๛॥
/AquaEyes-Backend/src/models/index.js
॥๛॥
const Device = require("./Device");
const SensorReading = require("./SensorReading");
const Alert = require("./Alert");
const Prediction = require("./Prediction");

module.exports = {
Device,
SensorReading,
Alert,
Prediction,
};

॥๛॥
/AquaEyes-Backend/src/models/Alert.js
॥๛॥
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
}
);

module.exports = mongoose.model("Alert", alertSchema);

॥๛॥
/AquaEyes-Backend/src/models/Prediction.js
॥๛॥
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

॥๛॥
/AquaEyes-Backend/src/controllers/deviceController.js
॥๛॥
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
      deviceData.device_id = `DEV${Date.now().toString().slice(-6)}`;
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
{ new: true, runValidators: true }
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
      { new: true }
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
      alert_id: `ALT-${Date.now().toString().slice(-6)}`,
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
      sensor_reading_id: `SRD-${Date.now().toString().slice(-6)}`,
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

॥๛॥
/AquaEyes-Backend/src/routes/deviceRoute.js
॥๛॥
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
॥๛॥
/AquaEyes-Backend/src/routes/adminRoute.js
॥๛॥
const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/simulator", (req, res) => {
res.sendFile(path.join(\_\_dirname, "../public/simulator.html"));
});

module.exports = router;
॥๛॥
/AquaEyes-Backend/src/services/mqttService.js
॥๛॥
const mqtt = require("mqtt");
const { Device, SensorReading, Alert } = require("../models");

class MqttService {
constructor(io) {
this.io = io;
this.client = null;
this.mqttConfig = {
broker: process.env.MQTT_BROKER,
port: process.env.MQTT_PORT,
clientId: `AquaEyes_Backend${Date.now()}`,
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
if (!sensorId) {
console.warn(
`Warning: Message from ${deviceId} missing sensor_id. Using generated ID.`
);

        // Generate a fallback ID based on device and sensor type
        let fallbackId;
        switch (sensorType) {
          case "water_level":
            fallbackId = `WL-${deviceId}`;
            break;
          case "flow_rate":
            fallbackId = `FL-${deviceId}`;
            break;
          case "rainfall":
            fallbackId = `RG-${deviceId}`;
            break;
          case "soil_moisture":
            fallbackId = `SM-${deviceId}`;
            break;
          default:
            fallbackId = `UNKNOWN-${deviceId}-${sensorType}`;
        }

        // Create new sensor reading with fallback ID
        const reading = new SensorReading({
          sensor_reading_id: `SRD-${Date.now().toString().slice(-6)}`,
          device_id: deviceId,
          sensor_id: fallbackId,
          timestamp: new Date(payload.timestamp) || new Date(),
          value: payload.value,
          unit: payload.unit,
          metadata: payload.metadata || {},
        });

        await reading.save();
      } else {
        // Create new sensor reading with the actual sensor ID
        const reading = new SensorReading({
          sensor_reading_id: `SRD-${Date.now().toString().slice(-6)}`,
          device_id: deviceId,
          sensor_id: sensorId, // Use the actual sensor ID from the device
          timestamp: new Date(payload.timestamp) || new Date(),
          value: payload.value,
          unit: payload.unit,
          metadata: payload.metadata || {},
        });
        await reading.save();
      }

      // Emit real-time update via Socket.IO
      if (this.io) {
        this.io.emit("new-reading", {
          deviceId,
          sensorType,
          reading: reading,
        });
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
}
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
{ "status.battery": payload.value }
);

      // Check if battery is low and trigger alert if needed
      if (payload.value < 20) {
        const alert = new Alert({
          alert_id: `ALT-${Date.now().toString().slice(-6)}`,
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

      if (alertType && alertSeverity) {
        // Create alert
        const alert = new Alert({
          alert_id: `ALT-${Date.now().toString().slice(-6)}`,
          type: alertType,
          severity: alertSeverity,
          message: this.createAlertMessage(
            sensorType,
            value,
            reading.unit,
            sensorInfo.thresholds
          ),
          devices: [deviceId],
          triggered_by: {
            condition: `${this.getSensorTypeName(
              sensorType
            )} exceeds ${alertSeverity} threshold`,
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

createAlertMessage(sensorType, value, unit, thresholds) {
const sensorName = this.getSensorTypeName(sensorType);
const threshold =
value >= thresholds.critical
? thresholds.critical
: value >= thresholds.danger
? thresholds.danger
: thresholds.warning;

    return `${sensorName} alert: ${value} ${unit} (Threshold: ${threshold} ${unit})`;

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

module.exports = MQTTService;

॥๛॥
