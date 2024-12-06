import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDB } from "./data/mongo";
import { Server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  await MongoDB.connect({
    mongoURL: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  // const prisma = new PrismaClient();
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: "HIGH",
  //     message: "prueba",
  //     origin: "App.ts",
  //   },
  // });
  // console.log(newLog);

  // const logs = await prisma.logModel.findMany({
  //   where: {
  //     level: "HIGH",
  //   },
  // });

  // Crear una coleccion=tablas, documentos=registro
  // const newLog = await LogModel.create({
  //   level: "high",
  //   message: "prueba",
  //   origin: "App.ts",
  // });

  // await newLog.save();

  Server.start();
}
