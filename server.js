const http = require("http");

let todos = [];
let idCounter = 1;

const server = http.createServer((req, res) => {
  // Solo permitimos respuestas en formato JSON
  res.setHeader("Content-Type", "application/json");

  // GET /api/todos (Sirve para listar todas las tareas)
  if (req.url === "/api/todos" && req.method === "GET") {
    res.writeHead(200);
    res.end(JSON.stringify(todos));
  }

  // POST /api/todos (Sirve para crear una nueva tarea)
  else if (req.url === "/api/todos" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const data = JSON.parse(body);
      const newTodo = {
        id: idCounter++,
        title: data.title,
        description: data.description || "",
        date: data.date || "",
        completed: false,
      };
      todos.push(newTodo);
      res.writeHead(201);
      res.end(JSON.stringify(newTodo));
    });
  }

  // PUT /api/todos/:id (Sirve para actualizar tarea existente usando su identificador)
  else if (req.url.match(/\api\/todos\/([0-9]+)/) && req.method === "PUT") {
    const id = parseInt(req.url.split("/")[3]);
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const index = todos.findIndex((t) => t.id === id);
      if (index !== -1) {
        const data = JSON.parse(body);
        // Actualizamos la tarea seleccionada combinando los campos existentes con los nuevos
        todos[index] = { ...todos[index], ...data, id: id };
        res.writeHead(200);
        res.end(JSON.stringify(todos[index]));
      } else {
        res.writeHead(404);
        res.end(
          JSON.stringify({
            error: "Tarea no encontrada",
          }),
        );
      }
    });
  }

  // DELETE /api/todos/:id (Sirve para eliminar una tarea específica)
  else if (req.url.match(/\api\/todos\/([0-9]+)/) && req.method === "DELETE") {
    const id = parseInt(req.url.split("/")[3]);
    const index = todos.findIndex((t) => t.id === id);
    if (index !== -1) {
      todos.splice(index, 1);
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404);
      res.end(
        JSON.stringify({
          error: "Tarea no encontrada",
        }),
      );
    }
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Ruta no encontrada" }));
  }
});

server.listen(3000, () => {
  console.log("Servidor nativo ejecutándose en http://localhost:3000");
});
