import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  assignSubscription,
  getActiveMembers,
  getExpiredMembers,
} from "../controllers/subscriptionController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  assignSubscription
);

router.get(
  "/active",
  authMiddleware,
  getActiveMembers
);

router.get(
  "/expired",
  authMiddleware,
  getExpiredMembers
);

export default router;