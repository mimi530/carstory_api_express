const { Car } = require("../models/car");

module.exports = async function (req, res, next) {
    const car = await Car.findById(req.params.carUuid);
    if (!car || car.user_id.toHexString() !== req.user._id) 
        return res.status(404).send("Car not found.");

    req.car = car;
    
    next();
};
