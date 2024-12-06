import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";

describe("checkService", () => {
  const mockRepo1 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const mockRepo2 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const mockRepo3 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const mockSuccessCallback = jest.fn();
  const mockErrorCallback = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call success callback with true when service is ok", async () => {
    const checkService = new CheckServiceMultiple(
      [mockRepo1, mockRepo2, mockRepo3],
      mockSuccessCallback,
      mockErrorCallback
    );

    const itsOK = await checkService.execute("https://www.google.com");
    expect(itsOK).toBeTruthy();
    expect(mockSuccessCallback).toHaveBeenCalled();
    expect(mockErrorCallback).not.toHaveBeenCalled();

    expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  test("should call success callback with true when service is down", async () => {
    const checkService = new CheckServiceMultiple(
      [mockRepo1, mockRepo2, mockRepo3],
      mockSuccessCallback,
      mockErrorCallback
    );

    const itsOK = await checkService.execute(
      "https://www.googadsfasfasdle.com"
    );
    expect(itsOK).toBeFalsy();
    expect(mockSuccessCallback).not.toHaveBeenCalled();
    expect(mockErrorCallback).toHaveBeenCalled();

    expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
