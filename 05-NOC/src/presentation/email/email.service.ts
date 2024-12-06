import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";
import { LogRepository } from "../../domain/repositories/log.repository";
import { LogServerityLevel } from "../../domain/entities/log.entity";
import { create } from "domain";

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachement[];
}

export interface Attachement {
  filename: string;
  path: string;
}

export class EmailService {
  constructor() {}

  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachements = [] } = options;
    try {
      const sendInformation = await this.transporter.sendMail({
        from: envs.MAILER_EMAIL,
        to,
        subject,
        html: htmlBody,
        attachments: attachements,
      });

      console.log("Email sent", sendInformation);
      const log = {
        level: LogServerityLevel.low,
        message: `Email sent to ${to}`,
        origin: "email.service.ts",
        createdAt: new Date(),
      };
      return true;
    } catch (error) {
      const log = {
        level: LogServerityLevel.high,
        message: `Email was not sent to ${to}`,
        origin: "email.service.ts",
        createdAt: new Date(),
      };

      console.error(error);
      return false;
    }
  }

  async sendEmailWithFyleLogs(to: string | string[]) {
    const subject = "Logs";
    const htmlBody = "<h1>Logs</h1>";

    const attachements: Attachement[] = [
      { filename: "all-logs.log", path: "./logs/logs-all.log" },
      { filename: "medium-logs.log", path: "./logs/logs-medium.log" },
      { filename: "high-logs.log", path: "./logs/logs-high.log" },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachements });
  }
}
