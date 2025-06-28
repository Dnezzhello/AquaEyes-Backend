// scripts/simulator.js
const axios = require('axios');
const API_URL = 'http://localhost:4558/api/devices';

// Simulation mode: 'normal', 'warning', 'critical', 'flood_event'
let SIMULATION_MODE = process.env.SIM_MODE || 'normal';

// Device and sensor IDs with realistic thresholds
const devices = [
  { 
    id: 'DEV001', 
    name: 'Vientiane Station',
    baseValues: {
      waterLevel: 120,    // Normal base level
      flowRate: 8,        // Normal flow rate
      soilMoisture: 45    // Normal soil moisture
    },
    sensors: [
      { 
        id: 'WL001', 
        type: 'water_level', 
        unit: 'cm', 
        thresholds: { warning: 150, danger: 250, critical: 350 }
      },
      { 
        id: 'FL001', 
        type: 'flow_rate', 
        unit: 'm³/s', 
        thresholds: { warning: 10, danger: 20, critical: 30 }
      },
      { 
        id: 'RG001', 
        type: 'rainfall', 
        unit: 'mm', 
        thresholds: { warning: 10, danger: 25, critical: 50 }
      },
      { 
        id: 'SM001', 
        type: 'soil_moisture', 
        unit: '%', 
        thresholds: { warning: 70, danger: 85, critical: 95 }
      }
    ]
  }
];

// Global state for realistic data progression
let globalState = {
  currentRainfall: 0,
  waterLevelTrend: 0,
  isStormEvent: false,
  stormDuration: 0,
  lastReadings: {}
};

// Initialize base readings
devices.forEach(device => {
  globalState.lastReadings[device.id] = {
    water_level: device.baseValues.waterLevel,
    flow_rate: device.baseValues.flowRate,
    rainfall: 0,
    soil_moisture: device.baseValues.soilMoisture
  };
});

function generateRealisticReading(deviceId, sensorType, mode = SIMULATION_MODE) {
  const device = devices.find(d => d.id === deviceId);
  const sensor = device.sensors.find(s => s.type === sensorType);
  const lastValue = globalState.lastReadings[deviceId][sensorType] || 0;
  
  let value;
  
  switch (sensorType) {
    case 'rainfall':
      value = generateRainfall(mode);
      globalState.currentRainfall = value;
      break;
      
    case 'water_level':
      value = generateWaterLevel(deviceId, mode, lastValue);
      break;
      
    case 'flow_rate':
      value = generateFlowRate(deviceId, mode, lastValue);
      break;
      
    case 'soil_moisture':
      value = generateSoilMoisture(deviceId, mode, lastValue);
      break;
      
    default:
      value = lastValue + (Math.random() - 0.5) * 10;
  }
  
  // Store for next iteration
  globalState.lastReadings[deviceId][sensorType] = value;
  
  return Math.max(0, parseFloat(value.toFixed(2)));
}

function generateRainfall(mode) {
  const hour = new Date().getHours();
  
  // Check for storm events
  if (!globalState.isStormEvent && Math.random() < 0.05) {
    globalState.isStormEvent = true;
    globalState.stormDuration = Math.floor(Math.random() * 6) + 2; // 2-8 intervals
  }
  
  if (globalState.isStormEvent) {
    globalState.stormDuration--;
    if (globalState.stormDuration <= 0) {
      globalState.isStormEvent = false;
    }
  }
  
  switch (mode) {
    case 'normal':
      if (globalState.isStormEvent) return Math.random() * 15 + 5;
      return hour >= 14 && hour <= 18 ? Math.random() * 5 : Math.random() * 2;
      
    case 'warning':
      if (globalState.isStormEvent) return Math.random() * 25 + 10;
      return Math.random() * 12 + 3;
      
    case 'critical':
    case 'flood_event':
      if (globalState.isStormEvent) return Math.random() * 40 + 20;
      return Math.random() * 30 + 15;
      
    default:
      return Math.random() * 5;
  }
}

