import { Request, Response } from "express";
import TestCareRecipient from "../models/testCareRecipient";

const testCareRecipientsController = {
  findAll: async (_req: Request, res: Response): Promise<Response | void> => {
    try {
      const careRecipients = await TestCareRecipient.findAll();
      return res.status(200).send({
        data: careRecipients,
      });
    } catch (err: any) {
      res.status(500).send();
    }
  },
};

export default testCareRecipientsController;
