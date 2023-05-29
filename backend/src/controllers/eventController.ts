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
        // fix this
        // include: [
        //   {
        //     model: TestCaregiver,
        //     attributes: ["first_name", "last_name"],
        //     as: "careGiver",
        //   },
        // ],
      });

      const events = queryResult.rows;
      // todo sort types
      const eventsGroupedByVisit = events.reduce((acc: any, event: any) => {
        if (!acc[event.visit_id]) {
          acc[event.visit_id] = {
            visit_date: new Date(event.timestamp),
            events: [event],
          };
        } else {
          // Check if an event with the same timestamp and event type already exists to filter duplicates
          const duplicateEvent = acc[event.visit_id].events.find(
            (existingEvent: any) => {
              return (
                existingEvent.timestamp === event.timestamp &&
                existingEvent.event_type === event.event_type
              );
            }
          );

          if (!duplicateEvent) {
            // Push the event into the array if no duplicate is found
            acc[event.visit_id].events.push(event);
          }
        }

        return acc;
      }, {});
      // Convert the values of the acc object into an array

      // i think we need to sort visits

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

      // console.log(eventsGroupedByVisit);

      return res.status(200).send({
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
