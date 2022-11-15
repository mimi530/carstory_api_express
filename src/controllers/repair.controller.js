const { Repair, validateRepair } = require("../models/repair");
const dayjs = require("dayjs");

async function index(req, res, next) {
    let repairs = await Repair.find({ car_id: req.car._id });

    repairs = repairs.map((repair) => {
        return {
            uuid: repair._id,
            title: repair.title,
            milage: repair.milage,
            description: repair.description === "" ? null : repair.description,
            date: dayjs(repair.date).format("YYYY-MM-DD"),
        };
    });

    res.send({
        repairs: repairs,
    });
}

async function store(req, res, next) {
    const { error } = validateRepair(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const repair = new Repair({
        title: req.body.title,
        milage: req.body.milage,
        description: req.body.description,
        date: req.body.date,
        car_id: req.car._id,
    });
    await repair.save();

    res.send({
        repair: {
            uuid: repair._id,
            title: repair.title,
            milage: repair.milage,
            description: repair.description,
            date: repair.date,
        },
    });
}

async function update(req, res, next) {
    const repair = req.repair;

    const { error } = validateRepair(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    repair.set({
        title: req.body.title,
        milage: req.body.milage,
        milage: req.body.milage,
        description: req.body.description,
        date: req.body.date,
    });
    await repair.save();

    res.send({
        repair: {
            uuid: repair._id,
            title: repair.title,
            milage: repair.milage,
            description: repair.description,
            date: repair.date,
        },
    });
}

async function destroy(req, res, next) {
    const repair = req.repair;

    await Repair.deleteOne({ _id: repair._id });

    res.status(200).send("ok");
}

module.exports = {
    index,
    store,
    update,
    destroy,
};
