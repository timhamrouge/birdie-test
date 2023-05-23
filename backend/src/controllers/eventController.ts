import { Request, Response } from "express";
// import asyncHandler from "express-async-handler";
import Event from "../models/event"; // Assuming you have a model called Event

const eventController = {
  findAll: async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1; // Current page number
    const limit = parseInt(req.query.limit as string) || 10; // Number of items per page

    // Calculate the offset based on the current page and limit
    const offset = (page - 1) * limit;

    const queryResult = await Event.findAndCountAll({
      where: { care_recipient_id: req.params.care_recipient_id },
      limit,
      offset,
    });

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
