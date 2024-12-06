import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresLogDataSource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await prismaClient.logModel.create({
      data: {
        ...log,
        level: severityEnum[log.level],
      },
    });
  }
  async getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
    const logs = await prismaClient.logModel.findMany({
      where: {
        level: severityEnum[severityLevel],
      },
    });
    return logs.map(LogEntity.fromObject);
  }
}
