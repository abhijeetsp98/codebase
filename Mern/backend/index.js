import express from "express"
import mongoose, { mongo } from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import route from "./routes/userRoute.js"
import cors from 'cors'

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL)
        .then(()=>{
            console.log("DB is connected")
            app.listen(PORT, ()=>{
                console.log(`Server is connected : ${PORT}`)
            });
        })
        .catch((error)=>console.log(error));

// middleware
app.use("/api", route);