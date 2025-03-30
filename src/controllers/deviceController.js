const { Device } = require("../models");
// const { v4: uuidv4 } = require("uuid");

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

// // Create a new device
// exports.createDevice = async (req, res) => {
//   try {
//     const deviceData = req.body;

//     // Generate a unique device_id if not provided
//     if (!deviceData.device_id) {
//       deviceData.device_id = `dev-${uuidv4()}`;
//     }

//     const device = new Device(deviceData);
//     const savedDevice = await device.save();
//     res.status(201).json(savedDevice);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Update a device
// exports.updateDevice = async (req, res) => {
//   try {
//     const updatedDevice = await Device.findOneAndUpdate(
//       { device_id: req.params.id },
//       req.body,
//       { new: true, runValidators: true },
//     );

//     if (!updatedDevice) {
//       return res.status(404).json({ message: "Device not found" });
//     }

//     res.status(200).json(updatedDevice);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

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
