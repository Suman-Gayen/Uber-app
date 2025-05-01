import express from "express";
import { registerCaptain } from "../controllers/captain.controller.js";
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

export default captainRouter;
