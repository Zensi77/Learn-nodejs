const fs = require("fs");

const data = fs.readFileSync("README.md", "utf-8");

const newData = data.replace(/React/gi, "Angular");

const wordCount = data.split(" ").length;
console.log("Word count: ", wordCount);
const reactAccount = data.match(/React/gi ?? []).length;
console.log("React count: ", reactAccount);

fs.writeFileSync("README-ng.md", newData);
