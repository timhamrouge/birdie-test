import { Request, Response } from "express";
import TestCaregiver from "../models/testCaregiver";

const testCaregiversController = {
  findAll: async (_req: Request, res: Response): Promise<any> => {
    try {
      const caregivers = await TestCaregiver.findAll();
      return res.status(200).send({
        data: caregivers,
      });
    } catch (err: any) {
      // TODO
      res.status(500).send();
    }
  },
};

export default testCaregiversController;
