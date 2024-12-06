import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
  name: string;
  destination: string;
}

export class ServerApp {
  static run({ base, limit, showTable, name, destination }: RunOptions) {
    console.log("Server is running");

    // 1er caso de uso
    const table = new CreateTable().execute({ base, limit });

    // 2do caso de uso
    const wasCreated = new SaveFile().execute({
      fileContent: table,
      fileName: name,
      destination: destination,
    });

    showTable ? console.log(table) : null;
    wasCreated
      ? console.log("File was created")
      : console.log("File was not created");
  }
}
