import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDatasourceImplementation } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructure/repository/todo.repository.impl";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();

    const todoDataSource = new TodoDatasourceImplementation();
    const todoRepository = new TodoRepositoryImpl(todoDataSource);

    const todosController = new TodosController(todoRepository);

    router.get("/", todosController.getTodos);
    router.get("/:id", todosController.getTodoById);
    router.post("/", todosController.createTodo);
    router.put("/:id", todosController.updateTodo);
    router.delete("/:id", todosController.deleteTodo);

    return router;
  }
}
