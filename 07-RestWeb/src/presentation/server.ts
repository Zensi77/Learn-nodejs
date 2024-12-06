import express, { Router } from "express";
import path from "path";

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

export class Server {
  private readonly port: number;
  private readonly public_path: string;
  private readonly routes: Router;

  constructor(private readonly options: Options) {
    const { port, public_path, routes } = options;
    this.port = port;
    this.public_path = public_path || "public";
    this.routes = routes;
  }

  private app = express();

  // Los use hacen que se ejecute en cada request
  async start() {
    // Middleware
    this.app.use(express.json()); // Parseo body a JSON (raw)
    this.app.use(express.urlencoded({ extended: true })); // Parseo body a JSON (x-www-form-urlencoded)

    // Public folder
    this.app.use(express.static(this.public_path));

    //routes
    this.app.use(this.routes);

    // SPA
    this.app.get("*", (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.public_path}/index.html`
      );
      res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.log("Server is running on port 3000");
    });
  }
}
