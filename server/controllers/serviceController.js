const Service = require("../models/Service");

const createService = async (req, res) => {
  const { name, buildCommand, startCommand, envVariables } = req.body;
  const userId = req.user.id; // From authenticated user middleware

  try {
    const service = await Service.create({
      name,
      buildCommand,
      startCommand,
      envVariables,
      status: "stopped",
      userId,
    });
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ msg: "Error creating service", error });
  }
};

const getServices = async (req, res) => {
  const userId = req.user.id;

  try {
    const services = await Service.find({ userId });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching services", error });
  }
};

const deployService = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findByIdAndUpdate(
      id,
      { status: "deployed" },
      { new: true }
    );
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ msg: "Error deploying service", error });
  }
};

module.exports = { createService, getServices, deployService };
