import express from "express";

const router = express.Router();

import eventController from "../controllers/eventController";

// Dummy
router.get("/hello", (req, res) => {
  console.log(req);
  res.send("hello world");
});

router.get("/events/:care_recipient_id", eventController.findAll);

export default router;
