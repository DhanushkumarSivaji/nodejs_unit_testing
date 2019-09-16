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