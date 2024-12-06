import { EmailService } from "../../../presentation/email/email.service";
import { LogServerityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface SendLogEmailUseCase {
  execute(to: string | string[]): Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const send = await this.emailService.sendEmailWithFyleLogs(to);
      if (!send) {
        throw new Error("Error sending email");
      }

      const log = {
        level: LogServerityLevel.low,
        message: `Email sent to ${to}`,
        origin: "send-email-logs.ts",
        createdAt: new Date(),
      };
      this.logRepository.saveLog(log);
      return true;
    } catch (error) {
      const log = {
        level: LogServerityLevel.high,
        message: `Email was not sent to ${to}`,
        origin: "email.service.ts",
        createdAt: new Date(),
      };
      this.logRepository.saveLog(log);
      return false;
    }
  }
}
