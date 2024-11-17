import React, { useEffect, useState } from "react";
import { useMyContext } from "../../app/Context";
import Layout from "../../components/Layout";
import api from "../../api/api";
import dayjs from "dayjs";
import Breadcrum from "../../components/Breadcrum";
import toast from "react-hot-toast";
import { url } from "../../constants";

const ConsultationList = () => {
  const { currentUser } = useMyContext();
  const [consultations, setConsultations] = useState();

  // get all doctors
  const getAllConsulation = async () => {
    try {
      const { data } = await api.get(
        `/patients/consultation/${currentUser.userid}`
      );

      setConsultations(data);
    } catch (error) {
      console.log("Error fetching current user", error);
    }
  };

  const DownloadPDF = async (data) => {
    try {
      let consultationId = data._id;

      const response = await api.get(`/doctors/prescription/${consultationId}`);
      const pdfPath = response.data.pdfPath;
      const fileName = `${consultationId}.pdf`;

      if (pdfPath) {
        window.location.href = `${url}/download/${fileName}`;
      } else {
        toast.error("Prescription Not genrated yet");
      }
    } catch (error) {
      toast.error("Prescription Not genrated yet");
    }
  };

  useEffect(() => {
    getAllConsulation();
  }, []);

  return (
    <Layout>
      <div className="max-w-screen-sm lg:min-w-[600px] mx-auto">
        <Breadcrum text="Consultations List" />

        <div className="grid grid-cols-1 gap-4">
          {consultations?.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="p-4">
                <div className="mt-4 space-y-2">
                  <p className="text-xl text-gray-600">
                    <strong className="text-xl text-primary">Doctor: </strong>
                    {item.doctorId.name || "-"}
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

        <button></button>
      </div>
    </Layout>
  );
};

export default ConsultationList;
