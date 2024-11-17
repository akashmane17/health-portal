import Consultation from "../models/consultation.js";
import Prescription from "../models/prescriptionModel.js";
import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js"; // Ensure this is imported
import PDFDocument from "pdfkit";

import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get All Doctors
export const getAllDoctors = asyncHandler(async (req, res) => {
  const doctors = await User.find(
    { role: "Doctor" },
    { password: 0, historyOfSurgery: 0, historyOfIllness: 0, __v: 0 }
  );

  res.status(200).json(doctors);
});

// Get Doctor By ID
export const getDoctorById = asyncHandler(async (req, res) => {
  const { id } = req.params; // Extract ID from route params

  const doctor = await User.findOne(
    { _id: id, role: "Doctor" },
    { password: 0, historyOfSurgery: 0, historyOfIllness: 0, __v: 0 }
  );

  if (!doctor) {
    res.status(404);
    throw new Error("Doctor not found");
  }

  res.status(200).json(doctor);
});

// Add consultation to doctor
export const addConsultation = asyncHandler(async (req, res) => {
  const body = req.body;

  const data = {
    doctorId: body.doctorId,
    patientId: body.patientId,
    currentIllnessHistory: body.currentIllness,
    recentSurgery: body.recentSurgery,

    familyMedicalHistory: {
      diabetics: body.diabetics,
      allergies: body.allergies,
      others: body.others,
    },
  };

  const consultation = await Consultation.create(data);

  if (consultation) {
    res.status(201).json({ message: "Consultation created successfully" });
  } else {
    res.status(400).json({ message: "Failed to create consultation" });
  }
});

// Get Doctors Consultation ID
export const getConsultationsByDoctor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const consultations = await Consultation.find({ doctorId: id })
    .populate("patientId", "name email")
    .sort({ createdAt: -1 });

  if (!consultations) {
    res.status(404);
    throw new Error("Consultations not found");
  }

  res.status(200).json(consultations);
});

export const getPrescriptionByConsultationId = asyncHandler(
  async (req, res) => {
    const { id } = req.params;

    const prescription = await Prescription.findOne({ consultationId: id });

    if (prescription) {
      res.status(200).json(prescription);
    } else {
      res.status(404).json({
        message: "Prescription not found for the given consultation ID",
      });
    }
  }
);

export const addPrescription = asyncHandler(async (req, res) => {
  const { doctorId, patientId, consultationId, careInstructions, medicines } =
    req.body;

  const doctor = await User.findById(doctorId);
  const patient = await User.findById(patientId);

  const doctorName = doctor?.name || "Unknown Doctor";
  const patientName = patient?.name || "Unknown Patient";

  let prescription = await Prescription.findOne({ consultationId });

  if (prescription) {
    prescription.careInstructions = careInstructions;
    prescription.medicines = medicines;

    await prescription.save();
  } else {
    prescription = await Prescription.create({
      doctorId,
      patientId,
      consultationId,
      careInstructions,
      medicines,
    });

    if (!prescription) {
      return res.status(400).json({ message: "Failed to create Prescription" });
    }
  }

  // Generate and save the PDF
  const pdfResult = await generateAndSavePDF({
    doctorName,
    patientName,
    careInstructions,
    medicines,
    consultationId,
  });

  if (pdfResult.error) {
    return res
      .status(500)
      .json({ message: "Error saving PDF", error: pdfResult.error });
  }

  prescription.pdfPath = pdfResult.filePath;
  await prescription.save();

  res.status(200).json({
    message: "Prescription processed successfully",
  });
});

export const generateAndSavePDF = ({
  doctorName,
  patientName,
  careInstructions,
  medicines,
  consultationId,
}) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();

    const docsFolder = path.join(__dirname, "..", "docs");

    if (!fs.existsSync(docsFolder)) {
      fs.mkdirSync(docsFolder);
    }

    const filePath = path.join(docsFolder, `${consultationId}.pdf`);

    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);

    doc
      .fontSize(18)
      .text("Prescription", { align: "center", underline: true })
      .moveDown(2);

    doc
      .fontSize(14)
      .text(`Doctor Name: ${doctorName}`)
      .moveDown(1)
      .text(`Patient Name: ${patientName}`)
      .moveDown(2)
      .text("Care Instructions:", { underline: true })
      .text(careInstructions)
      .moveDown(2)
      .text("Medicines:", { underline: true })
      .text(medicines);

    doc.end();

    writeStream.on("finish", () => {
      resolve({ error: null, filePath });
    });

    writeStream.on("error", (err) => {
      reject({ error: err.message, filePath: null });
    });
  });
};
