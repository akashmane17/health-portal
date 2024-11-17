import * as Yup from "yup";

export const consultationSchema = Yup.object({
  currentIllness: Yup.string().required("Current illness is required"),
  recentSurgery: Yup.string().required("Recent surgery is required"),
  diabetics: Yup.string().required("Diabetic value is required"),
  allergies: Yup.string().required("Allergies field is required"),
});

export const prescriptionSchema = Yup.object({
  careInstructions: Yup.string().required("care instructions are required"),
  medicines: Yup.string(),
});
