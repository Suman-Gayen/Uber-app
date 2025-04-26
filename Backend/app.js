import dotenv from "dotenv"
dotenv.config();
import cors from "cors"
import express from "express";
import userRouter from "./routers/user.router.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())


app.get("/", (req, res) => {
    res.send("Server is working")
})
app.use("/users", userRouter)
export default app;