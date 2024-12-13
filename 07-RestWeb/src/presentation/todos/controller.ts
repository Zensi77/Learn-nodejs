import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import {
  CreateTodo,
  CustomError,
  DeleteTodo,
  GetTodo,
  GetTodos,
  TodoRepository,
  UpdateTodo,
} from "../../domain";

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  private handleError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
  };

  public getTodos = (req: Request, res: Response) => {
    new GetTodos(this.todoRepository)
      .execute()
      .then((todos) => res.json(todos))
      .catch((error) => this.handleError(res, error));
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (!this.checkIsNumber(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }

    new GetTodo(this.todoRepository)
      .execute(id)
      .then((todo) => {
        res.json(todo);
      })
      .catch((error) => this.handleError(res, error));
  };

  public createTodo = (req: Request, res: Response) => {
    const [error, createTodoDTO] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ message: error });

    new CreateTodo(this.todoRepository)
      .execute(createTodoDTO!)
      .then((todo) => res.status(201).json(todo))
      .catch((error) => this.handleError(res, error));
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = req.params.id;
    const [error, updateTodoDTO] = UpdateTodoDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });

    new UpdateTodo(this.todoRepository)
      .execute(updateTodoDTO!)
      .then((todo) => res.json(todo))
      .catch((error) => this.handleError(res, error));
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (!this.checkIsNumber(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }

    new DeleteTodo(this.todoRepository)
      .execute(id)
      .then((todo) => {
        res.json(todo);
      })
      .catch((error) => this.handleError(res, error));
  };

  private checkIsNumber = (num: any) => {
    if (isNaN(num)) {
      return false;
    }
    return true;
  };
}
