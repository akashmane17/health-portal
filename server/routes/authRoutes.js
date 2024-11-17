import express from "express";
import { requireUser } from "../middleware/requireUser.js";
import {
  authUser,
  getCurrentUser,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", authUser);

router.get("/logged-in-user", requireUser, getCurrentUser);
router.post("/logout", requireUser, logoutUser);

export default router;
