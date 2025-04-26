import userModel from "../models/user.models.js";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";
const registerUser = async (req, res, next) => {
  console.log(req.body);
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  console.log(req.body.email);

  try {
    const { fullName, email, password } = req.body;
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

const loginUser = async (req, res ) => {
try {
  const { email, password }= req.body;
  const user =  await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = user.generateAuthToken();
  return res.status(200).json({ message: "Login successful", token, user });
} catch (error) {
  console.log(error);
  return res.status(500).json({ message: error.message });
}
}


export  {registerUser,loginUser};
