import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodosController {
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (!this.checkIsNumber(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }

    const todo = await prisma.todo.findFirst({
      where: {
        id: id,
      },
    });

    // Si el todo existe, se devuelve, de lo contrario, se devuelve un mensaje de error
    (todo && res.json(todo)) ||
      res.status(404).json({ message: "Task not found" });
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDTO] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ message: error });

    const todo = await prisma.todo.create({
      data: createTodoDTO!,
      // select sirve para seleccionar los campos que se quieren devolver en la respuesta
    });

    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = req.params.id;
    const [error, updateTodoDTO] = UpdateTodoDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });

    const todo = await prisma.todo.update({
      data: updateTodoDTO!.values,
      where: {
        id: +id,
      },
    });

    res.json(todo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (!this.checkIsNumber(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }

    const todo = await prisma.todo.delete({
      where: {
        id: id,
      },
    });

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
