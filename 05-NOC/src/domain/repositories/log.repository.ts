import { LogEntity, LogServerityLevel } from "../entities/log.entity";

// Interfaz que define los métodos que deben ser implementados por los repositorios de logs
export abstract class LogRepository {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]>;
}
