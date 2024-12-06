import { get } from "http";
import { send } from "process";
import { SendEmailLogs } from "./send-email-logs";
import { LogServerityLevel } from "../../entities/log.entity";
import exp from "constants";
import { mock } from "node:test";

describe("emailService", () => {
  const MockEmailService = {
    sendEmailWithFyleLogs: jest.fn().mockReturnValue(true),
  };

  const MockLogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const sendEmailLogs = new SendEmailLogs(
    MockEmailService as any,
    MockLogRepository
  );
  test("should send email with logs", async () => {
    const res = await sendEmailLogs.execute("yo@google.com");

    expect(res).toBeTruthy();
    expect(MockEmailService.sendEmailWithFyleLogs).toBeCalledTimes(1);
    expect(MockLogRepository.saveLog).toBeCalledTimes(1);
    expect(MockLogRepository.saveLog).toBeCalledWith({
      createdAt: expect.any(Date),
      level: LogServerityLevel.low,
      message: "Email sent to yo@google.com",
      origin: "send-email-logs.ts",
    });
  });

  test("should log in case error", async () => {
    MockEmailService.sendEmailWithFyleLogs.mockReturnValue(false);
    const res = await sendEmailLogs.execute("yo@google.com");

    expect(res).toBeFalsy();
    expect(MockEmailService.sendEmailWithFyleLogs).toBeCalledTimes(1);
    expect(MockLogRepository.saveLog).toBeCalledTimes(1);
    expect(MockLogRepository.saveLog).toBeCalledWith({
      createdAt: expect.any(Date),
      level: LogServerityLevel.high,
      message: expect.any(String),
      origin: "email.service.ts",
    });
  });
});
