const mongoose = require("mongoose");

module.exports = function () {
    const db = process.env.MONGODB_URL;
    mongoose.connect(db).then(() => console.log(`Connected to ${db}...`));
};
