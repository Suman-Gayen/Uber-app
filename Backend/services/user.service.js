import userModel from "../models/user.models.js";

const userService = async ({ firstName, lastName, email, password }) => {
  if (!firstName || !lastName || !email || !password) {
    throw new Error(" All fields are required ");
  }

  // Check if a user with the same email already exists
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }
  const user = await userModel.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password,
  });
  return user;
};
export default userService;
