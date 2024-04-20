import { FastifyInstance } from "fastify";
import { BadRequest } from './bad_request';
import { ZodError } from "zod";


type fastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: fastifyErrorHandler = (error, request, reply) => {
    

    if( error instanceof ZodError){
        return reply.status(400).send({
            message: `Erro de validação`,
            errors: error.flatten().fieldErrors,
        })
    }


    return reply.status(500).send({message:"Erro interno!!"})
}