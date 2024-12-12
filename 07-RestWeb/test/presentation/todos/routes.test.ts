import request from "supertest";
import { testServer } from "../../test-server";
import { prisma } from "../../../src/data/postgres";
import { text } from "stream/consumers";

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

  const todo1 = { id: 1, text: "Todo 1" };
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
    await prisma.todo.create({
      data: todo1,
    });

    const { body } = await request(testServer.app)
      .get(`/api/todos/1`)
      .expect(200);

    expect(body.text).toBe(todo1.text);
  });

  test("Should return a 404 /api/todos/:id", async () => {
    const id = 99999999;

    const { body } = await request(testServer.app)
      .get(`/api/todos/${id}`)
      .expect(404);

    expect(body).toEqual({ message: "Task not found" });
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

  test("Should return a updated todo api/todo/:id", async () => {});
});
