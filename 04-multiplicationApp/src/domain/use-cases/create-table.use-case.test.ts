import { CreateTable } from "./create-table.use-case";
describe("CreatetableUseCase", () => {
  test("should return a table", () => {
    const createTable = new CreateTable();

    const table = createTable.execute({ base: 2 });
    const rows = table.split("\n").length;

    expect(createTable).toBeInstanceOf(CreateTable);
    expect(rows).toBe(11);
  });

  test("Create table with a custom values", () => {
    const createTable = new CreateTable();
    const table = createTable.execute({ base: 2, limit: 20 });

    const rows = table.split("\n").length;
    expect(createTable).toBeInstanceOf(CreateTable);
    expect(rows).toBe(21);
  });
});
