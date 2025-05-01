import dotenv from "dotenv"
dotenv.config();
import cors from "cors"
import express from "express";
import userRouter from "./routers/user.router.js";
import captainRouter from "./routers/captain.router.js";
import cookieParser from "cookie-parser";

const app = express();



app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser())


app.get("/", (req, res) => {
    res.send("Server is working")
})
app.use("/users", userRouter)
app.use("/captains", captainRouter)
export default app;