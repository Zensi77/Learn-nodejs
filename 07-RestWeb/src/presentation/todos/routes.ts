import { Router } from "express";
import { TodosController } from "./controller";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    const todosController = new TodosController();

    router.get("/", todosController.getTodos);
    router.get("/:id", todosController.getTodoById);
    router.post("/", todosController.createTodo);
    router.put("/:id", todosController.updateTodo);

    return router;
  }
}
