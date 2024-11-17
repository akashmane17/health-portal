import { Navigate } from "react-router-dom";
import { useMyContext } from "../app/Context";

const ProtectedRoute = ({ children, adminPage, doctorPage, patientPage }) => {
  const { currentUser, appLoading, role } = useMyContext();

  if (appLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/signin" />;
  }

  if (adminPage && role !== "Admin") {
    return <Navigate to="/" />;
  }

  if (doctorPage && role !== "Doctor") {
    return <Navigate to="/" />;
  }

  if (patientPage && role !== "Patient") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
