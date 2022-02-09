const express = require("express");
const router = express.Router();

const Tasks = require("../Models/tasks");

//Rota para adicionar tarefas
router.post("/add", async (req, res) => {

    const title = req.body.title

    try {

        if (await Tasks.findOne({ title })) {
            return res.status(400).send({ message: "já existe tarefa com esse título!" });
        }

        let taskCreate = {
            idUser: req.body.idUser,
            title: title,
            description: req.body.description
        }

        const task = await Tasks.create(taskCreate);

        return res.status(201).send({ message: "Sucesso ao adicionar Tarefa!" });

    } catch (error) {
        return res.status(400).send({ message: `Falha ao criar tarefa!, ${error}` });
    }
})

//Rota para pegar todas as tarefas do usuário
router.get("/:user", async (req, res) => {

    const id = req.params.user;

    try {

        Tasks.find({}, (err, task) => {

            let arraytasks = [];
            task.forEach((item) => {
                if (id === item.idUser) {
                    arraytasks.push(item);
                }

            })

            return res.status(200).send(arraytasks);

        })

    } catch (error) {
        return res.status(400).send({ message: `Falha ao listar tarefas!, ${error}` });
    }

})

//Rota para modificar o status da tarefa
router.put("/status/", async (req, res) => {

    const { idTask, value } = req.body

    try {

        await Tasks.findByIdAndUpdate(idTask, { status: value })

        return res.status(201).send({ message: "Sucesso ao modificar Tarefa!" });

    } catch (error) {
        return res.status(400).send({ message: `Falha ao modificar tarefa!, ${error}` });
    }

});

//Rota para deletar tarefa
router.delete("/delete/:idTask", async (req, res) => {
    const {idTask} = req.params;

    try {

        if(!(await Tasks.findById(idTask))){
            res.status(400).send({message: "Não existe tarefa com esse ID"})
        }

        await Tasks.deleteOne({_id: idTask})

        return res.status(200).send({message: "Sucesso ao deletar Tarefa!"});

    } catch (error) {
        return res.status(400).send({ message: `Falha ao deletar tarefas!, ${error}` });
    }
});


module.exports = app => app.use("/task", router);