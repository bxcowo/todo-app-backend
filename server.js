const Fastify = require("fastify");
const fastify = Fastify({ logger: true });

let todos = [];
let idCounter = 1;

// Get: Listar tareas
fastify.get("/api/todos", async (request, reply) => todos);

// POST: Crear tareas
fastify.post("/api/todos", async (request, reply) => {
  const { title, description, date } = request.body;
  const newTodo = {
    id: idCounter++,
    title,
    description: description || "",
    date: date || "",
    completed: false,
  };
  todos.push(newTodo);
  reply.code(201).send(newTodo);
});

// PUT: Actualizar tareas
fastify.put("/api/todos/:id", async (request, reply) => {
  const id = parseInt(request.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return reply.code(404).send({ error: "Tarea no encontrada" });
  }
  todos[index] = { ...todos[index], ...request.body, id };
  return todos[index];
});

// DELETE: Eliminar tareas
fastify.delete("/api/todos/:id", async (request, reply) => {
  const id = parseInt(request.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    return reply.code(404).send({ error: "Tarea no encontrada" });
  }
  todos.splice(index, 1);
  reply.code(204).send();
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
