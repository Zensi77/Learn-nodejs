import { prisma } from "../../data/postgres";
import {
  CreateTodoDto,
  CustomError,
  TodoDataSource,
  TodoEntity,
  UpdateTodoDto,
} from "../../domain";

export class TodoDatasourceImplementation implements TodoDataSource {
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({
      data: createTodoDto!,
      // select sirve para seleccionar los campos que se quieren devolver en la respuesta
    });

    return TodoEntity.fromObject(todo);
  }

  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map((todo) => TodoEntity.fromObject(todo));
  }

  async findById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({
      where: {
        id: id,
      },
    });
    if (!todo) {
      throw new CustomError(`Task not found with id ${id}`, 404);
    }

    return TodoEntity.fromObject(todo);
  }

  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.findById(updateTodoDto.id);

    const updatedTodo = await prisma.todo.update({
      data: updateTodoDto!.values,
      where: {
        id: updateTodoDto.id,
      },
    });

    return TodoEntity.fromObject(updatedTodo);
  }

  async deleteById(id: number): Promise<TodoEntity> {
    await this.findById(id);

    const todo = await prisma.todo.delete({
      where: {
        id: id,
      },
    });

    return TodoEntity.fromObject(todo);
  }
}
