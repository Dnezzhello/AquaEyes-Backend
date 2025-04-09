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
  return min + Math.random() * (max - min);
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