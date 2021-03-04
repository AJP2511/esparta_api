const router = require("express").Router();
const Todo = require("../schema/tarefaSchema");

router.get("/todos", async (req, res) => {
  try {
    const { filtro } = req.query;
    if (filtro) {
      const re = new RegExp(filtro);
      const allTodos = await Todo.find();

      const outputQuery = [];

      allTodos.map((todo) => {
        if (re.test(todo.description)) {
          outputQuery.push(todo);
        }
      });

      return res.json(outputQuery);
    }

    const todo = await Todo.find();

    return res.json(todo);
  } catch (err) {
    return res.status(400).send({ error: "Erro ao requisitar dados da API" });
  }
});

router.post("/todos", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);

    return res.status(200).send({error: "none"});
  } catch (err) {
    return res.status(400).send({ error: "Erro ao criar uma nova tarefa" });
  }
});

router.put("/todos/:id", async (req, res) => {
  try {
    const { description } = req.body;

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        description,
      },
      { new: true }
    );

    if (todo === null)
      return res.status(400).send({ error: "Tarefa inexistente" });

    return res.json(todo);
  } catch (err) {
    return res.status(400).send({ error: "Erro ao editar a tarefa" });
  }
});

router.delete("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndRemove(req.params.id, (err, doc) => {
      if (err)
        return res
          .status(400)
          .send({ error: "Tarefa não encontrada ou já deletada" });
      return res.json(doc);
    });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao deletar a tarefa." });
  }
});

module.exports = (app) => app.use("/api", router);
