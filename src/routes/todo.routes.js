const todoController = require('../controllers/todo.controller');

module.exports = async function (fastify, opts) {
  fastify.get('/', todoController.getAll);
  fastify.post('/', todoController.create);
  fastify.put('/:id', todoController.update);
  fastify.delete('/:id', todoController.delete);
}
