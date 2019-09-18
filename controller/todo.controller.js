const todoModel = require('../model/todo.model')

exports.createTodo =async(req,res,next) => {
    try{
        const createdModel = await todoModel.create(req.body)
        res.status(200).json(createdModel)
    }catch(err){
        next(err);
    }
    
}

exports.getTodos = async (req, res, next) => {
    try {
      const allTodos = await todoModel.find({});
      res.status(200).json(allTodos);
    } catch (err) {
      next(err);
    }
  };

  exports.getTodoById = async (req, res, next) => {
    try {
      const todosModel = await todoModel.findById(req.params.todoId);
      if (todosModel) {
        res.status(200).json(todosModel);
      } else {
        res.status(404).send();
      }
    } catch (err) {
      next(err);
    }
  
  };

  exports.updateTodo = async (req, res, next) => {
    try {
      const updatedTodo = await todoModel.findByIdAndUpdate(
        req.params.todoId,
        req.body,
        {
          new: true,
          useFindAndModify: false
        }
      );
      if (updatedTodo) {
        res.status(200).json(updatedTodo);
      } else {
        res.status(404).send();
      }
    } catch (err) {
      next(err);
    }
  };


  exports.deleteTodo = async (req, res, next) => {
    try {
      const deletedTodo = await todoModel.findByIdAndDelete(req.params.todoId);
  
      if (deletedTodo) {
        res.status(200).json(deletedTodo);
      } else {
        res.status(404).send();
      }
    } catch (err) {
      next(err);
    }
  };