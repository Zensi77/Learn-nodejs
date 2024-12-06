import { Request, Response } from "express";

const todos = [
  {
    id: 1,
    title: "Learn TypeScript",
    completed: true,
  },
  {
    id: 2,
    title: "Learn Node.js",
    completed: false,
  },
  {
    id: 3,
    title: "Learn Express.js",
    completed: false,
  },
  {
    id: 4,
    title: "Learn Nest.js",
    completed: false,
  },
  {
    id: 5,
    title: "Learn JavaScript",
    completed: true,
  },
];

export class TodosController {
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (!this.checkIsNumber(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }

    const todo = todos.find((todo) => todo.id === id);

    (todo && res.json(todo)) ||
      res.status(404).json({ message: "Task not found" });
  };

  public createTodo = (req: Request, res: Response) => {
    const { id = todos.length + 1, title, completed = false } = req.body;
    if (!title) {
      res.status(400).json({ message: "Title is required" });
      return;
    }
    todos.push({ id, title, completed });
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = req.params.id;
    if (!this.checkIsNumber(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }

    const todo = todos.find((todo) => todo.id === +id);
    if (!todo) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    const { title, completed } = req.body;
    if (!title) {
      res.status(400).json({ message: "Title is required" });
      return;
    }
    todo.title = title;
    completed || (todo.completed = completed);

    //! Por referencia
    todos.forEach((todo, index) => {
      if (todo.id === +id) {
        todos[index] = todo; // Actualiza el valor en el array original
      }
    });

    res.json(todo);
  };

  publicDeleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (!this.checkIsNumber(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }

    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    todos.splice(todos.indexOf(todo), 1);

    res.json({ message: "Task deleted" });
  };

  private checkIsNumber = (num: any) => {
    if (isNaN(num)) {
      return false;
    }
    return true;
  };
}
