import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["Doctor", "Patient", "Admin"],
    required: true,
  },

  profilePicture: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Fields specific to Doctor
  specialty: { type: String },
  yearsOfExperience: { type: Number },

  // Fields specific to Patient
  age: { type: Number },
  historyOfSurgery: { type: String },
  historyOfIllness: [{ type: String }],

  createdAt: { type: Date, default: Date.now },
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", UserSchema);

export default User;
