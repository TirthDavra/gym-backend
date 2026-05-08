import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createMember } from "../controllers/memberController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createMember
);

export default router;