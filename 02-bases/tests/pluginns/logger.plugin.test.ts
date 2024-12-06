import { level } from "winston";
import {
  buildLogger,
  logger as WSLogger,
  logger,
} from "../../src/plugins/logger.plugin";

describe("Logger Plugin", () => {
  test("Logger return a function", () => {
    const logger = buildLogger("test");
    expect(typeof logger.log).toBe("function");
    expect(typeof logger.error).toBe("function");
  });

  test("Logger.log creates a log with info level", () => {
    // Prepare
    const winstonLogger = jest.spyOn(WSLogger, "log");
    const msg = "test message";
    const service = "test";

    // Execute
    const logger = buildLogger(service);
    logger.log(msg);

    // Assert
    expect(winstonLogger).toHaveBeenCalledWith(
      "info",
      // Espero que el objeto contenga minimo estas propiedades
      expect.objectContaining({
        level: "info",
        message: msg,
        service,
      })
    );
  });
});
