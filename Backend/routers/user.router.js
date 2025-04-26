import express from "express";
import {registerUser, loginUser, getUserProfile, logoutUser} from "../controllers/user.controller.js";
import { body } from "express-validator";
import authMiddleware from "../middleware/auth.middle.js";
const userRouter = express.Router();

userRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First Name is required"),
    body("fullName.lastName")
      .isLength({ min: 3 })
      .withMessage("Last Name is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password Length should be 6 charecter"),
  ],
  registerUser
);
userRouter.post(
  "/login",
  [
   body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password Length should be 6 charecter"),
  ],
  loginUser
);
userRouter.get("/profile", authMiddleware, getUserProfile);
userRouter.get("/logout", authMiddleware, logoutUser);


export default userRouter;
