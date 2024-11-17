import mongoose from "mongoose";

const ConsultationSchema = new mongoose.Schema({
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

  currentIllnessHistory: { type: String, required: true },
  recentSurgery: { type: String },

  familyMedicalHistory: {
    diabetics: { type: String, enum: ["Diabetic", "Non-Diabetic"] },
    allergies: { type: String },
    others: { type: String },
  },

  createdAt: { type: Date, default: Date.now },
});

const Consultation = mongoose.model("Consultation", ConsultationSchema);

export default Consultation;
