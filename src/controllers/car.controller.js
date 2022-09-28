const { Car, validateCar } = require("../models/car");
const _ = require("lodash");
const Joi = require("joi");

async function index(req, res, next) {
    let cars = await Car.find({ user_id: req.user._id });

    cars = cars.map((car) => {
        return {
            uuid: car._id,
            name: car.name,
            milage: car.milage,
        };
    });

    res.send({
        cars: cars,
    });
}

async function store(req, res, next) {
    const { error } = validateCar(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const car = new Car({
        name: req.body.name,
        milage: req.body.milage,
        user_id: req.user._id,
    });
    await car.save();

    res.send({
        car: {
            uuid: car._id,
            name: car.name,
            milage: car.milage,
        },
    });
}

async function update(req, res, next) {
    const car = req.car;

    const { error } = validateCar(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    car.set({
        name: req.body.name,
        milage: req.body.milage,
    });
    await car.save();

    res.send({
        car: {
            uuid: car._id,
            name: car.name,
            milage: car.milage,
        },
    });
}

async function destroy(req, res, next) {
    const car = req.car;

    await Car.deleteOne({ _id: car._id });

    res.status(200).send("ok");
}

module.exports = {
    index,
    store,
    update,
    destroy,
};
