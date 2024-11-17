import express from "express";
import { requireUser } from "../middleware/requireUser.js";
import {
  addConsultation,
  addPrescription,
  getAllDoctors,
  getConsultationsByDoctor,
  getDoctorById,
  getPrescriptionByConsultationId,
} from "../controllers/doctorController.js";

const router = express.Router();

router.get("/all", requireUser, getAllDoctors);
router.get("/:id", requireUser, getDoctorById);

router.post("/consultation", requireUser, addConsultation);
router.get("/consultation/:id", requireUser, getConsultationsByDoctor);

router.put("/prescription/:id", requireUser, addPrescription);
router.get("/prescription/:id", requireUser, getPrescriptionByConsultationId);

export default router;