function generateWaterLevel(deviceId, mode, lastValue) {
  const device = devices.find(d => d.id === deviceId);
  const baseLevel = device.baseValues.waterLevel;
  const hour = new Date().getHours();
  
  // Daily tidal pattern (small effect)
  const tidalEffect = Math.sin((hour * Math.PI) / 12) * 8;
  
  // Rainfall impact (delayed by 30-60 minutes)
  const rainfallImpact = globalState.currentRainfall * 1.5;
  
  // Gradual trending based on mode
  switch (mode) {
    case 'normal':
      globalState.waterLevelTrend = Math.max(-2, Math.min(2, globalState.waterLevelTrend + (Math.random() - 0.5) * 0.5));
      break;
      
    case 'warning':
      globalState.waterLevelTrend = Math.max(-1, Math.min(4, globalState.waterLevelTrend + (Math.random() - 0.3) * 0.8));
      break;
      
    case 'critical':
    case 'flood_event':
      globalState.waterLevelTrend = Math.max(0, Math.min(8, globalState.waterLevelTrend + (Math.random() - 0.1) * 1.2));
      break;
  }
  
  const targetLevel = baseLevel + tidalEffect + rainfallImpact + globalState.waterLevelTrend * 10;
  
  // Smooth transition to target (not instant changes)
  const change = (targetLevel - lastValue) * 0.3 + (Math.random() - 0.5) * 3;
  
  return Math.max(30, lastValue + change);
}

function generateFlowRate(deviceId, mode, lastValue) {
  const device = devices.find(d => d.id === deviceId);
  const baseFlow = device.baseValues.flowRate;
  
  // Flow rate correlates with water level
  const currentWaterLevel = globalState.lastReadings[deviceId].water_level || device.baseValues.waterLevel;
  const waterLevelFactor = Math.max(0.5, currentWaterLevel / device.baseValues.waterLevel);
  
  const rainfallFactor = 1 + (globalState.currentRainfall * 0.1);
  
  let targetFlow = baseFlow * waterLevelFactor * rainfallFactor;
  
  switch (mode) {
    case 'warning':
      targetFlow *= 1.5;
      break;
    case 'critical':
    case 'flood_event':
      targetFlow *= 2.2;
      break;
  }
  
  const change = (targetFlow - lastValue) * 0.4 + (Math.random() - 0.5) * 1;
  
  return Math.max(0.5, lastValue + change);
}

function generateSoilMoisture(deviceId, mode, lastValue) {
  const device = devices.find(d => d.id === deviceId);
  const baseMoisture = device.baseValues.soilMoisture;
  
  // Soil moisture increases with rainfall (with delay)
  const rainfallEffect = globalState.currentRainfall * 2;
  
  // Natural drainage over time
  const drainage = -0.5;
  
  let targetMoisture = baseMoisture + rainfallEffect;
  
  switch (mode) {
    case 'warning':
      targetMoisture += 15;
      break;
    case 'critical':
    case 'flood_event':
      targetMoisture += 25;
      break;
  }
  
  const change = (targetMoisture - lastValue) * 0.2 + drainage + (Math.random() - 0.5) * 2;
  
  return Math.max(15, Math.min(100, lastValue + change));
}

// Simulate a reading for each sensor of each device
async function simulateReadings() {
  try {
    console.log(`\n🌊 Simulating readings [Mode: ${SIMULATION_MODE}]...`);
    
    for (const device of devices) {
      console.log(`📡 Device ${device.id} (${device.name}):`);
      
      for (const sensor of device.sensors) {
        const value = generateRealisticReading(device.id, sensor.type);
        
        await axios.post(`${API_URL}/simulate/reading`, {
          device_id: device.id,
          sensor_id: sensor.id,
          value: value,
          unit: sensor.unit
        });
        
        // Check if value is approaching thresholds
        const status = getThresholdStatus(value, sensor.thresholds);
        const statusIcon = status === 'normal' ? '🟢' : status === 'warning' ? '🟡' : status === 'danger' ? '🟠' : '🔴';
        
        console.log(`  ${statusIcon} ${sensor.type}: ${value} ${sensor.unit} [${status}]`);
        
        // Simulate alerts based on thresholds
        await checkAndSimulateAlert(device.id, sensor, value);
      }
    }
    
    // Log current global state for debugging
    if (globalState.isStormEvent) {
      console.log(`⛈️  Storm event active (${globalState.stormDuration} intervals remaining)`);
    }
    
    console.log('✅ Simulation complete\n');
  } catch (error) {
    console.error('❌ Error simulating readings:', error.message);
  }
}

