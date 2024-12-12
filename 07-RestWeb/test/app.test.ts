import { Server } from "../src/presentation/server";
import { envs } from "../src/config/envs";

// Trato todo como un mock para evitar que se ejecute el código real
jest.mock("../src/presentation/server");

describe("App.ts", () => {
  test("Should call server with args and start", async () => {
    await import("../src/app");

    expect(Server).toHaveBeenCalledWith({
      port: envs.PORT,
      public_path: envs.PUBLIC_PATH,
      routes: expect.any(Function),
    });
  });
});
