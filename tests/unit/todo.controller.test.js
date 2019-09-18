const todo_controller = require('../../controller/todo.controller');
const todoModel = require('../../model/todo.model');
const httpMocks = require('node-mocks-http');
const newTodos = require('../mock-data/new-todo.json')
const allTodos = require('../mock-data/all-todos.json')

jest.mock("../../model/todo.model");

let req,res,next;

const todoId = "5d5ecb5a6e598605f06cb945";

beforeEach(()=>{
    req =  httpMocks.createRequest()//mock data
    res = httpMocks.createResponse()//mock data
    next = jest.fn();
})


describe("TodoController.deleteTodo", () => {
    it("should have a deleteTodo function", () => {
      expect(typeof todo_controller.deleteTodo).toBe("function");
    });
    it("should call findByIdAndDelete", async () => {
      req.params.todoId = todoId;
      await todo_controller.deleteTodo(req, res, next);
      expect(todoModel.findByIdAndDelete).toBeCalledWith(todoId);
    });
    it("should return 200 OK and deleted todoModel", async () => {
      todoModel.findByIdAndDelete.mockReturnValue(newTodos);
      await todo_controller.deleteTodo(req, res, next);
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toStrictEqual(newTodos);
      expect(res._isEndCalled()).toBeTruthy();
    });
    it("should handle errors", async () => {
      const errorMessage = { message: "Error deleting" };
      const rejectedPromise = Promise.reject(errorMessage);
      todoModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
      await todo_controller.deleteTodo(req, res, next);
      expect(next).toHaveBeenCalledWith(errorMessage);
    });
    it("should handle 404", async () => {
      todoModel.findByIdAndDelete.mockReturnValue(null);
      await todo_controller.deleteTodo(req, res, next);
      expect(res.statusCode).toBe(404);
      expect(res._isEndCalled()).toBeTruthy();
    });
  });

describe("TodoController.updateTodo", () => {
    it("should have a updateTodo function", () => {
      expect(typeof todo_controller.updateTodo).toBe("function");
    });
    it("should update with TodoModel.findByIdAndUpdate", async () => {
      req.params.todoId = todoId;
      req.body = newTodos;
      await todo_controller.updateTodo(req, res, next);
  
      expect(todoModel.findByIdAndUpdate).toHaveBeenCalledWith(todoId, newTodos, {
        new: true,
        useFindAndModify: false
      });
    });
    it("should return a response with json data and http code 200", async () => {
      req.params.todoId = todoId;
      req.body = newTodos;
      todoModel.findByIdAndUpdate.mockReturnValue(newTodos);
      await todo_controller.updateTodo(req, res, next);
      expect(res._isEndCalled()).toBeTruthy();
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toStrictEqual(newTodos);
    });
    it("should handle errors", async () => {
      const errorMessage = { message: "Error" };
      const rejectedPromise = Promise.reject(errorMessage);
      todoModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
      await todo_controller.updateTodo(req, res, next);
      expect(next).toHaveBeenCalledWith(errorMessage);
    });
  });

describe("TodoController.getTodoById", () => {
    it("should have a getTodoById", () => {
      expect(typeof todo_controller.getTodoById).toBe("function");
    });
    it("should call TodoModel.findById with route parameters", async () => {
      req.params.todoId = todoId;
      await todo_controller.getTodoById(req, res, next);
      expect(todoModel.findById).toBeCalledWith(todoId);
    });
    it("should return json body and response code 200", async () => {
      todoModel.findById.mockReturnValue(newTodos);
      await todo_controller.getTodoById(req, res, next);
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toStrictEqual(newTodos);
      expect(res._isEndCalled()).toBeTruthy();
    });
    it("should do error handling", async () => {
      const errorMessage = { message: "error finding todoModel" };
      const rejectedPromise = Promise.reject(errorMessage);
      todoModel.findById.mockReturnValue(rejectedPromise);
      await todo_controller.getTodoById(req, res, next);
      expect(next).toHaveBeenCalledWith(errorMessage);
    });
  });

describe("TodoController.getTodos", () => {
    it("should have a getTodos function", () => {
      expect(typeof todo_controller.getTodos).toBe("function");
    });

    it("should call TodoModel.find({})", async () => {
      await todo_controller.getTodos(req, res, next);
      expect(todoModel.find).toHaveBeenCalledWith({});
    });

    it("should return response with status 200 and all todos", async () => {
      todoModel.find.mockReturnValue(allTodos);
      await todo_controller.getTodos(req, res, next);
      expect(res.statusCode).toBe(200);
      expect(res._isEndCalled()).toBeTruthy();
      expect(res._getJSONData()).toStrictEqual(allTodos);
    });
    it("should handle errors in getTodos", async () => {
      const errorMessage = { message: "Error finding" };
      const rejectedPromise = Promise.reject(errorMessage);
      todoModel.find.mockReturnValue(rejectedPromise);
      await todo_controller.getTodos(req, res, next);
      expect(next).toHaveBeenCalledWith(errorMessage);
    });
  });

describe('Todocontoller.createTodo',()=>{

    beforeEach(()=>{
        req.body = newTodos
    })

    it('should have a create todo function',()=>{
        expect(typeof todo_controller.createTodo).toBe("function");
    });

    it("should call todomodel.create",()=>{
        todo_controller.createTodo(req,res,next)
        expect(todoModel.create).toBeCalledWith(newTodos)
    })
    it("should return 201 resonse code",async ()=>{
        await todo_controller.createTodo(req,res,next)
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();//sending json response
    })
    it("should return json body in response",async()=>{
        todoModel.create.mockReturnValue(newTodos);
        await todo_controller.createTodo(req,res,next);
        expect(res._getJSONData()).toStrictEqual(newTodos) //If it should pass with deep equality, replace "toBe" with "toStrictEqual" because create method will create newTodos with diiferent memory reference. So we need to put toStrictEqual
    })
    it("should handle errors", async () => {
        const errorMessage = { message: "Done property missing" };
        const rejectedPromise = Promise.reject(errorMessage);
        todoModel.create.mockReturnValue(rejectedPromise);
        await todo_controller.createTodo(req, res, next);
        expect(next).toBeCalledWith(errorMessage);
      });
});


