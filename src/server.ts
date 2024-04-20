import fastify from 'fastify';
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from 'fastify-type-provider-zod';
import fastifySwagger from '@fastify/swagger'; // Intalar o @fastify/swagger para criar a documentação, a especificação da API e o @fastify/swagger-ui Para interface
import fastifySwaggerUi from '@fastify/swagger-ui';

import { createEvents } from './routes/create_events';
import { registerForEvent } from './routes/register_for_event';
import { getEvent } from './routes/get_event';
import { getAttendeeBadge } from './routes/get_attendees';
import { getCheckinQRCode } from './routes/get_check_in';
import { get_event_attendees } from './routes/get_event_attendees';
import { errorHandler } from './routes/_errors/error_handler';


const server = fastify()

server.register( fastifySwagger, {
    swagger :{
        costumes:['application/json'],
        produces: ['application/json'],
        info: {
            title: 'pass in',
            description: 'Especificações da API  pass-in feita durante o evento NLW-Unite',
            version:'1.0.0'
        },
    },
    transform: jsonSchemaTransform,
})

server.register(fastifySwaggerUi, {
    routePrefix: '/docs',
})

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(createEvents)
server.register(registerForEvent)
server.register(getEvent)
server.register(getAttendeeBadge)
server.register(getCheckinQRCode)
server.register(get_event_attendees)


server.setErrorHandler(errorHandler)

server.listen({
    port: 3000
}).then(() => {
    console.log("Server running in port 3000")
})