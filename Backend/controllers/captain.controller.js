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

export { registerCaptain };