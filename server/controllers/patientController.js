import Consultation from "../models/consultation.js";
import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js"; // Ensure this is imported

// Get All Patient
export const getAllPatients = asyncHandler(async (req, res) => {
  const patients = await User.find(
    { role: "Patient" },
    { password: 0, historyOfSurgery: 0, historyOfIllness: 0, __v: 0 }
  );

  res.status(200).json(patients);
});

// Get Patient By ID
export const getPatientById = asyncHandler(async (req, res) => {
  const { id } = req.params; // Extract ID from route params

  const patient = await User.findOne(
    { _id: id, role: "Patient" },
    { password: 0, historyOfSurgery: 0, historyOfIllness: 0, __v: 0 }
  );

  if (!patient) {
    res.status(404);
    throw new Error("Patient not found");
  }

  res.status(200).json(patient);
});

export const getConsultationsByPatient = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const consultations = await Consultation.find({ patientId: id })
    .populate("doctorId", "name email specialization")
    .sort({ createdAt: -1 }) // Sort by createdAt in descending order
    .exec();

  if (!consultations || consultations.length === 0) {
    res.status(404);
    throw new Error("Consultations not found");
  }

  res.status(200).json(consultations);
});
