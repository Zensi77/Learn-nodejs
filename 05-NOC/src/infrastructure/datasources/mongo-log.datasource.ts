import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";

export class MongoLogDataSource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log); // Esto ya crea y guarda el log en la base de datos
    console.log(newLog);
  }
  async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({ level: severityLevel });

    return logs.map(LogEntity.fromObject);
  }
}
