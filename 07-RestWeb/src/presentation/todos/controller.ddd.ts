import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodosController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();

    res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (!this.checkIsNumber(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }
    try {
      const todo = await this.todoRepository.findById(id);
      res.json(todo);
    } catch (error) {
      res.status(404).json({ message: `Todo with id ${id} not found` });
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDTO] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ message: error });

    const todo = await this.todoRepository.create(createTodoDTO!);

    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = req.params.id;
    const [error, updateTodoDTO] = UpdateTodoDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });

    const todo = await this.todoRepository.updateById(updateTodoDTO!);

    res.json(todo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (!this.checkIsNumber(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }

    const todo = await this.todoRepository.deleteById(id);

    todo
      ? res.json(todo)
      : res.status(404).json({ message: `Todo with id ${id} not found` });
  };

  private checkIsNumber = (num: any) => {
    if (isNaN(num)) {
      return false;
    }
    return true;
  };
}
