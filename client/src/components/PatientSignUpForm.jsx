import { Form, Formik } from "formik";
import Input from "./forms/Input";
import { doctorSignUpSchema, patientSignUpSchema } from "../schemas/authSchema";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";

const PatientSignUpForm = () => {
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Check file size
      if (file.size > 1024 * 1024) {
        setError("Image size exceeds 1MB. Please upload a smaller image.");
        setImage(null);
        setBase64(null);
        return;
      }

      setError(null);

      // Preview image
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setBase64(reader.result); // Store Base64
      };
      reader.readAsDataURL(file);
    }
  };

  const initialValues = {
    type: "Patient",
    name: "",
    age: "",
    email: "",
    phoneNumber: "",
    historyOfSurgery: "",
    historyOfIllness: "",
    password: "",
    imageBase64: "",
  };

  const handleSubmit = async (values, action) => {
    if (base64) {
      values.profilePicture = base64;
    }

    try {
      setLoading(true);
      const response = await api.post("/auth/signup", values);

      toast.success("Reagister Successful");
      action.resetForm();
      if (response.data) {
        navigate("/signin");
      }
    } catch (error) {
      if (error.response.message === "User already exists") {
        toast.error("User already exists");
      } else if (error.response.data.message.includes("E11000")) {
        toast.error("User with same phone number already exists");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-4">
      <div className="flex justify-center">
        <div className="w-full max-w-screen-sm lg:min-w-[600px] border border-primary p-6 rounded-md bg-white shadow-md">
          <div className="mb-4">
            <h3 className="text-primary text-2xl font-medium">Sign Up</h3>
            <p className=" text-primary text-md">{`(For Patients)`}</p>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={patientSignUpSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-4">
                {/* Image Section */}
                <div className="flex flex-col items-center justify-center">
                  <div className="bg-white shadow-md rounded-lg p-6 w-full">
                    {error && (
                      <p className="text-red-500 text-sm text-center mb-4">
                        {error}
                      </p>
                    )}
                    <div className="flex flex-col items-center">
                      {/* Image Preview */}
                      <div className="w-32 h-32 mb-4 border rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                        {image ? (
                          <img
                            src={image}
                            alt="Profile Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-400">No Image</span>
                        )}
                      </div>

                      {/* File Input */}
                      <label className="w-full border border-primary text-primary py-1 px-2 rounded-lg cursor-pointer mb-4">
                        Select Profile picture
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                {/* Image Section */}

                <div>
                  <Input
                    required
                    label="Name"
                    name="name"
                    placeholder="Your name"
                    type="text"
                  />
                </div>

                <div>
                  <Input
                    required
                    label="Age"
                    name="age"
                    placeholder="Your age"
                    type="number"
                  />
                </div>

                <div>
                  <Input
                    required
                    label="History Of Surgery"
                    name="historyOfSurgery"
                    placeholder="Your text"
                    type="text"
                  />
                </div>

                <div>
                  <Input
                    required
                    label="History Of Illness"
                    name="historyOfIllness"
                    placeholder="Your text"
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
                    Sign Up as a Patient
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="mt-4">
            <p>
              Already have an account? go to{" "}
              <Link className="text-primary font-bold underline" to="/signin">
                Sign In
              </Link>{" "}
              here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSignUpForm;
