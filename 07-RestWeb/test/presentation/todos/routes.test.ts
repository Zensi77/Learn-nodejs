import request from "supertest";
import { testServer } from "../../test-server";
import { prisma } from "../../../src/data/postgres";
import { text } from "stream/consumers";
import exp from "constants";

describe("Todos routes", () => {
  beforeAll(async () => {
    await testServer.start();
  });

  afterAll(() => {
    testServer.close();
  });

  afterEach(async () => {
    await prisma.todo.deleteMany({});
  });

  const todo1 = { text: "Todo 1" };
  const todo2 = { id: 2, text: "Todo 2", completedAt: null };

  test("Should return todos /api/todos", async () => {
    await prisma.todo.createMany({
      data: [todo1, todo2],
    });

    const { body } = await request(testServer.app)
      .get("/api/todos/")
      .expect(200);

    expect(body).toHaveLength(2);
    expect(body[0].text).toBe(todo1.text);
    expect(body[0].completedAt).toBeNull();
  });

  test("Should return todos /api/todos/:id", async () => {
    const todo = await prisma.todo.create({
      data: todo1,
    });

    const { body } = await request(testServer.app)
      .get(`/api/todos/${todo.id}`)
      .expect(200);

    expect(body.text).toBe(todo1.text);
  });

  test("Should return a 404 /api/todos/:id", async () => {
    const id = 99999999;

    const { body } = await request(testServer.app)
      .get(`/api/todos/${id}`)
      .expect(404);

    expect(body).toEqual({ message: `Task not found with id ${id}` });
  });

  test("Should return a new todo", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos/")
      .send(todo1)
      .expect(201);

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo1.text,
      completedAt: null,
    });
  });

  test("Should return a error if todo is not valid", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos/")
      .send({})
      .expect(400);

    expect(body).toEqual({ message: "Title is required" });
  });

  test("Should return a error if text is not valid", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos/")
      .send({ text: "" })
      .expect(400);

    expect(body).toEqual({ message: "Title is required" });
  });

  test("Should return a updated todo api/todo/:id", async () => {
    const todo = await prisma.todo.create({ data: todo1 });

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send({ text: "Updated", completedAt: "2000-09-19" })
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      text: "Updated",
      completedAt: "2000-09-19T00:00:00.000Z",
    });
  });

  test("Should return a 404 if todo not found", async () => {
    const todo = await prisma.todo.create({ data: todo1 });

    const { body } = await request(testServer.app)
      .put(`/api/todos/999`)
      .send({
        text: "Updated",
        completedAt: "2000-09-19",
      })
      .expect(404);

    expect(body).toEqual({
      message: "Task not found with id 999",
    });
  });

  test("Should return and updated todo only the date updated", async () => {
    const todo = await prisma.todo.create({ data: todo1 });

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send({ completedAt: new Date() })
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo.text,
      completedAt: expect.any(String),
    });
  });

  test("Should delete a TODO api/todos/:id", async () => {
    const todo = await prisma.todo.create({ data: todo1 });

    const { body } = await request(testServer.app)
      .delete(`/api/todos/${todo.id}`)
      .expect(200);

    expect(body).toEqual({
      id: todo.id,
      text: todo.text,
      completedAt: null,
    });
  });

  test("Should return 404 if todo not exists", async () => {
    const todo = await prisma.todo.create({ data: todo1 });

    const { body } = await request(testServer.app)
      .delete(`/api/todos/99999`)
      .expect(404);

    expect(body).toEqual({
      message: "Task not found with id 99999",
    });
  });
});
