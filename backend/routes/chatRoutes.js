import { Router } from "express";
import rateLimit from "express-rate-limit";

import {
  postChat
} from "../controllers/chatController.js";

import {
  asyncHandler
} from "../utils/asyncHandler.js";

const router = Router();

const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 30,

  message: {
    success: false,
    message:
      "Too many chat requests. Please try again later."
  },

  standardHeaders: true,

  legacyHeaders: false
});

/* ROUTE */
router.post(
  "/",
  chatLimiter,
  asyncHandler(postChat)
);

export default router;


