import { LogEntity, LogServerityLevel } from "../entities/log.entity";

// Interfaz que define los métodos que deben ser implementados por los datasources de logs
export abstract class LogDataSource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]>;
}
