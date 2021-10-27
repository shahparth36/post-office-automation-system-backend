const Boom = require("@hapi/boom");
const { Service } = require("../models");

async function getServices(req, res, next) {
  try {
    const allServices = await Service.find({});
    return res.status(200).json(allServices);
  } catch (error) {
    next(error);
  }
}

async function getService(req, res, next) {
  try {
    const { id } = req.params;

    const foundService = await Service.findById(id);
    if (!foundService)
      throw Boom.badRequest("Service with given id does not exist");

    return res.status(200).json(foundService);
  } catch (error) {
    next(error);
  }
}

async function addService(req, res, next) {
  try {
    const { serviceName } = req.body;

    const serviceDetails = {
      name: serviceName,
    };

    const createdService = await Service.create(serviceDetails);
    return res.status(200).json(createdService);
  } catch (error) {
    next(error);
  }
}

async function updateService(req, res, next) {
  try {
    const { id } = req.params;

    const foundService = await Service.findById(id);
    if (!foundService)
      throw Boom.badRequest("Service with given id does not exist");

    const updatedService = await Service.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedService);
  } catch (error) {
    next(error);
  }
}

async function deleteService(req, res, next) {
  try {
    const { id } = req.body;

    const foundService = await Service.findById(id);
    if (!foundService)
      throw Boom.badRequest("Service with given id does not exist");

    const deletedService = await Service.findByIdAndDelete(id);
    return res.status(204).json(deletedService);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getServices,
  getService,
  addService,
  updateService,
  deleteService,
};
