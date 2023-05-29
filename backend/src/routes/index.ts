import express from "express";

const router = express.Router();

import testCaregiversController from "../controllers/testCaregiversController";
import testCareRecipientsController from "../controllers/testCareRecipientsController";

import eventController from "../controllers/eventController";

router.get("/care-recipients", testCareRecipientsController.findAll);

router.get("/caregivers", testCaregiversController.findAll);

router.get(
  "/events/:care_recipient_id/visits",
  eventController.findAllVisitsByCareRecipientId
);

router.get(
  "/events/:care_recipient_id/visits/:visit_id",
  eventController.findVisitById
);

export default router;
