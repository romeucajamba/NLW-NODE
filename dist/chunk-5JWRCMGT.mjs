// src/data_base_conection/connect.ts
import { PrismaClient } from "@prisma/client";
var prisma = new PrismaClient({
  log: ["query"]
});

export {
  prisma
};
