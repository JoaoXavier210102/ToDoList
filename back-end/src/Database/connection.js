const mongoose = require("mongoose");

const url = "Place the URL connection database here"

mongoose.connect(url);
mongoose.Promise = global.Promise;

module.exports = mongoose;