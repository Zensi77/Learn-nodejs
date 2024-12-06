import { envs } from "../config/plugins/envs.plugin";
import { LogServerityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { FyleSystemDatasource } from "../infrastructure/datasources/file-system.datasources";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDataSource } from "../infrastructure/datasources/postgre-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fsLogRepository = new LogRepositoryImpl(
  new FyleSystemDatasource()
  // new MongoLogDataSource(),
  // new PostgresLogDataSource()
);
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDataSource());
const postgreLogRepository = new LogRepositoryImpl(new PostgresLogDataSource());
const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log("Server started");

    // new SendEmailLogs(emailService, fileSystemLogRepository).execute(
    //   "juanmaespi7@gmail.com"
    // );

    // emailService.sendEmail({
    //   to: "juanmaespi7@gmail.com",
    //   subject: "Hello",
    //   htmlBody: "<h1>Primer correo automatico que envio</h1>",
    // });

    // emailService.sendEmailWithFyleLogs("juanmaespi7@gmail.com");

    // const logs = await logRepository.getLogs(LogServerityLevel.high);
    CronService.createJob("*/3 * * * * *", () => {
      const url = "https://www.google.com";

      // new CheckService(
      //   logRepository,
      //   () => console.log(`${url} is up`),
      //   (error) => console.error(error)
      // ).execute(url);

      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgreLogRepository],
        () => console.log(`${url} is up`),
        (error) => console.error(error)
      ).execute(url);
    });
  }
}
