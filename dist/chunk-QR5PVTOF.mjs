import {
  BadRequest
} from "./chunk-5QBEOMCR.mjs";
import {
  prisma
} from "./chunk-5JWRCMGT.mjs";

// src/routes/get_attendees.ts
import z from "zod";
async function getAttendeeBadge(server) {
  server.withTypeProvider().get("/attendee/:attendeeId/badge", {
    schema: {
      summary: "Get Evente",
      tags: ["Events"],
      params: z.object({
        attendeeId: z.coerce.number().int()
      }),
      response: {
        200: z.object({
          badge: z.object({
            name: z.string(),
            email: z.string().email(),
            eventTitle: z.string(),
            checkinURL: z.string().url()
          })
        })
      }
    }
  }, async (request, reply) => {
    const { attendeeId } = request.params;
    const attendee = await prisma.attendee.findUnique({
      select: {
        name: true,
        email: true,
        event: {
          select: {
            title: true
          }
        }
      },
      where: {
        id: attendeeId
      }
    });
    if (attendee == null) {
      throw new BadRequest("Participante n\xE3o encontrado!!");
    }
    const baseURL = `${request.protocol}://${request.hostname}`;
    const checkin_URL = new URL(`/attendees/${attendeeId}/check_in`, baseURL);
    return reply.send({
      badge: {
        name: attendee.name,
        email: attendee.email,
        eventTitle: attendee.event.title,
        checkinURL: checkin_URL.toString()
      }
    });
  });
}

export {
  getAttendeeBadge
};
