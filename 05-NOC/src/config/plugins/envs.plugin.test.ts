import { envs } from "./envs.plugin";
import { log } from "console";

describe("envs.plugin.ts", () => {
  test("should return env options", () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: "gmail",
      MAILER_EMAIL: "alquilerpisosgranada7@gmail.com",
      MAILER_SECRET_KEY: "pdbj zybt ezcj bvbm",
      PROD: true,
      MONGO_URL: "mongodb://juanma:123456789@localhost:27018/",
      MONGO_DB_NAME: "NOC-test",
      MONGO_USER: "juanma",
      MONGO_PASSWORD: "123456789",
    });
  });

  test("should return error if not found env", async () => {
    jest.resetModules(); // Clear cache to simulate a new import
    process.env.PORT = "not a number";

    try {
      await import("./envs.plugin");
      expect(true).toBe(false);
    } catch (error) {
      console.log(error);
      expect(`${error}`).toBe(
        'EnvVarError: env-var: "PORT" should be a valid integer'
      );
    }
  });
});
