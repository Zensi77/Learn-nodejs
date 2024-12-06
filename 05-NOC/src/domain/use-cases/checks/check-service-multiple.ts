import { LogEntity, LogServerityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceUseCase {
  constructor(
    // Injección de dependencias de las funciones
    private readonly logRepository: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  private callLogs(log: LogEntity) {
    this.logRepository.forEach((logRepository) => {
      logRepository.saveLog(log);
    });
  }

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error fetching ${url}`);
      }

      this.callLogs(
        new LogEntity({
          level: LogServerityLevel.low,
          message: `Service ${url} is ok`,
          origin: "check-service.ts",
        })
      );
      this.successCallback && this.successCallback(); // Llamada a la función de éxito
    } catch (error) {
      this.callLogs(
        new LogEntity({
          level: LogServerityLevel.high,
          message: `Error fetching ${url}`,
          origin: "check-service.ts",
        })
      );
      this.errorCallback && this.errorCallback(`Error ${error}`); // Llamada a la función de error
      return false;
    }

    return true;
  }
}
