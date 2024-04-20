// src/routes/_errors/error_handler.ts
import { ZodError } from "zod";
var errorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: `Erro de valida\xE7\xE3o`,
      errors: error.flatten().fieldErrors
    });
  }
  return reply.status(500).send({ message: "Erro interno!!" });
};

export {
  errorHandler
};
