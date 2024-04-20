import {
  generateSlug
} from "./chunk-454DCJWN.mjs";
import {
  BadRequest
} from "./chunk-5QBEOMCR.mjs";
import {
  prisma
} from "./chunk-5JWRCMGT.mjs";

// src/routes/create_events.ts
import { z } from "zod";
async function createEvents(server) {
  server.withTypeProvider().post("/events", {
    schema: {
      summary: "Create Evente",
      tags: ["Events"],
      body: z.object({
        title: z.string().min(4),
        detail: z.string().nullable(),
        maximumAttendees: z.number().int().positive().nullable()
      }),
      response: {
        201: z.object({
          eventId: z.string().uuid()
        })
      }
    }
  }, async (request, reply) => {
    const {
      title,
      detail,
      maximumAttendees
    } = request.body;
    const slug = generateSlug(title);
    const withSameSlug = prisma.event.findUnique({
      where: {
        slug
      }
    });
    if (withSameSlug != null) {
      throw new BadRequest("J\xE1 existe um evento com esse Slug!");
    }
    const dataEvent = await prisma.event.create({
      data: {
        title,
        detail,
        maximumAttendees,
        slug
      }
    });
    return reply.status(201).send({ eventId: dataEvent.id });
  });
}

export {
  createEvents
};
