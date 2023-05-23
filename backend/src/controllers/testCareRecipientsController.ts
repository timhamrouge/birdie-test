import { Request, Response } from "express";
import TestCareRecipient from "../models/testCareRecipient";

const testCareRecipientsController = {
  findAll: async (_req: Request, res: Response): Promise<any> => {
    try {
      const careRecipients = await TestCareRecipient.findAll();
      return res.status(200).send({
        data: careRecipients,
      });
    } catch (err: any) {
      // TODO
      res.status(500).send();
    }
  },
};

export default testCareRecipientsController;
