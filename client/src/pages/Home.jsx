import React from "react";
import Layout from "../components/Layout";
import { useMyContext } from "../app/Context";
import DoctorsList from "../components/DoctorsList";
import WelcomeDoc from "../components/WelcomeDoc";
import WelcomeAdmin from "../components/WelcomeAdmin";

const Home = () => {
  const { role } = useMyContext();

  return (
    <Layout>
      <div className="max-w-screen-sm lg:min-w-[600px] mx-auto">
        {role === "Patient" && <DoctorsList />}
        {role === "Doctor" && <WelcomeDoc />}
        {role === "Admin" && <WelcomeAdmin />}
      </div>
    </Layout>
  );
};

export default Home;