function getThresholdStatus(value, thresholds) {
  if (value >= thresholds.critical) return 'critical';
  if (value >= thresholds.danger) return 'danger';
  if (value >= thresholds.warning) return 'warning';
  return 'normal';
}

async function checkAndSimulateAlert(deviceId, sensor, value) {
  const status = getThresholdStatus(value, sensor.thresholds);
  
  // Only create alerts for warning and above, and not too frequently
  if (status !== 'normal' && Math.random() < 0.3) {
    try {
      const alertData = {
        type: sensor.type === 'water_level' || sensor.type === 'flow_rate' ? 'flood_warning' : 'sensor_failure',
        severity: status,
        message: generateAlertMessage(sensor.type, value, sensor.unit, status),
        devices: [deviceId]
      };
      
      await axios.post(`${API_URL}/simulate/alert`, alertData);
      console.log(`  🚨 Alert triggered: ${status} ${sensor.type}`);
    } catch (error) {
      console.error('Error creating alert:', error.message);
    }
  }
}

function generateAlertMessage(sensorType, value, unit, severity) {
  const sensorNames = {
    water_level: 'Water level',
    flow_rate: 'Flow rate', 
    rainfall: 'Rainfall',
    soil_moisture: 'Soil moisture'
  };
  
  const severityMessages = {
    warning: 'is elevated',
    danger: 'is high', 
    critical: 'has reached critical levels'
  };
  
  const sensorName = sensorNames[sensorType] || sensorType;
  const severityMsg = severityMessages[severity] || 'is abnormal';
  
  return `${sensorName} ${severityMsg}: ${value} ${unit}`;
}

// Mode switching functions
function setSimulationMode(mode) {
  SIMULATION_MODE = mode;
  console.log(`🔄 Simulation mode changed to: ${mode}`);
  
  // Reset some state when changing modes
  if (mode === 'normal') {
    globalState.waterLevelTrend = 0;
    globalState.isStormEvent = false;
  }
}

// Generate historical data for better visualization
async function generateHistoricalData(days = 1) {
  console.log(`📊 Generating ${days} days of historical data...`);
  
  const now = new Date();
  const originalMode = SIMULATION_MODE;
  
  try {
    for (let d = days; d >= 0; d--) {
      for (let h = 0; h < 24; h += 2) { // Every 2 hours
        const timestamp = new Date(now.getTime() - (d * 24 + h) * 60 * 60 * 1000);
        
        // Vary the mode throughout history for interesting data
        if (Math.random() < 0.1) setSimulationMode('warning');
        else if (Math.random() < 0.05) setSimulationMode('critical');
        else setSimulationMode('normal');
        
        for (const device of devices) {
          for (const sensor of device.sensors) {
            const value = generateRealisticReading(device.id, sensor.type);
            
            await axios.post(`${API_URL}/simulate/reading`, {
              device_id: device.id,
              sensor_id: sensor.id,
              value: value,
              unit: sensor.unit,
              timestamp: timestamp.toISOString()
            });
          }
        }
        
        // Small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    console.log('✅ Historical data generation complete');
  } catch (error) {
    console.error('❌ Error generating historical data:', error.message);
  } finally {
    setSimulationMode(originalMode);
  }
}

// CLI interface
const args = process.argv.slice(2);
const command = args[0];

if (command === 'history') {
  const days = parseInt(args[1]) || 1;
  generateHistoricalData(days);
} else if (command === 'mode') {
  const newMode = args[1];
  if (['normal', 'warning', 'critical', 'flood_event'].includes(newMode)) {
    setSimulationMode(newMode);
  } else {
    console.log('Available modes: normal, warning, critical, flood_event');
    process.exit(1);
  }
} else {
  // Default: run continuous simulation
  console.log(`🚀 Starting AquaEyes Data Simulator [Mode: ${SIMULATION_MODE}]`);
  console.log('💡 Usage:');
  console.log('  node simulator.js mode <normal|warning|critical|flood_event>');
  console.log('  node simulator.js history [days]');
  console.log('  SIM_MODE=critical node simulator.js\n');
  
  // Run simulation every 30 seconds
  simulateReadings();
  const interval = setInterval(simulateReadings, 30000);
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Stopping simulator...');
    clearInterval(interval);
    process.exit(0);
  });
}