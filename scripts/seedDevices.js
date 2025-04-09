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