const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args]; // Cojo los argumentos y los añado a process.argv
  const { yarg } = await import("./yargs.plugin");
  return yarg;
};

describe("yargs.plugin.test.ts", () => {
  const originalArgv = process.argv;
  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  test("should return default values", async () => {
    const args = await runCommand(["-b", "5"]);

    expect(args).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: "Table",
        d: "./outputs",
      })
    );
  });

  test("should return with custom values", async () => {
    // En este test se han de reestar los valores por defecto de los yargs
    const args = await runCommand([
      "-b",
      "5",
      "-l",
      "3",
      "-s",
      "-n",
      "Test",
      "-d",
      "./test",
    ]);

    expect(args).toEqual(
      expect.objectContaining({
        b: 5,
        l: 3,
        s: true,
        n: "Test",
        d: "./test",
      })
    );
  });
});
