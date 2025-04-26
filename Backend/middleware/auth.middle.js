import jwt from "jsonwebtoken";
import userModel from "../models/user.models.js";

const authMiddleware = async (req, res, next) => {

  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Check if token is present in cookies or authorization header  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized fetched in cookie" });
  }
  const isBlacklisted = await userModel.findOne({ token: token });
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

export default authMiddleware;