import fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { createEvents } from './routes/create_events';
import { registerForEvent } from './routes/register_for_event';
import { getEvent } from './routes/get_event';
import { getAttendeeBadge } from './routes/get_attendees';
import { getCheckinQRCode } from './routes/get_check_in';
import { get_event_attendees } from './routes/get_event_attendees';


const server = fastify()

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(createEvents)
server.register(registerForEvent)
server.register(getEvent)
server.register(getAttendeeBadge)
server.register(getCheckinQRCode)
server.register(get_event_attendees)

server.listen({
    port: 3000
}).then(() => {
    console.log("Server running in port 3000")
})