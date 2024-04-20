import {
  BadRequest
} from "./chunk-5QBEOMCR.mjs";
import {
  prisma
} from "./chunk-5JWRCMGT.mjs";

// src/routes/get_event.ts
import { z } from "zod";
async function getEvent(server) {
  server.withTypeProvider().get("/event/:eventId", {
    schema: {
      summary: "Get Evente",
      tags: ["Events"],
      params: z.object({
        eventId: z.string().uuid()
      }),
      response: {}
    }
  }, async (request, reply) => {
    const { eventId } = request.params;
    const event = await prisma.event.findUnique({
      select: {
        title: true,
        slug: true,
        detail: true,
        maximumAttendees: true,
        //Buscando aquantidade de participantes
        _count: {
          select: {
            attendees: true
          }
        }
      },
      where: {
        id: eventId
      }
    });
    if (event == null) {
      throw new BadRequest("Evento inexistente!");
    }
    return reply.send({
      event: {
        title: event.title,
        slug: event.slug,
        detail: event.detail,
        maximumendees: event.maximumAttendees,
        attende: event._count.attendees
      }
    });
  });
}

export {
  getEvent
};
