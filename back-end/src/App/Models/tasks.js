const { trusted } = require("mongoose");
const mongoose = require("../../Database/connection");

const TaskSchema = new mongoose.Schema({
    idUser: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Tasks = mongoose.model("Task", TaskSchema);

module.exports = Tasks;