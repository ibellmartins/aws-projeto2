
import express from "express";
import { handler } from "./handler.js"; //lambda

const router = express.Router();

router.get("/report", async (req, res) => {
  const result = await handler();
  res.status(result.statusCode).json(JSON.parse(result.body));
});

export default router;
