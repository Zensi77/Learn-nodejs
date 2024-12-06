import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { LogModel, MongoDB } from "../../data/mongo";
import { MongoLogDataSource } from "./mongo-log.datasource";
import { LogEntity, LogServerityLevel } from "../../domain/entities/log.entity";

describe("MongoLogDatasource", () => {
  beforeAll(() => {
    MongoDB.connect({
      mongoURL: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
    });
  });
  afterEach(async () => {
    await LogModel.deleteMany();
  });
  afterAll(async () => {
    mongoose.connection.close();
  });

  const logDataSource = new MongoLogDataSource();

  const log = new LogEntity({
    message: "Test log",
    level: LogServerityLevel.medium,
    origin: "mongo-log.datasource.test.ts",
  });

  test("should create a log", async () => {
    const logSpy = jest.spyOn(console, "log");

    await logDataSource.saveLog(log);

    expect(logSpy).toHaveBeenCalled();
  });

  test("should get logs", async () => {
    await logDataSource.saveLog(log);
    const logs = await logDataSource.getLogs(LogServerityLevel.medium);

    expect(logs).toHaveLength(1);
    expect(logs[0].level).toBe(LogServerityLevel.medium);
  });
});
