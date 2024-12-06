import { yarg as argv, yarg } from "./config/plugins/yargs.plugin";
import { ServerApp } from "./presentation/server-app";

(async () => {
  await main();
})();

async function main() {
  const { b: base, l: limit, s: showTable, n: name, d: destination } = argv;
  ServerApp.run({ base, limit, showTable, name, destination });
}
