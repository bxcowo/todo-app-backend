const todoRepository = require("../repositories/todo.repository");

class TodoService {
  async getAllTodos() {
    return await todoRepository.findAll();
  }
  async createTodo(data) {
    if (!data.title) {
      throw new Error("El título de la tarea es obligatorio");
    }
    return await todoRepository.create(data);
  }
  async updateTodo(id, data) {
    return await todoRepository.update(id, data);
  }
  async deleteTodo(id) {
    return await todoRepository.delete(id);
  }
}

module.exports = new TodoService();
