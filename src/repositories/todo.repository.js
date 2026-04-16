const Todo = require("../models/todo.model");

class TodoRepository {
  async findAll() {
    return await Todo.find();
  }
  async create(data) {
    return await Todo.create(data);
  }
  async update(id, data) {
    return await Todo.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id) {
    return await Todo.findByIdAndDelete(id);
  }
}

module.exports = new TodoRepository();
