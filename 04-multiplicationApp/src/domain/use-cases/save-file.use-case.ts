import fs from "fs";

export interface SaveFileUseCase {
  execute: (options: Options) => void;
}

export interface Options {
  fileContent: string;
  destination?: string;
  fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
  // DI -> Dependency Injection
  constructor() {}

  execute({
    fileContent,
    destination = "outputs",
    fileName = "table",
  }: Options) {
    try {
      if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true }); // Si no existe la carpeta, la crea de manera recursiva
      }

      fs.writeFileSync(`${destination}/${fileName}.txt`, fileContent);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
