import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repositories/log.repository";

export class LogRepositoryImpl implements LogRepository {
  constructor(private readonly logdataSource: LogDataSource) {}

  saveLog(log: LogEntity): Promise<void> {
    return this.logdataSource.saveLog(log);
  }
  getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
    return this.logdataSource.getLogs(severityLevel);
  }
}
