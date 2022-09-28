const authRouter = require("./auth.routes");
const carRouter = require("./car.routes");
const repairRouter = require("./repair.routes");

module.exports = function (app) {
    app.use("/api/auth", authRouter);
    app.use("/api/cars/:carUuid/repairs", repairRouter);
    app.use("/api/cars", carRouter);
};
