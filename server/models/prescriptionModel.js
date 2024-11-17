import mongoose from "mongoose";

const PrescriptionSchema = new mongoose.Schema({
  consultationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Consultation",
    required: true,
  },

  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  careInstructions: { type: String, required: true },
  medicines: { type: String },

  pdfPath: { type: String },

  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const Prescription = mongoose.model("Prescription", PrescriptionSchema);

export default Prescription;
