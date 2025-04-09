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
  const change = (Math.random() * maxChange * 2) - maxChange;
  let newValue = value + change;
  
  // Keep within bounds
  if (newValue < min) newValue = min;
  if (newValue > max) newValue = max;
  
  return newValue;
}

// Function to simulate water level with trend
function simulateWaterLevel() {
  // Add some randomness
  const change = (Math.random() * 5) * waterLevelTrend;
  waterLevel += change;
  
  // Change direction if reaching limits
  if (waterLevel > 350) waterLevelTrend = -1;
  if (waterLevel < 50) waterLevelTrend = 1;
  
  return waterLevel;
}

// Function to simulate flow rate
function simulateFlowRate() {
  // Flow rate follows water level with some lag
  flowRate = (waterLevel / 100) * 5 + (Math.random() * 2 - 1);
  if (flowRate < 0.5) flowRate = 0.5;
  return flowRate;
}

// Function to simulate rainfall
function simulateRainfall() {
  // 10% chance of rain
  if (Math.random() < 0.1) {
    rainfall += Math.random() * 2;
  }
  return rainfall;
}

// Function to simulate soil moisture
function simulateSoilMoisture() {
  // Soil moisture follows rainfall with lag
  if (rainfall > 0) {
    soilMoisture += Math.random() * 0.5;
  } else {
    soilMoisture -= Math.random() * 0.2;
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