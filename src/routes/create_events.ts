import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { generateSlug } from '../util/generate_slug';
import { prisma } from '../data_base_conection/connect';



export async function createEvents (server: FastifyInstance) {
    server.withTypeProvider<ZodTypeProvider>().post('/events', {
        schema:{
            summary: 'Create Evente',
            tags: ['Events'],
            body: z.object({
                    title: z.string().min(4),
                    detail: z.string().nullable(),
                    maximumAttendees: z.number().int().positive().nullable(),
            }),
            response:{
                201: z.object({
                    eventId: z.string().uuid()
                })
            }
        }
    }, async (request, reply) => {
    
    
        //validação dos dados que vêe da requisição
        const {
            title,
            detail,
            maximumAttendees,
        } =request.body
    
    
        const slug = generateSlug(title)
    
        //Procurando evento com o mesmo slug
        const withSameSlug = prisma.event.findUnique({
            where:{
                slug
            }
        })
    
        if (withSameSlug != null){
            throw new Error("Já existe um evento com esse Slug!")
        }
    
        const dataEvent = await prisma.event.create({
            data:{
                title,
                detail,
                maximumAttendees,
                slug
            },
        })
    
        return reply.status(201).send({eventId: dataEvent.id})
    })
    
}