import fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { createEvents } from './routes/create_events';
import { registerForEvent } from './routes/register_for_event'

const server = fastify()

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(createEvents)
server.register(registerForEvent)

server.listen({
    port: 3000
}).then(() => {
    console.log("Server running in port 3000")
})