import yargs from "yargs";
import { hideBin } from "yargs/helpers";

// Returns the parsed arguments
export const yarg = yargs(hideBin(process.argv))
  .options("b", {
    alias: "base",
    type: "number",
    demandOption: true,
    describe: "Base of the multiplication table",
  })
  .options("l", {
    alias: "limit",
    type: "number",
    default: 10,
    describe: "Limit of the multiplication table",
  })
  .options("s", {
    alias: "show",
    type: "boolean",
    default: false,
    describe: "Show the multiplication table",
  })
  .options("n", {
    alias: "name",
    type: "string",
    default: "Table",
    describe: "Name of the file",
  })
  .options("d", {
    alias: "destination",
    type: "string",
    default: "./outputs",
    describe: "Destination of the file",
  })
  .check((argv, options) => {
    if (argv.b < 1) {
      throw new Error("The base must be greater than 0");
    }
    return true;
  })
  .parseSync();
