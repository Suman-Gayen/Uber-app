import mongoose from "mongoose";

const connectDb = async () => {
  await mongoose
    .connect(process.env.CONNECT_DB)
    .then(() => {
      console.log("Mongodb connected");
    })
    .catch((err) => console.log(err));
};

export default connectDb;
