import { useNavigate } from "react-router-dom";
import { useMyContext } from "../app/Context";
import Breadcrum from "./Breadcrum";

const WelcomeAdmin = () => {
  const { currentUser } = useMyContext();
  const navigate = useNavigate();

  return (
    <div className="transition-all duration-300">
      <div className="w-full max-w-screen-sm lg:min-w-[600px] border border-primary p-6 rounded-md bg-white shadow-md">
        <Breadcrum text={`Welcome Admin ${currentUser.name}`} />

        <div className="flex gap-4 mt-5">
          <button
            onClick={() => navigate("/admin/add")}
            className="border border-primary rounded-md px-3 py-1 "
          >
            Add Another Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeAdmin;
