import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Breadcrum from "../../components/Breadcrum";
import profileDummy from "../../assets/profile.png";
import { useMyContext } from "../../app/Context";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const DoctorProfile = () => {
  const [doctorInfo, setDoctorInfo] = useState();
  const { currentUser } = useMyContext();

  const navigate = useNavigate();

  // get all doctors
  const getAllDoctors = async () => {
    try {
      const { data } = await api.get(`/doctors/${currentUser.userid}`);
      setDoctorInfo(data);
    } catch (error) {
      console.log("Error fetching current user", error);
    } finally {
    }
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  return (
    <Layout>
      <div className="transition-all duration-300">
        <div className="mx-auto max-w-screen-sm lg:min-w-[600px] border border-primary p-6 rounded-md bg-white shadow-md">
          <Breadcrum text={`Profile`} />

          <div className="flex flex-col items-center">
            <img
              className="rounded-full w-56 h-56"
              src={doctorInfo?.profilePicture || profileDummy}
              alt="Profile Image"
            />
            <div className="p-6 text-center">
              <h2 className="text-2xl font-semibold text-primary">
                {doctorInfo?.name}
              </h2>
              <p className="text-lg text-gray-500 mt-2">
                {" "}
                {doctorInfo?.specialty}
              </p>
              <p className="text-lg text-gray-500 mt-2">
                {" "}
                {doctorInfo?.yearsOfExperience} Years of Experience
              </p>
            </div>

            <div className="flex text-gray-600 gap-4">
              <p>Phone: {doctorInfo?.phoneNumber}</p>
              <p>Email: {doctorInfo?.email}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-5">
            <button
              onClick={() => navigate("/doctor/prescription")}
              className="border border-primary rounded-md px-3 py-1 "
            >
              Prescriptions
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorProfile;
