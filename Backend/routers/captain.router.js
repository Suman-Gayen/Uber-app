import express from "express";
import { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain  } from "../controllers/captain.controller.js";
import { authCaptain } from "../middleware/auth.middle.js";
const captainRouter = express.Router();

import { body } from "express-validator";

captainRouter.post(
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
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Vehicle Color is required"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Vehicle Plate is required"),
    body("vehicle.capaCity")
      .isInt({ min: 1 })
      .withMessage("Vehicle capaCity is required"),
    body("vehicle.vchileType")
      .isIn(["car", "bike", "auto"])
      .isLength({ min: 3 })
      .withMessage("Vehicle Type is required"),
  ],
  registerCaptain
);
captainRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password Length should be 6 charecter"),
  ],
  loginCaptain
)
captainRouter.get("/profile", authCaptain, getCaptainProfile);
captainRouter.get("/logout", authCaptain, logoutCaptain);
export default captainRouter;
