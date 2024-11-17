import React, { useEffect, useState } from "react";
import profileDummy from "../assets/profile.png";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import Breadcrum from "./Breadcrum";

const DoctorsList = () => {
  const [doctorsList, setDoctorsList] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getAllDoctors();
  }, []);

  // get all doctors
  const getAllDoctors = async () => {
    try {
      const { data } = await api.get(`/doctors/all`);

      setDoctorsList(data);
    } catch (error) {
      console.log("Error fetching current user", error);
    } finally {
    }
  };

  const handleClick = (id) => {
    navigate(`/doctor/consultation/${id}`);
  };

  return (
    <div>
      <Breadcrum text="Doctor's List" />

      <div className="grid grid-cols-2 gap-4">
        {doctorsList?.map((doctor) => (
          <div
            key={doctor._id}
            className="mb-4 flex justify-between items-center border border-primary p-4 rounded-md"
          >
            <div className="flex gap-4 items-center">
              <div className="w-16">
                <img
                  className="rounded-full"
                  src={doctor?.profilePicture || profileDummy}
                  alt="profile placeholder"
                />
              </div>

              <div>
                <p className="text-primary font-medium">{doctor?.name}</p>
                <p className="text-gray-500 font-medium">{doctor?.specialty}</p>
              </div>
            </div>

            <div>
              <button
                onClick={() => handleClick(doctor?._id)}
                className="bg-success text-white px-3 py-1 rounded-md hover:bg-primary"
              >
                Consult
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
