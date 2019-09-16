const express = require("express");
const todoController = require("../controller/todo.controller");
const router = express.Router();

router.post("/", todoController.createTodo);
router.get("/", todoController.getTodos);

module.exports = router;