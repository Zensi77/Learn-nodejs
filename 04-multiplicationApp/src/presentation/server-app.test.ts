import { ServerApp } from "./server-app";
import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";
import { Server } from "http";

describe("Server App", () => {
  const options = {
    base: 3,
    limit: 5,
    showTable: true,
    name: "Table",
    destination: "./outputs",
  };

  beforeEach(() => {
    jest.clearAllMocks(); // limpia jest.spyOn
  });

  test("should run the server", () => {
    const serverApp = new ServerApp();

    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });

  test("should run ServerApp with options", () => {
    const logSpy = jest.spyOn(console, "log");
    const createTableSpy = jest.spyOn(CreateTable.prototype, "execute"); // prototype es para espiar el método de la clase
    const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute");

    ServerApp.run(options);

    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(logSpy).toHaveBeenCalledWith("Server is running");
    expect(logSpy).toHaveBeenLastCalledWith("File was created");

    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });

    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String), // cualquier string
      fileName: options.name,
      destination: options.destination,
    });
  });

  test("should with custom values mocks", () => {
    // Creo funciones ficticias que se ejecutarán en lugar de las originales
    const logMock = jest.fn();
    const errorMock = jest.fn();
    const createMock = jest.fn().mockReturnValue("1 x 1 = 1");
    const saveFile = jest.fn().mockReturnValue(true);

    // Estos mocks se ejecutarán en lugar de los métodos originales
    console.log = logMock;
    console.error = errorMock;
    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveFile;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledTimes(3);
    expect(createMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });

    expect(saveFile).toHaveBeenCalledWith({
      fileContent: "1 x 1 = 1",
      fileName: options.name,
      destination: options.destination,
    });

    expect(logMock).toHaveBeenCalledWith("File was created");
    expect(errorMock).not.toHaveBeenCalled();
  });
});
