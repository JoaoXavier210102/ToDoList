const mongoose = require("mongoose");

const url = "mongodb+srv://root:8HxRTl2N8P3nb4IS@todolist.0fvwx.mongodb.net/ToDoList?retryWrites=true&w=majority"

mongoose.connect(url);
mongoose.Promise = global.Promise;

module.exports = mongoose;