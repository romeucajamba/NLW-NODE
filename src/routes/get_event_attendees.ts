import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { number, z } from 'zod';
import { prisma } from '../data_base_conection/connect';
import { FastifyInstance } from 'fastify';


export async function get_event_attendees(server: FastifyInstance) {
    server.withTypeProvider<ZodTypeProvider>().get('/event/:eventId/attendees', {
        schema:{
            summary: 'Get Attendees',
            tags: ['Attendees'],
            params: z.object({
                eventId: z.string().uuid()
            }),

            querystring: z.object({
                query: z.string().nullish(),
                pageIndex: z.string().nullish().default('0').transform(Number),
            }),

            response:{
                200: z.object({
                    getAttendeesEvent: z.array(
                        z.object({
                                    id: z.number(),
                                    name: z.string(),
                                    email: z.string().email(),
                                    createAt: z.date(),
                                    checkIn:z.date().nullable() 
                        })
                    )
                })
            }
        }
    }, async (request, reply) => {
        const { eventId } = request.params
        const { pageIndex, query } = request.query

        const getAttendeesEvent = await prisma.attendee.findMany({
            select:{
                id: true,
                name: true,
                email: true,
                createAt: true,

                checkIn:{
                    select:{
                        createdAt: true
                    }
                }
            },

            where: query ? {
                eventId,

                name: {
                    contains: query
                },
            } : {
                eventId,
            },

            take: 10,
            skip: pageIndex * 10,
            orderBy:{
                createAt: 'desc'
            }

        })

        return reply.send({
            getAttendeesEvent: getAttendeesEvent.map( attendee => {
               return {
                        id: attendee.id,
                        name: attendee.name,
                        email: attendee.email,
                        createAt: attendee.createAt,
                        checkIn: attendee.checkIn?.createdAt ?? null
               } 
            })
        })
    })
}