import express from "express";

const router = express.Router();

import testCaregiversController from "../controllers/testCaregiversController";
import testCareRecipientsController from "../controllers/testCareRecipientsController";

import eventController from "../controllers/eventController";

// Dummy
router.get("/hello", (req, res) => {
  console.log(req);
  res.send("hello world");
});

router.get("/care-recipients", testCareRecipientsController.findAll);

router.get("/caregivers", testCaregiversController.findAll);

router.get(
  "/events/:care_recipient_id",
  eventController.findAllByCareRecipientId
);

export default router;
