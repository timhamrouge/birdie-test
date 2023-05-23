import { Request, Response } from "express";
import Event from "../models/event";

const eventController = {
  findAll: async (req: Request, res: Response): Promise<Response> => {
    const page = parseInt(req.query.page as string) || 1; // Current page number
    const limit = parseInt(req.query.limit as string) || 10; // Number of items per page

    // Calculate the offset based on the current page and limit
    const offset = (page - 1) * limit;

    const queryResult = await Event.findAndCountAll({
      where: { care_recipient_id: req.params.care_recipient_id },
      order: [["timestamp", "DESC"]],
      limit,
      offset,
    });

    // this needs to sort by visit and catalogue that by date for the sake of the graph
    const events = queryResult.rows;
    const totalItems = queryResult.count;
    const totalPages = Math.ceil(totalItems / limit);

    return res.json({
      page,
      limit,
      totalItems,
      totalPages,
      events,
    });
  },
};

export default eventController;
