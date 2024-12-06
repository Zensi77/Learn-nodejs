import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  // res.writeHead(200, { "Content-Type": "text/plain" });
  // res.write("Hello World");
  // res.end();
  console.log(req.url);

  // const dat = { name: "John", age: 30, city: "New York" };
  // res.writeHead(200, { "Content-Type": "application/json" });
  // res.write(JSON.stringify(dat));

  if (req.url === "/") {
    const html = fs.readFileSync("./src/public/index.html", "utf8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);

    return;
  }

  if (req.url?.includes(".ico")) return;

  req.url?.includes(".js")
    ? res.writeHead(200, { "Content-Type": "text/javascript" })
    : req.url?.includes(".css")
    ? res.writeHead(200, { "Content-Type": "text/css" })
    : res.writeHead(404, { "Content-Type": "text/plain" });

  const response = fs.readFileSync(`./src/public${req.url}`, "utf8");

  res.end(response);
});

server.listen(8081, () => {
  console.log("Server is running on port 8080");
});
