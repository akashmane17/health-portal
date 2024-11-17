import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Input from "./forms/Input";
import { prescriptionSchema } from "../schemas/doctorSchema";
import api from "../api/api";
import toast from "react-hot-toast";

const PrescriptionForm = ({ closeForm, data }) => {
  const [prescription, setPrescription] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const getPrescription = async () => {
    try {
      setIsLoading(true);
      let consultationId = data._id;
      const response = await api.get(`/doctors/prescription/${consultationId}`);

      setPrescription(response.data);
    } catch (error) {
      console.log(error);
      setPrescription(null);
    } finally {
      setIsLoading(false);
    }
  };

  const initialValues = prescription
    ? {
        careInstructions: prescription.careInstructions || "",
        medicines: prescription.medicines || "",
      }
    : {
        careInstructions: "",
        medicines: "",
      };

  const handleSubmit = async (values, action) => {
    try {
      values.consultationId = data._id;
      values.doctorId = data.doctorId;
      values.patientId = data.patientId._id;

      if (prescription) {
        const res = await api.put(
          `/doctors/prescription/${prescription._id}`,
          values
        );

        toast.success("Prescription updated successfully");
      } else {
        const res = await api.put("/doctors/prescription/sdfdsf", values);

        toast.success("Prescription created successfully");
      }

      action.resetForm();
      closeForm();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getPrescription();
  }, [data]);

  if (isLoading) {
    return (
      <div className="text-center">
        <p>Loading prescription data...</p>
      </div>
    );
  }

  return (
    <div className="relative flex transition-all duration-300 justify-center mt-[50px]">
      <div className="flex flex-col justify-center">
        <div className="w-full max-w-screen-sm lg:min-w-[600px] border border-primary p-6 rounded-md bg-white shadow-md">
          <div className="mb-4 flex justify-between">
            <h3 className="text-primary text-2xl font-medium">
              Prescription Form
            </h3>
            <button onClick={closeForm} className="text-xl text-error">
              close
            </button>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={prescriptionSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form className="space-y-4">
                <div>
                  <Input
                    required
                    label="Care Instructions"
                    name="careInstructions"
                    placeholder="Instructions..."
                    type="text"
                    value={values.careInstructions}
                  />
                </div>

                <div>
                  <Input
                    required
                    label="Medicines"
                    name="medicines"
                    placeholder="Medicines..."
                    type="text"
                    value={values.medicines}
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark"
                  >
                    {prescription ? "Update" : "Create"} Prescription
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionForm;
