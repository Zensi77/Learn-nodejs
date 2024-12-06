import { config } from "dotenv";

// Aqui estamos importando la configuración de dotenv y le estamos pasando el path del archivo .env.test
// cambiando en jest.config el setupFiles para que apunte a este archivo
config({
  path: ".env.test",
});
