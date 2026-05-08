import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createMember, deleteMember, getMembers, updateMember } from "../controllers/memberController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createMember
);
router.get(
  "/",
  authMiddleware,
  getMembers
);

router.put(
  "/:id",
  authMiddleware,
  updateMember
);

router.delete(
  "/:id",
  authMiddleware,
  deleteMember
);

export default router;