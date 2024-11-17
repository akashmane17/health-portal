import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import PageNotFound from "../pages/PageNotFound";
import DoctorProfile from "../pages/doctor/DoctorProfile";
import Prescription from "../pages/doctor/Prescription";
import ProtectedRoute from "../components/ProtectedRoute";
import ReverseAuthRoute from "../components/ReverseAuth";
import Consultation from "../pages/doctor/Consultation";
import ConsultationList from "../pages/patient/ConsultationList";
import AddAdmin from "../components/AddAdmin";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/signup"
        element={
          <ReverseAuthRoute>
            <SignUp />
          </ReverseAuthRoute>
        }
      />

      <Route
        path="/signin"
        element={
          <ReverseAuthRoute>
            <SignIn />
          </ReverseAuthRoute>
        }
      />

      <Route
        index
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<PageNotFound />} />

      {/* Doctor Routes */}
      <Route
        path="/doctor/profile"
        element={
          <ProtectedRoute doctorPage={true}>
            <DoctorProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/doctor/prescription"
        element={
          <ProtectedRoute doctorPage={true}>
            <Prescription />
          </ProtectedRoute>
        }
      />

      {/* Patients Routes */}
      <Route
        path="/doctor/consultation/:id"
        element={
          <ProtectedRoute patientPage={true}>
            <Consultation />
          </ProtectedRoute>
        }
      />

      <Route
        path="/patient/consultations"
        element={
          <ProtectedRoute patientPage={true}>
            <ConsultationList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/add"
        element={
          <ProtectedRoute adminPage={true}>
            <AddAdmin />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
