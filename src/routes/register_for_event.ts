import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { prisma } from '../data_base_conection/connect';
import { BadRequest } from './_errors/bad_request';


export async function registerForEvent(server: FastifyInstance) {

    server.withTypeProvider<ZodTypeProvider>().post('/events/:eventId/attendee', {
        schema:{
            summary: 'Register Attendee',
            tags: ['Events for Attendee'],
            body: z.object({
                name: z.string().min(4),
                email: z.string().email()
            }),
            params: z.object({
                eventId: z.string().uuid()
            }),
            response: {
                201: z.object({
                    attendeeId: z.number(),
                })
            }
        }
    }, async (request, reply) => {

        const { eventId } = request.params
        const { name, email } = request.body

         //Procurando email no evento
         const attendeeEmail = await prisma.attendee.findUnique({
            where:{
                email: email
            }
        })

        if(attendeeEmail != null){
                throw new Error("Email já está registrado a um evento!!")
        }

        const [eventTotal, amouthAttendeeForEvent] = await Promise.all([

            prisma.event.findUnique({
                where:{
                    id:eventId,
                }
            }),
            prisma.attendee.count({
                where:{
                    eventId
                }
            })
        ])

        if(eventTotal?.maximumAttendees && amouthAttendeeForEvent >= eventTotal.maximumAttendees){
            throw new BadRequest("O número máximo para o evento já esgotou")
        }

        const attendee = await prisma.attendee.create({
            data:{
                name,
                email,
                eventId
            }
        })

        return reply.status(201).send({attendeeId: attendee.id})
    })

}