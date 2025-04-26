import http from "http"
import app from "./app.js"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./db/index.db.js"
connectDb()

const server = http.createServer(app)




server.listen(process.env.PORT || 4000, () => {
    console.log("server is runing at port 3000");
    
})