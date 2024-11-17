import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// Login User
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isPasswordMatched = await user.matchPassword(password);

  if (!isPasswordMatched) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const payload = {
    userid: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  const token = generateToken(payload, "10d");

  res.cookie("auth", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json(payload);
});

// Register User
export const registerUser = asyncHandler(async (req, res) => {
  const { type, ...body } = req.body;

  const userExists = await User.findOne({ email: body.email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const commonFields = {
    role: type,
    name: body.name,
    email: body.email,
    phoneNumber: body.phoneNumber,
    password: body.password,
    profilePicture: body.profilePicture,
  };

  const userSpecificFields =
    type === "Doctor"
      ? {
          specialty: body.specialty,
          yearsOfExperience: body.yearsOfExperience,
        }
      : type === "Patient"
      ? {
          age: body.age,
          historyOfSurgery: body.historyOfSurgery,
          historyOfIllness: body.historyOfIllness,
          imageBase64: body.profilePicture,
        }
      : {};

  if (type !== "Admin" && !Object.keys(userSpecificFields).length) {
    res.status(400).json({ message: "Invalid user type" });
    return;
  }

  const userdata = { ...commonFields, ...userSpecificFields };

  const user = await User.create(userdata);

  if (user) {
    res.status(201).json({ message: "User created successfully" });
  } else {
    res.status(400).json({ message: "Failed to create user" });
  }
});

// Logout User
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("auth", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

// Get logged In user
export const getCurrentUser = asyncHandler(async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "unathorized" });

  const user = req.user;

  if (user) {
    res.status(200).json(user);
  }
});
