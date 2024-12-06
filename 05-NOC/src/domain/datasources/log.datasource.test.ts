import { LogEntity, LogServerityLevel } from "../entities/log.entity";
import { LogDataSource } from "./log.datasource";

describe("LogDatasource", () => {
  const log = new LogEntity({
    message: "Test",
    level: LogServerityLevel.high,
    origin: "log.datasource.test.ts",
    createdAt: new Date(),
  });

  class mockLogDatasource extends LogDataSource {
    saveLog(log: LogEntity): Promise<void> {
      return Promise.resolve();
    }
    getLogs(severityLevel: LogServerityLevel): Promise<LogEntity[]> {
      return Promise.resolve([log]);
    }
  }

  test("should test the abstract class", async () => {
    const mock = new mockLogDatasource();

    expect(mock).toBeInstanceOf(LogDataSource);
    expect(typeof mock.getLogs).toBe("function");
    expect(typeof mock.saveLog).toBe("function");

    await mock.saveLog(log);
    const logs = await mock.getLogs(LogServerityLevel.high);
    expect(logs).toHaveLength(1);
    expect(logs[0]).toEqual(log);
  });
});
