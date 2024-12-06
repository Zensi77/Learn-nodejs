import fs from "fs";
import path from "path";
import { FyleSystemDatasource } from "./file-system.datasources";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";

describe("FileSystemDatasource", () => {
  const logPath = path.join(__dirname, "../../../logs");

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
  });

  const logMedium = new LogEntity({
    message: "Test log",
    level: LogServerityLevel.medium,
    origin: "file-system.datasource.test.ts",
  });
  const logHigh = new LogEntity({
    message: "Test log",
    level: LogServerityLevel.medium,
    origin: "file-system.datasource.test.ts",
  });

  test("should create log files if they do not exists", () => {
    new FyleSystemDatasource();
    const files = fs.readdirSync(logPath);

    expect(files).toEqual(["logs-all.log", "logs-high.log", "logs-medium.log"]);
  });

  test("should save a log in logs-all.log", () => {
    const logDataSource = new FyleSystemDatasource();

    logDataSource.saveLog(logMedium);

    const logs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    expect(logs).toContain(JSON.stringify(logMedium));
  });

  test("should save a log in logs-all.log and logs-medium.log", () => {
    const logDataSource = new FyleSystemDatasource();

    logDataSource.saveLog(logMedium);

    const logs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, "utf-8");
    expect(logs).toContain(JSON.stringify(logMedium));
    expect(mediumLogs).toContain(JSON.stringify(logMedium));
  });

  test("should save a log in logs-all.log and logs-high.log", async () => {
    const logDataSource = new FyleSystemDatasource();

    await logDataSource.saveLog(logHigh);

    const logs = fs.readFileSync(`${logPath}/logs-all.log`, "utf-8");
    const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, "utf-8");
    expect(logs).toContain(JSON.stringify(logHigh));
    expect(mediumLogs).toContain(JSON.stringify(logHigh));
  });

  test("should return all logs", async () => {
    const logDataSource = new FyleSystemDatasource();

    // Crear logs
    const logLow = new LogEntity({
      message: "Test log low",
      level: LogServerityLevel.low,
      origin: "file-system.datasource.test.ts",
    });

    const logMedium = new LogEntity({
      message: "Test log medium",
      level: LogServerityLevel.medium,
      origin: "file-system.datasource.test.ts",
    });

    const logHigh = new LogEntity({
      message: "Test log high",
      level: LogServerityLevel.high,
      origin: "file-system.datasource.test.ts",
    });

    // Guardar logs
    await logDataSource.saveLog(logLow);
    await logDataSource.saveLog(logMedium);
    await logDataSource.saveLog(logHigh);

    // Obtener logs por severidad
    const logsLow = await logDataSource.getLogs(LogServerityLevel.low);
    const logsMedium = await logDataSource.getLogs(LogServerityLevel.medium);
    const logsHigh = await logDataSource.getLogs(LogServerityLevel.high);

    // Verificar que los logs sean los correctos
    expect(logsLow).toContainEqual(logLow);
    expect(logsMedium).toContainEqual(logMedium);
    expect(logsHigh).toContainEqual(logHigh);
  });

  test("should not throw error if path exists", () => {
    new FyleSystemDatasource();
    new FyleSystemDatasource();

    expect(true).toBe(true);
  });

  test("should throw error if severity level es not defined", async () => {
    const logDataSource = new FyleSystemDatasource();
    try {
      await logDataSource.getLogs("invalid" as LogServerityLevel);
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toBe("Error: Invalid severity level");
    }
  });
});
