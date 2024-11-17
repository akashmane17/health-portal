import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import Layout from "../../components/Layout";
import TextArea from "../../components/forms/TextArea";
import Input from "../../components/forms/Input";
import RadioGroup from "../../components/forms/RadioGroup";
import StepIndicator from "../../components/StepIndication";
import { consultationSchema } from "../../schemas/doctorSchema";
import { useMyContext } from "../../app/Context";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import DoctorCard from "../../components/DoctorCard";
import toast from "react-hot-toast";

const Consultation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [doctorInfo, setDoctorInfo] = useState();
  const { currentUser } = useMyContext();
  const { id: doctorId } = useParams();

  const navigate = useNavigate();

  const initialValues = {
    doctorId: "",
    patientId: "",
    currentIllness: "",
    recentSurgery: "",
    diabetics: "",
    allergies: "",
    others: "",
  };

  const getDoctor = async () => {
    try {
      const response = await api.get(`/doctors/${doctorId}`);

      setDoctorInfo(response.data);
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    getDoctor();
  }, [doctorId]);

  const handleSubmit = async (values) => {
    try {
      values.doctorId = doctorId;
      values.patientId = currentUser.userid;

      await api.post("/doctors/consultation", values);

      navigate("/patient/consultations");
      toast.success("Consultation created");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const steps = [
    {
      id: 1,
      component: () => (
        <div className="space-y-2">
          <TextArea label="Current Illness History" name="currentIllness" />
          <Input label="Recent Surgery (Time Span)" name="recentSurgery" />
        </div>
      ),
    },
    {
      id: 2,
      component: () => (
        <div className="space-y-2">
          <RadioGroup
            label="Family Medical History"
            name="diabetics"
            options={[
              { value: "Diabetic", label: "Diabetic" },
              { value: "Non-Diabetic", label: "Non-Diabetic" },
            ]}
          />
          <Input label="Any Allergies" name="allergies" />
          <Input label="Others" name="others" />
        </div>
      ),
    },
    {
      id: 3,
      component: (values) => (
        <div className="text-center">
          <div className="border border-primary rounded-md text-lg p-2 flex flex-col gap-3 items-start">
            <div className="flex flex-col items-start">
              <p className="text-lg font-medium text-primary">
                Current Illeness
              </p>
              <p className="text-gray-600 font-medium">
                {values.currentIllness}
              </p>
            </div>

            <div className="flex flex-col items-start">
              <p className="text-lg font-medium text-primary">Resent Surgery</p>
              <p className="text-gray-600 font-medium">
                {values.recentSurgery}
              </p>
            </div>

            <div className="flex flex-col items-start">
              <p className="text-lg font-medium text-primary">Diabetics</p>
              <p className="text-gray-600 font-medium">{values.diabetics}</p>
            </div>

            <div className="flex flex-col items-start">
              <p className="text-lg font-medium text-primary">Allergies</p>
              <p className="text-gray-600 font-medium">{values.allergies}</p>
            </div>

            <div className="flex flex-col items-start">
              <p className="text-lg font-medium text-primary">Others</p>
              <p className="text-gray-600 font-medium">{values.others}</p>
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary text-white px-6 py-2 rounded mt-4"
          >
            Submit
          </button>
        </div>
      ),
    },
  ];

  const goNext = (errors, values) => {
    if (currentStep === 1) {
      if (
        errors.currentIllness ||
        errors.recentSurgery ||
        !values.currentIllness ||
        !values.recentSurgery
      )
        return;
    } else if (currentStep === 2) {
      if (
        errors.diabetics ||
        errors.allergies ||
        !values.diabetics ||
        !values.allergies
      )
        return;
    }

    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const goBack = (setStep) => {
    if (currentStep > 1) setStep(currentStep - 1);
  };

  return (
    <Layout>
      <div className="max-w-screen-sm lg:min-w-[600px] mx-auto mt-[30px]">
        <h2 className="text-2xl text-primary font-medium mb-6">
          Consultation to
        </h2>

        <DoctorCard doctorInfo={doctorInfo} />

        <Formik
          initialValues={initialValues}
          validationSchema={consultationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors }) => (
            <Form className="">
              <StepIndicator
                currentStep={currentStep}
                totalSteps={steps.length}
              />

              {steps.find((step) => step.id === currentStep)?.component(values)}

              <div className="flex justify-between mt-6">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => goBack(setCurrentStep)}
                    className="bg-gray-300 px-4 py-2 rounded"
                  >
                    Back
                  </button>
                )}
                {currentStep < steps.length ? (
                  <button
                    type="button"
                    onClick={() => goNext(errors, values)}
                    className="bg-primary text-white px-4 py-2 rounded"
                  >
                    Next
                  </button>
                ) : null}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default Consultation;
