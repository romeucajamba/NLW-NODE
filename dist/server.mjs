import {
  errorHandler
} from "./chunk-Y7EW6EQH.mjs";
import {
  createEvents
} from "./chunk-L6BHANIN.mjs";
import "./chunk-454DCJWN.mjs";
import {
  getAttendeeBadge
} from "./chunk-QR5PVTOF.mjs";
import {
  getCheckinQRCode
} from "./chunk-XNZ5QUSU.mjs";
import {
  getEvent
} from "./chunk-YSZYNB44.mjs";
import {
  get_event_attendees
} from "./chunk-G5H66CFW.mjs";
import {
  registerForEvent
} from "./chunk-US3A5VVL.mjs";
import "./chunk-5QBEOMCR.mjs";
import "./chunk-5JWRCMGT.mjs";

// src/server.ts
import fastify from "fastify";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { fastifyCors } from "@fastify/cors";
var server = fastify();
server.register(fastifyCors, {
  origin: "*"
});
server.register(fastifySwagger, {
  swagger: {
    costumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass in",
      description: "Especifica\xE7\xF5es da API  pass-in feita durante o evento NLW-Unite",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
server.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);
server.register(createEvents);
server.register(registerForEvent);
server.register(getEvent);
server.register(getAttendeeBadge);
server.register(getCheckinQRCode);
server.register(get_event_attendees);
server.setErrorHandler(errorHandler);
server.listen({
  port: 3e3,
  host: "0.0.0.0"
}).then(() => {
  console.log("Server running in port 3000");
});
