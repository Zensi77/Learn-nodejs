import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";

describe("LogRepositoryImpl", () => {
  const mockLogDataSource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const logDataSource = new LogRepositoryImpl(mockLogDataSource);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("saveLog should call with arguments", async () => {
    const logEntity = {
      message: "test",
      level: LogServerityLevel.high,
      origin: "test",
    } as LogEntity;

    logDataSource.saveLog(logEntity);

    expect(mockLogDataSource.saveLog).toHaveBeenCalledWith(logEntity);
  });

  test("getLogs should call with arguments", async () => {
    await logDataSource.getLogs(LogServerityLevel.high);

    expect(mockLogDataSource.getLogs).toHaveBeenCalledWith(
      LogServerityLevel.high
    );
  });
});
