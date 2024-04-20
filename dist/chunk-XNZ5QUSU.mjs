import {
  BadRequest
} from "./chunk-5QBEOMCR.mjs";
import {
  prisma
} from "./chunk-5JWRCMGT.mjs";

// src/routes/get_check_in.ts
import { z } from "zod";
async function getCheckinQRCode(server) {
  server.withTypeProvider().get("/attendees/:attendeeId/check_in", {
    schema: {
      summary: "Get Check_in",
      tags: ["Check_in"],
      params: z.object({
        attendeeId: z.coerce.number().int()
      }),
      response: {
        201: z.null()
      }
    }
  }, async (request, reply) => {
    const { attendeeId } = request.params;
    const attendeeCheckIn = await prisma.checkIn.findUnique({
      where: {
        attendeeId
      }
    });
    if (attendeeCheckIn !== null) {
      throw new BadRequest("Participante j\xE1 tem um checkin");
    }
    const createChackin = await prisma.checkIn.create({
      data: {
        attendeeId
      }
    });
    return reply.status(201).send();
  });
}

export {
  getCheckinQRCode
};
