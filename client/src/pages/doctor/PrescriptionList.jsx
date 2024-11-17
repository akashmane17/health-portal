import React, { useEffect, useState } from "react";
import { useMyContext } from "../../app/Context";
import api from "../../api/api";
import dayjs from "dayjs";
import Breadcrum from "../../components/Breadcrum";
import PrescriptionForm from "../../components/PrescriptionForm";
import toast from "react-hot-toast";

const PrescriptionList = () => {
  const { currentUser } = useMyContext();
  const [consultations, setConsultations] = useState();
  const [consultation, setConsultation] = useState();

  const [isEdit, setIsEdit] = useState(false);

  // get all doctors
  const getAllConsulation = async () => {
    try {
      const { data } = await api.get(
        `/doctors/consultation/${currentUser.userid}`
      );

      setConsultations(data);
    } catch (error) {
      console.log("Error fetching current user", error);
    }
  };

  const closeForm = () => {
    setIsEdit(false);
  };

  const selectPrescription = (data) => {
    setConsultation(data);
    setIsEdit(true);
  };

  const DownloadPDF = async (data) => {
    try {
      let consultationId = data._id;

      const response = await api.get(`/doctors/prescription/${consultationId}`);
      const pdfPath = response.data.pdfPath;
      const fileName = `${consultationId}.pdf`;

      if (pdfPath) {
        window.location.href = `http://localhost:5000/download/${fileName}`;
      } else {
        toast.error("Prescription Not genrated yet");
      }
    } catch (error) {
      toast.error("Prescription Not genrated yet");
    }
  };

  useEffect(() => {
    getAllConsulation();
  }, [currentUser]);

  return (
    <div className="max-w-screen-sm lg:min-w-[600px] mx-auto">
      <Breadcrum text="Prescription" />

      {isEdit ? (
        <PrescriptionForm closeForm={closeForm} data={consultation} />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {consultations?.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="p-4">
                <div className="mt-4 space-y-2">
                  <p className="text-xl text-gray-600">
                    <strong className="text-xl text-primary">Patient: </strong>
                    {item.patientId.name || "-"}
                  </p>

                  <p className="text-sm text-gray-600">
                    <strong>Current Illness: </strong>
                    {item.currentIllnessHistory || "No history"}
                  </p>

                  <p className="text-sm text-gray-600">
                    <strong>Recent Surgery: </strong>
                    {item.recentSurgery || "N/A"}
                  </p>

                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      <strong>Diabetics: </strong>
                      {item.familyMedicalHistory.diabetics || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Allergies: </strong>
                      {item.familyMedicalHistory.allergies || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Others: </strong>
                      {item.familyMedicalHistory.others || "N/A"}
                    </p>

                    <p className="text-sm text-gray-500">
                      <strong>Date of Creation: </strong>
                      {dayjs(item.createdAt).format("MMMM D, YYYY, HH:mm")}
                    </p>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={() => selectPrescription(item)}
                      type="submit"
                      className="w-full text-primary font-medium hover:underline py-2 rounded-md hover:bg-primary-dark"
                    >
                      Update Prescription
                    </button>

                    <button
                      onClick={() => DownloadPDF(item)}
                      type="submit"
                      className="w-full text-primary font-medium hover:underline py-2 rounded-md hover:bg-primary-dark"
                    >
                      Get PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button></button>
    </div>
  );
};

export default PrescriptionList;
