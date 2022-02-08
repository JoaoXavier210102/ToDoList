const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {secret} = require("../config/auth.json");

const User = require("../Models/user");

const router = express.Router();

router.post("/register", async (req, res) => {

    const email = req.body.email;

    try {

        if (await User.findOne({ email })) {
            return res.status(400).send({ message: "Usuário já registrado" })
        }


        bcrypt.hash(req.body.password, 10, async (error, hash) => {
            if (error) {
                return res.status(500).send({ error: error });
            }

            let userCreate = {
                name: req.body.name,
                email: req.body.email,
                password: hash
            }

            const user = await User.create(userCreate);

            user.password = undefined;

            return res.status(201).send({ user });
        })

    } catch (error) {
        return res.status(400).send({ message: `Falha ao se registrar, ${error}` });
    }
});

router.post("/authenticate", async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).send({ message: "Usuário não encontrado" });
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).send({ message: "Senha inválida" });
        }

        user.password = undefined;

        const token = jwt.sign({userId: user._id}, secret, {expiresIn: 86400});

        res.send({ user, token });

    } catch (error) {
        return res.status(401).send({ message: `Falha ao entrar, ${error}` });
    }


})

module.exports = app => app.use("/auth", router);