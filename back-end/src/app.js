const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.get("/", (req, res) => {
    res.send({message: "Servidor rodando, tudo ok!"});
});

require("./App/Controllers/authController")(app);
require("./App/Controllers/userController")(app);
require("./App/Controllers/tasksController")(app);

app.listen(8080);