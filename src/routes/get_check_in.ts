import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from '../data_base_conection/connect';

export async function getCheckinQRCode(server: FastifyInstance) {
    server.withTypeProvider<ZodTypeProvider>().get('/attendees/:attendeeId/check_in', {
        schema:{
            params: z.object({
                attendeeId: z.coerce.number().int()
            }),
            response: {
                201: z.null()
            }
        }
    }, async (request, reply) => {
        const { attendeeId } = request.params

        //Procurar na tabela se o id do atttendee é o que estou recebendo
        const attendeeCheckIn = await prisma.checkIn.findUnique({
            where:{
                attendeeId,
            }
        })

        if(attendeeCheckIn !== null ){
            throw new Error("Participante já tem um checkin")
        }

        const createChackin = await prisma.checkIn.create({
            data:{
                attendeeId
            }
        })


        return reply.status(201).send()
    })
}