import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import {
  CreateTodo,
  DeleteTodo,
  GetTodo,
  GetTodos,
  TodoRepository,
  UpdateTodo,
} from "../../domain";

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = (req: Request, res: Response) => {
    new GetTodos(this.todoRepository)
      .execute()
      .then((todos) => res.json(todos))
      .catch((error) => res.status(400).json({ message: error.message }));
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
      .catch((error) => res.status(404).json({ message: error.message }));
  };

  public createTodo = (req: Request, res: Response) => {
    const [error, createTodoDTO] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ message: error });

    new CreateTodo(this.todoRepository)
      .execute(createTodoDTO!)
      .then((todo) => res.status(201).json(todo))
      .catch((error) => res.status(400).json({ message: error.message }));
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = req.params.id;
    const [error, updateTodoDTO] = UpdateTodoDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });

    new UpdateTodo(this.todoRepository)
      .execute(updateTodoDTO!)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ message: error.message }));
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
      .catch((error) => res.status(404).json({ message: error.message }));
  };

  private checkIsNumber = (num: any) => {
    if (isNaN(num)) {
      return false;
    }
    return true;
  };
}
