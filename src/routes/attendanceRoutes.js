import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { checkIn } from "../controllers/attendanceController.js";

const router = express.Router();

router.post(
  "/check-in",
  authMiddleware,
  checkIn
);

export default router;