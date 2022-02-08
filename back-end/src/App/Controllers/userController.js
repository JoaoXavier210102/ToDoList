const express = require("express");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/auth.json");
const router = express.Router();

const User = require("../Models/user");

const verifyToken = (req, res, next) => {
    const token = req.headers["access-token"];
    jwt.verify(token, secret, (error, decoded) => {
        if (error) {
            return res.status(401).send({ message: "Usuário não autenticado!" });
        }

        req.userId = decoded.userId;

        next();
    })
}

router.get("/user", verifyToken, async (req, res) => {

    try {
        const id = req.userId;
    
        const user = await User.findById(id);

        res.status(200).send({ user });
    } catch (error) {
        res.status(400).send({ message: "Error!", error });
    }

});

module.exports = app => app.use(router);