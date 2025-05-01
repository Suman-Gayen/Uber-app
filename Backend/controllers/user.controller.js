import userModel from "../models/user.models.js";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";
import BlacklistToken from "../models/blacklistToken.model.js";

const registerUser = async (req, res, next) => {
  console.log(req.body);
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  console.log(req.body.email);

  try {
    const { fullName, email, password } = req.body;
    const isFindUser = await userModel.findOne({ email });
    if (isFindUser) {
      return res.status(400).json({ message: "User Already Exist" });
    }
    const hashPassword = await userModel.hashPassword(password);

    const user = await createUser({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashPassword,
    });
    const token = user.generateAuthToken();

    return res
      .status(200)
      .json({ message: "user registered sccessfuly", token, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = user.generateAuthToken(); // Generate a token for the user
    res.cookie("token", token); // Set the token in a cookie

    return res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token"); // Clear the token cookie

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Check if token is present in cookies or authorization header
    await BlacklistToken.create({ token }); // Add the token to the blacklist

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export { registerUser, loginUser, getUserProfile, logoutUser };
