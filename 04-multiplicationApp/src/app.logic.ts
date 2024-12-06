import { yarg } from "./config/plugins/yargs.plugin";
const fs = require("fs");

const { b, l, s } = yarg;

let data = `
======================
Tabla del ${b}
======================\n`;

s ? console.log(data) : null;

const outputPath = `outputs`;

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true }); // Si no existe la carpeta, la crea de manera recursiva
}
fs.writeFile(`${outputPath}/Tabla${b}.txt`, data, (err: string) => {
  if (err) throw err;
  console.log(`Tabla${b}.txt has been saved!`);
});
