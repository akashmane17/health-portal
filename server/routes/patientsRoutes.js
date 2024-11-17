import express from "express";
import { requireUser } from "../middleware/requireUser.js";

import {
  getAllPatients,
  getConsultationsByPatient,
  getPatientById,
} from "../controllers/patientController.js";

const router = express.Router();

router.get("/consultation/:id", requireUser, getConsultationsByPatient);
router.get("/all", requireUser, getAllPatients);
router.get("/:id", requireUser, getPatientById);

export default router;
