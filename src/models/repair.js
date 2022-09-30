const Joi = require("joi");
const mongoose = require("mongoose");

const repairSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 255,
    },
    description: {},
    milage: {
        type: Number,
    },
    date: {
        type: Date,
    },
    car_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: true,
    },
});

const Repair = mongoose.model("Repair", repairSchema);

function validateRepair(repair) {
    const schema = Joi.object({
        title: Joi.string().max(255).required(),
        milage: Joi.number(),
        description: Joi.string().empty(''),
        date: Joi.date(),
    });
    return schema.validate(repair);
}

exports.Repair = Repair;
exports.validateRepair = validateRepair;
