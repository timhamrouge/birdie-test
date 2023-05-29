import { Request, Response } from "express";
import Event from "../models/event";
import { Op } from "sequelize";
// import TestCaregiver from "../models/testCaregiver";

const eventController = {
  findAllVisitsByCareRecipientId: async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const queryResult = await Event.findAndCountAll({
        where: {
          care_recipient_id: req.params.care_recipient_id,
          visit_id: { [Op.not]: null },
        },
        order: [["timestamp", "DESC"]],
      });

      const events = queryResult.rows;
      // todo sort types
      // todo pagination

      const eventsGroupedByVisit = events.reduce((acc: any, event: any) => {
        const visitId = event.visit_id;
        const visitRowIndex = acc.findIndex(
          (visitRow: any) => visitRow.visit_id === visitId
        );

        if (visitRowIndex < 0) {
          acc.push({
            visit_id: visitId,
            visit_date: new Date(event.timestamp).toLocaleString(),
            events: [event],
          });
        } else {
          const duplicateEvent = acc[visitRowIndex].events.find(
            (existingEvent: any) => {
              return (
                existingEvent.timestamp === event.timestamp &&
                existingEvent.event_type === event.event_type
              );
            }
          );

          if (!duplicateEvent) {
            // Push the event into the array if no duplicate is found
            acc[visitRowIndex].events.push(event);
          }
        }

        return acc;
      }, []);

      const visitsGroupedByDate = eventsGroupedByVisit
        .reduce((acc: any, visit: any) => {
          const date = visit.visit_date.split(",")[0];

          const dateRowIndex = acc.findIndex(
            (dateRow: any) => dateRow.date === date
          );

          if (dateRowIndex < 0) {
            acc.push({
              date: date,
              visit_count: 1,
            });
          } else {
            acc[dateRowIndex].visit_count++;
          }

          return acc;
        }, [])
        .reverse();

      return res.status(200).send({
        total: queryResult.count,
        eventsGroupedByVisit,
        visitsGroupedByDate,
      });
      // error handling
    } catch (err: any) {
      console.log(err);
    }
  },
  findVisitById: async (req: Request, res: Response): Promise<any> => {
    try {
      const queryResult = await Event.findAndCountAll({
        where: {
          care_recipient_id: req.params.care_recipient_id,
          visit_id: req.params.visit_id,
        },
        order: [["timestamp", "DESC"]],
      });

      res.status(200).send({ queryResult });
    } catch (err: any) {
      console.log(err);
    }
  },
};

export default eventController;
