import {
  BadRequest
} from "./chunk-5QBEOMCR.mjs";
import {
  prisma
} from "./chunk-5JWRCMGT.mjs";

// src/routes/register_for_event.ts
import { z } from "zod";
async function registerForEvent(server) {
  server.withTypeProvider().post("/events/:eventId/attendee", {
    schema: {
      summary: "Register Attendee",
      tags: ["Events for Attendee"],
      body: z.object({
        name: z.string().min(4),
        email: z.string().email()
      }),
      params: z.object({
        eventId: z.string().uuid()
      }),
      response: {
        201: z.object({
          attendeeId: z.number()
        })
      }
    }
  }, async (request, reply) => {
    const { eventId } = request.params;
    const { name, email } = request.body;
    const attendeeEmail = await prisma.attendee.findUnique({
      where: {
        email
      }
    });
    if (attendeeEmail != null) {
      throw new Error("Email j\xE1 est\xE1 registrado a um evento!!");
    }
    const [eventTotal, amouthAttendeeForEvent] = await Promise.all([
      prisma.event.findUnique({
        where: {
          id: eventId
        }
      }),
      prisma.attendee.count({
        where: {
          eventId
        }
      })
    ]);
    if (eventTotal?.maximumAttendees && amouthAttendeeForEvent >= eventTotal.maximumAttendees) {
      throw new BadRequest("O n\xFAmero m\xE1ximo para o evento j\xE1 esgotou");
    }
    const attendee = await prisma.attendee.create({
      data: {
        name,
        email,
        eventId
      }
    });
    return reply.status(201).send({ attendeeId: attendee.id });
  });
}

export {
  registerForEvent
};
