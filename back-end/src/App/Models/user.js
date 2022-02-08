const mongoose = require("../../Database/connection");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    avatar: {
        type: String,
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;