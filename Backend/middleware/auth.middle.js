import jwt from "jsonwebtoken";
import userModel from "../models/user.models.js";
import captainModel from "../models/captain.model.js";
import BlacklistToken from "../models/blacklistToken.model.js";

const authMiddleware = async (req, res, next) => {

  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Check if token is present in cookies or authorization header  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized fetched in cookie" });
  }
  const isBlacklisted = await BlacklistToken.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized fetched in black list" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const authCaptain = async ( req, res, next ) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Check if token is present in cookies or authorization header
  if (!token) {
    return res.status(401).json({ message: "Unauthorized fetched in cookie" });
  }
  const isBlacklisted = await BlacklistToken.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized fetched in black list" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    if (!captain) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.captain = captain;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
    
  }
}

export  { authMiddleware, authCaptain};