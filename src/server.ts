import fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { createEvents } from './routes/create_events';

const server = fastify()

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(createEvents)

server.listen({
    port: 3000
}).then(() => {
    console.log("Server running in port 3000")
})