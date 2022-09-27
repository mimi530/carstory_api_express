const authRouter = require("./auth.routes");

module.exports = function (app) {
    app.use("/api/auth/", authRouter);
};
