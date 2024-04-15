import fastify from 'fastify';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';




const prisma = new PrismaClient({
    log: ['query'],
})

const server = fastify()
server.post('/events', async (request, reply) => {

    const createValidation = z.object({
        title: z.string().min(4),
        detail: z.string().nullable(),
        maximumAttendees: z.number().int().positive().nullable(),
    })

    //validação dos dados que vêe da requisição
    const data = createValidation.parse(request.body)

    const dataEvent = await prisma.event.create({
        data:{
            title: data.title,
            detail: data.detail,
            maximumAttendees: data.maximumAttendees,
            slug: new Date().toDateString()
        },
    })

    return reply.status(201).send({eventId: dataEvent.id})
})










server.listen({
    port: 3000
}).then(() => {
    console.log("Server running in port 3000")
})