import fs from "fs";

import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";

export class FyleSystemDatasource implements LogDataSource {
  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/logs-all.log";
  private readonly mediumLogsPath = "logs/logs-medium.log";
  private readonly highLogsPath = "logs/logs-high.log";

  constructor() {
    this.createLogsFile();
  }

  private createLogsFile = () => {
    fs.existsSync(this.logPath) || fs.mkdirSync(this.logPath);

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        fs.existsSync(path) || fs.writeFileSync(path, "");
      }
    );
  };

  private getLogsFromFile = (path: string): LogEntity[] => {
    const data = fs.readFileSync(path, "utf-8");
    if (data === "") return [];
    const logs = data.split("\n").map((log) => LogEntity.fromJson(log));
    //   const logs = data.split("\n").map(LogEntity.fromJson); // Simplified version

    return logs;
  };

  async saveLog(log: LogEntity): Promise<void> {
    const logAsJson = JSON.stringify(log) + "\n";
    fs.appendFileSync(this.allLogsPath, logAsJson);

    if (log.level === LogServerityLevel.low) return;

    if (log.level === LogServerityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsJson);
    } else if (log.level === LogServerityLevel.high) {
      fs.appendFileSync(this.highLogsPath, logAsJson);
    }
  }
  async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogServerityLevel.low:
        return this.getLogsFromFile(this.allLogsPath);

      case LogServerityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);

      case LogServerityLevel.high:
        return this.getLogsFromFile(this.highLogsPath);

      default:
        throw new Error("Invalid severity level");
    }
  }
}
