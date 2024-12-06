import { SaveFile } from "./save-file.use-case";
import fs from "fs";

describe("SaveFileUseCase", () => {
  // Scope global para que sea accesible en todos los test cases
  const options = {
    fileContent: "Hello World",
    destination: "custom-output/customDestination",
    fileName: "custom-file",
  };

  // Ciclo de vida de Jest que se ejecuta antes de cada test case
  beforeEach(() => {
    fs.rmSync("outputs", { recursive: true, force: true });
  });

  afterEach(() => {
    fs.rmSync("outputs", { recursive: true, force: true });
  });
  test("should save a file with default values", () => {
    const saveFile = new SaveFile();
    const filePath = "outputs/table.txt";
    const options = {
      fileContent: "Hello World",
    };

    const res = saveFile.execute(options);
    const checkFile = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    expect(res).toBeTruthy();
    expect(checkFile).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });

  test("should save a file with custom values", () => {
    const res = new SaveFile().execute(options);
    const checkFile = fs.existsSync(
      `${options.destination}/${options.fileName}.txt`
    );
    const fileContent = fs.readFileSync(
      `${options.destination}/${options.fileName}.txt`,
      "utf-8"
    );

    expect(res).toBeTruthy();
    expect(checkFile).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });

  test("Directory not be created", () => {
    const saveFile = new SaveFile();

    // Mock para simular que el directorio no existe
    const existsSyncSpy = jest.spyOn(fs, "existsSync").mockReturnValue(false);

    // Mock para simular un error al crear el directorio
    const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("Error");
    });

    const res = saveFile.execute(options);

    expect(res).toBeFalsy();

    // Restaurar el mock
    mkdirSpy.mockRestore();
    existsSyncSpy.mockRestore();
  });

  test("File not be created", () => {
    const saveFile = new SaveFile();
    // Mock para simular un error al crear el archivo
    const writeFileSyncSpy = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {
        throw new Error("Error");
      });

    const res = saveFile.execute(options);

    expect(res).toBeFalsy();

    // Restaurar el mock
    writeFileSyncSpy.mockRestore();
  });
});
