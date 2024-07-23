const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/todolist", { useNewUrlParser: true });

const todolistSchema = new mongoose.Schema({
  text: String,
});

const Todo = mongoose.model("Todo", todolistSchema);

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });
    await todo.save();
    res.json(todo);
    }
);

app.delete("/todos/:id", async (req, res) => {
    const todo = await Todo.deleteOne({ _id: req.params.id });
    res.json(todo);
});

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
