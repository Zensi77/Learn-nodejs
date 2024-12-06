import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";
describe("checkService", () => {
  const mockRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const mockSuccessCallback = jest.fn();
  const mockErrorCallback = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call success callback with true when service is ok", async () => {
    const checkService = new CheckService(
      mockRepository,
      mockSuccessCallback,
      mockErrorCallback
    );

    const itsOK = await checkService.execute("https://www.google.com");
    expect(itsOK).toBeTruthy();
    expect(mockSuccessCallback).toHaveBeenCalled();
    expect(mockErrorCallback).not.toHaveBeenCalled();

    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  test("should call success callback with true when service is down", async () => {
    const checkService = new CheckService(
      mockRepository,
      mockSuccessCallback,
      mockErrorCallback
    );

    const itsOK = await checkService.execute(
      "https://www.googadsfasfasdle.com"
    );
    expect(itsOK).toBeFalsy();
    expect(mockSuccessCallback).not.toHaveBeenCalled();
    expect(mockErrorCallback).toHaveBeenCalled();

    expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
