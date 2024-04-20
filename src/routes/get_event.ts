import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from '../data_base_conection/connect'



export async function getEvent(server:FastifyInstance) {

    server.withTypeProvider<ZodTypeProvider>().get('/event/:eventId', {
        schema:{

            params: z.object({
                eventId: z.string().uuid(),
            }),

            response:{}
        }
    }, async (request, reply) => {

        const { eventId } = request.params

        const event = await prisma.event.findUnique({
            select:{
                    title: true,
                    slug: true,
                    detail: true,
                    maximumAttendees: true,

                    //Buscando aquantidade de participantes
                    _count:{
                        select:{
                            attendees: true
                        },
                    },
            },

            where:{
                id: eventId
            }
        })

        if(event == null){
            throw new Error("Evento inexistente!")
        }

        
        return reply.send({
            event:{
                 title: event.title,
                 slug: event.slug,
                 detail: event.detail,
                 maximumendees: event.maximumAttendees,
                 attende: event._count.attendees 
                }
            
        })
    })
}