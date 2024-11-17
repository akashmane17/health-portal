import React from "react";
import profileDummy from "../assets/profile.png";

const DoctorCard = ({ doctorInfo }) => {
  return (
    <div className="mb-6 flex justify-between items-center border border-primary p-4 rounded-md">
      <div className="flex gap-4 items-center">
        <div className="w-16">
          <img
            className="rounded-full"
            src={doctorInfo?.profilePicture || profileDummy}
            alt="profile placeholder"
          />
        </div>

        <div>
          <p className="text-primary font-medium">{doctorInfo?.name}</p>
          <p className="text-gray-500 font-medium">{doctorInfo?.specialty}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
