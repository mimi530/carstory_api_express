const mongoose = require("mongoose");

module.exports = function () {
    const url = process.env.MONGODB_URL;
    mongoose.connect(url).then(() => console.log(`Connected to ${url}...`));
};
