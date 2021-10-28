const Boom = require("@hapi/boom");
const { Service, Package } = require("../models");

async function sendPackage(req, res, next) {
  try {
    const { _id } = req.user;
    const { serviceName, source, destination } = req.body;

    const foundService = await Service.findOne({ name: serviceName });
    if (!foundService)
      throw Boom.badRequest("Service with given name not found");

    const packageDetails = {
      packageId: generateRandomNo(),
      status: "Issued",
      serviceId: foundService._id,
      userId: _id,
      location: {
        source,
        currentLocation: null,
        destination,
      },
    };

    const createdPackage = await Package.create(packageDetails);
    return res.status(200).json(createdPackage);
  } catch (error) {
    next(error);
  }
}

async function updatePackageLocation(req, res, next) {
  try {
    const { newLocation, packageId } = req.body;

    const package = await Package.findOne({ packageId });
    if (!package) throw Boom.badRequest("Package with given id not found");

    package.location.currentLocation = newLocation;
    if (package.location.currentLocation === package.location.destination) {
      package.status = "At Destination Office";
    } else if (package.location.currentLocation !== package.location.source) {
      package.status = "In Transit";
    } else if (package.location.currentLocation === package.location.source) {
      package.status = "At Source Office";
    }
    package.save();

    return res
      .status(200)
      .json({ message: "Updated Package Successfully", package });
  } catch (error) {
    next(error);
  }
}

async function getPackage(req, res, next) {
  try {
    const { packageId } = req.params;

    const foundPackage = await Package.findOne({ packageId })
      .populate("serviceId")
      .populate("userId")
      .exec();
    if (!foundPackage) throw Boom.badRequest("Package with given id not found");

    return res.status(200).json(foundPackage);
  } catch (error) {
    next(error);
  }
}

async function getUserPackages(req, res, next) {
  try {
    const { _id } = req.user;

    const foundPackages = await Package.find({
      userId: _id,
    })
      .populate("userId")
      .populate("serviceId")
      .exec();

    return res.status(200).json(foundPackages);
  } catch (error) {
    next(error);
  }
}

function generateRandomNo() {
  return Math.floor(Math.random() * 90000000 + 10000000);
}

module.exports = {
  sendPackage,
  updatePackageLocation,
  getPackage,
  getUserPackages,
};
