import express from "express"
import mongoose, { mongo } from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"

const app = express();
app.use(bodyParser.json());
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