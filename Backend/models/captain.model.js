import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const captainSchema = mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minLength: [3, "First Name must be atleast 3 charecter"],
    },
    lastName: {
      type: String,
      minLength: [3, "Last Name must be atleast 3 charecter"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowerCase: true,
    match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketID: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minLength: [3, "Vehicle Color must be atleast 3 charecter"],
    },
    plate: {
      type: String,
      required: true,
      minLength: [3, "Vehicle Plate must be atleast 3 charecter"],
    },
    capaCity: {
      type: Number,
      required: true,
      min: [1, "Vehicle capacity must be atleast 1"],
    },
    vchileType: {
      type: String,
      enum: ["car", "bike", "auto"],
      required: true,
    },
  },
  location: {
    lat: {
      type: Number,
    },
    long: {
      type: Number,
    },
  },
});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};
captainSchema.statics.hashedPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};




const captainModel = mongoose.model("Captain", captainSchema);
export default captainModel;
