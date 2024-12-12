import express, { Router } from "express";
import compression from "compression";
import path from "path";

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

export class Server {
  private serverListener?: any;
  private readonly port: number;
  private readonly public_path: string;
  private readonly routes: Router;

  constructor(private readonly options: Options) {
    const { port, public_path, routes } = options;
    this.port = port;
    this.public_path = public_path || "public";
    this.routes = routes;
  }

  public readonly app = express();

  // Los use hacen que se ejecute en cada request
  async start() {
    // Middleware
    this.app.use(express.json()); // Parseo body a JSON (raw)
    this.app.use(express.urlencoded({ extended: true })); // Parseo body a JSON (x-www-form-urlencoded)
    this.app.use(compression()); // Comprimir respuestas HTTP para mejorar la velocidad de carga

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

    this.serverListener = this.app.listen(this.port, () => {
      console.log("Server is running on port 3000");
    });
  }

  close() {
    this.serverListener.close();
  }
}
