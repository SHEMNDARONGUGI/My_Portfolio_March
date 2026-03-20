const Service = require("../models/Service");

// POST api/services

exports.createService = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({
        message: "Not authorized, only admin can create a new service",
      });
    const service = await Service.create({ ...req.body, owner: req.user.id });
    res.status(201).json(service);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// GET api/services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();

    if (!services || services.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No services records found",
      });
    }

    res
      .status(200)
      .json({ success: true, count: services.length, services: services });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// PUT api/services/:id
exports.updateService = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res
        .status(403)
        .json({ message: "Only admin can update services" });

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedService)
      return res.status(404).json({ message: "Service Not Found" });

    res.status(200).json(updatedService);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// DELETE api/services/:id
exports.deleteService = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res
        .status(403)
        .json({ message: "Only admin can delete services" });
    const deletedService = await Service.findByIdAndDelete(req.params.id);

    if (!deletedService)
      return res.status(404).json({ message: "Service not found" });

    res.status(200).json({ message: "Service Deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
