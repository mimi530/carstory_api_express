const Joi = require("joi");
const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 255
    },
    milage: {
        type: Number,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})

const Car = mongoose.model('Car', carSchema);

function validateCar(car) {
    const schema = Joi.object({
        name: Joi.string().max(255).required(),
        milage: Joi.number()
    })
    return schema.validate(car);
}

exports.Car = Car;
exports.validateCar = validateCar