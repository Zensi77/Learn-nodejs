import { envs } from "../../config/plugins/envs.plugin";
import { EmailService, SendMailOptions } from "./email.service";
import nodemailer from "nodemailer";

describe("EmailService", () => {
  const mockSendMail = jest.fn();
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  });

  const emailService = new EmailService();

  test("should send email", async () => {
    const options: SendMailOptions = {
      to: "",
      subject: "",
      htmlBody: "",
    };
    await emailService.sendEmail(options);

    expect(mockSendMail).toHaveBeenCalledWith({
      from: envs.MAILER_EMAIL,
      to: "",
      subject: "",
      html: "",
      attachments: [],
    });
  });

  test("should send email with atachements", async () => {
    await emailService.sendEmailWithFyleLogs([""]);

    expect(mockSendMail).toHaveBeenCalledWith({
      from: envs.MAILER_EMAIL,
      to: "",
      subject: "",
      html: "",
      attachments: [],
    });

    expect(mockSendMail).toHaveBeenCalledWith({
      from: envs.MAILER_EMAIL,
      to: expect.any(Array),
      subject: "Logs",
      html: "<h1>Logs</h1>",
      attachments: expect.arrayContaining([
        { filename: "all-logs.log", path: "./logs/logs-all.log" },
        { filename: "medium-logs.log", path: "./logs/logs-medium.log" },
        { filename: "high-logs.log", path: "./logs/logs-high.log" },
      ]),
    });
  });
});
