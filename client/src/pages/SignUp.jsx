import { useState } from "react";
import DoctorSignUpForm from "../components/DoctorsSignUpForm";
import PatientSignUpForm from "../components/PatientSignUpForm";

const SignUp = () => {
  const [selectedForm, setSelectedForm] = useState("doctor");

  return (
    <>
      <div className="relative flex transition-all duration-300 justify-center mt-[50px]">
        <div className="flex flex-col justify-center">
          <div className="w-full justify-center flex gap-2">
            <button
              className={`px-6 py-2 font-bold rounded text-primary ${
                selectedForm === "doctor"
                  ? "border-b-2 border-primary"
                  : "border border-transparent "
              }`}
              onClick={() => setSelectedForm("doctor")}
            >
              Doctor
            </button>
            <button
              className={`px-6 py-2 font-bold rounded text-primary ${
                selectedForm === "patient"
                  ? "border-b-2 border-primary"
                  : "border border-transparent "
              }`}
              onClick={() => setSelectedForm("patient")}
            >
              Patient
            </button>
          </div>

          {selectedForm === "doctor" && <DoctorSignUpForm />}
          {selectedForm === "patient" && <PatientSignUpForm />}
        </div>
      </div>
    </>
  );
};

export default SignUp;
