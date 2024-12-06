import { CronService } from "./cron-service";

describe("CronService", () => {
  const mockTick = jest.fn();

  test("should create a job", (done) => {
    const job = CronService.createJob("* * * * * *", mockTick);

    setTimeout(() => {
      job.stop();
      expect(mockTick).toHaveBeenCalledTimes(2);
      done();
    }, 2000);
  });
});
