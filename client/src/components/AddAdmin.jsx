import { Form, Formik } from "formik";
import React from "react";
import Input from "./forms/Input";
import { adminSignUpSchema } from "../schemas/authSchema";
import api from "../api/api";
import toast from "react-hot-toast";
import Layout from "./Layout";

const AddAdmin = () => {
  const initialValues = {
    type: "Admin",
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  };

  const handleSubmit = async (values, action) => {
    try {
      await api.post("/auth/signup", values);
      toast.success("Reagister Successful");
      action.resetForm();
    } catch (error) {
      console.log(error);
      if (error.response.message === "User already exists") {
        toast.error("User already exists");
      } else if (error.response.data.message.includes("E11000")) {
        toast.error("User with same phone number already exists");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Layout>
      <div className="relative flex transition-all duration-300 justify-center mt-[50px]">
        <div className="flex flex-col justify-center">
          <div className="w-full max-w-screen-sm lg:min-w-[600px] border border-primary p-6 rounded-md bg-white shadow-md">
            <div className="mb-4">
              <h3 className=" text-primary text-2xl font-medium">
                Add Admin User
              </h3>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={adminSignUpSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form className="space-y-4">
                  <div>
                    <Input
                      required
                      label="Name"
                      name="name"
                      placeholder="name"
                      type="text"
                    />
                  </div>

                  <div>
                    <Input
                      required
                      label="Phone No."
                      name="phoneNumber"
                      placeholder="00000 00000"
                      type="text"
                    />
                  </div>

                  <div>
                    <Input
                      required
                      label="Email"
                      name="email"
                      placeholder="email@example.com"
                      type="text"
                    />
                  </div>

                  <div>
                    <Input
                      required
                      label="Password"
                      name="password"
                      placeholder="*******"
                      type="password"
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark"
                    >
                      Add
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddAdmin;
