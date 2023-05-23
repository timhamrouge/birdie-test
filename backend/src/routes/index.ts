import express from "express";

const router = express.Router();

// Dummy
router.get("/hello", (req, res) => {
  console.log(req);
  res.send("hello world");
});

export default router;
