const { Car } = require("../models/car");
const { Repair } = require("../models/repair");

module.exports = async function (req, res, next) {
    const repair = await Repair.findById(req.params.repairUuid);
    if (!repair || repair.car_id.toHexString() !== req.car._id.toHexString())
        return res.status(404).send("Repair not found.");
        
    req.repair = repair;

    next();
};
