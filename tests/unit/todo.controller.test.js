const todo_controller = require('../../controller/todo.controller');
const todoModel = require('../../model/todo.model');
const httpMocks = require('node-mocks-http');
const newTodos = require('../mock-data/new-todo.json')
const allTodos = require('../mock-data/all-todos.json')

todoModel.create = jest.fn()//mock function for overriding actual mongoose.create function
todoModel.find = jest.fn()

let req,res,next;

beforeEach(()=>{
    req =  httpMocks.createRequest()//mock data
    res = httpMocks.createResponse()//mock data
    next = jest.fn();
})

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


