import { LogEntity, LogServerityLevel } from "./log.entity";

describe("logEntity", () => {
  const data = {
    level: LogServerityLevel.high,
    message: "Test",
    origin: "log.entity.test.ts",
  };

  test("should create a log entity", () => {
    const log = new LogEntity(data);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.level).toBe(data.level);
    expect(log.message).toBe(data.message);
    expect(log.origin).toBe(data.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test("should create a log entity instance from json", () => {
    const json = `{"level":"low","message":"Service https://www.google.com is ok","origin":"check-service.ts","createdAt":"2024-12-04T17:37:57.290Z"}`;

    const log = LogEntity.fromJson(json);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.level).toBe(LogServerityLevel.low);
    expect(log.message).toBe("Service https://www.google.com is ok");
    expect(log.origin).toBe("check-service.ts");
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test("should create a log entity instance from object", () => {
    const log = LogEntity.fromObject(data);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.level).toBe(data.level);
    expect(log.message).toBe(data.message);
    expect(log.origin).toBe(data.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });
});
