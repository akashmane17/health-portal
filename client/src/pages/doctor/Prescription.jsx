import React from "react";
import Layout from "../../components/Layout";
import PrescriptionList from "./PrescriptionList";

const Prescription = () => {
  return (
    <Layout>
      <div className="max-w-screen-sm lg:min-w-[600px] mx-auto">
        <PrescriptionList />
      </div>
    </Layout>
  );
};

export default Prescription;
