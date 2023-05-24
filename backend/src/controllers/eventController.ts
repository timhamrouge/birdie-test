import { Request, Response } from "express";
import Event from "../models/event";
import { Op } from "sequelize";

const eventController = {
  findVisitsInfoByCareRecipientId: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const queryResult = await Event.findAndCountAll({
      where: {
        care_recipient_id: req.params.care_recipient_id,
        visit_id: { [Op.not]: null },
      },
      order: [["timestamp", "DESC"]],
    });

    const events = queryResult.rows;
    // todo sort types
    const eventsGroupedByVisit = events.reduce((acc: any, event: any) => {
      if (!acc[event.visit_id]) acc[event.visit_id] = [];

      acc[event.visit_id].push(event);

      return acc;
    }, {});

    const visitsGroupedByDate = events.reduce((acc: any, event: any) => {
      const date = new Date(event.timestamp).toLocaleDateString(); // Get the date portion from the timestamp

      if (!acc[date]) {
        acc[date] = [];
      }

      if (!acc[date].includes(event.visit_id)) {
        acc[date].push(event.visit_id);
      }

      return acc;
    }, {});

    return res.status(200).send({
      eventsGroupedByVisit,
      visitsGroupedByDate,
    });
    // error handling
  },
};

export default eventController;
