import express from "express";
import { requireUser } from "../middleware/requireUser.js";
import {
  authUser,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/auth/signup", registerUser);
router.post("/auth/signin", authUser);

router.post("/logout", requireUser, logoutUser);

export default router;
