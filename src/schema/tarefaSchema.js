const mongoose = require("../server/database");

const TarefaSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model("Todo", TarefaSchema);

module.exports = Todo;
