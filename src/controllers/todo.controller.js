const todoService = require("../services/todo.service");

class TodoController {
  async getAll(req, reply) {
    reply.send(await todoService.getAllTodos());
  }
  async create(req, reply) {
    reply.code(201).send(await todoService.createTodo(req.body));
  }
  async update(req, reply) {
    reply.send(await todoService.updateTodo(req.params.id, req.body));
  }
  async delete(req, reply) {
    await todoService.deleteTodo(req.params.id);
    reply.code(204).send();
  }
}

module.exports = new TodoController();
