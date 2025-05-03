import BlacklistToken from "../models/blacklistToken.model.js";
import captainModel from "../models/captain.model.js";
import createCaptain from "../services/captain.Service.js";
import { validationResult } from "express-validator";

const registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password, vehicle } = req.body;
  const isFindCaptain = await captainModel.findOne({ email });
  if (isFindCaptain) {
    return res.status(400).json({ message: "Captain Already Exist" });
  }

  const hashedPassword = await captainModel.hashPassword(password);
  const newCaptain = await createCaptain({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capaCity: vehicle.capaCity,
    vchileType: vehicle.vchileType,
  });
  const token = newCaptain.generateAuthToken();
  return res.status(200).json({
    message: "Captain registered successfully",
    token,
    captain: newCaptain,
  });
};
const loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = captain.generateAuthToken(); // Generate a token for the captain
    res.cookie("token", token); // Set the token in a cookie
    // Optionally, you can set the token in the response body as well
    return res
      .status(200)
      .json({ message: "Captain logged in successfully", token, captain });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getCaptainProfile = async (req, res) => {
  try {
    const captain = await captainModel
      .findById(req.captain._id)
      .select("-password");
    if (!captain) {
      res.status(404).json({ message: "captain not found" });
    }
    return res.status(200).json({ captain });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const logoutCaptain = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  await BlacklistToken.create({ token });
  res.clearCookie("token");

  res.status(200).json({ message: "Logout Done" });
};

export { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain };
