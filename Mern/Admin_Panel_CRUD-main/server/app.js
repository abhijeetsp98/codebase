const express = require("express")
const mysql = require("mysql2");
const cors = require("cors"); 
require("./db/conn")
const router = require("./Routes/router")

const app = express();
const port = 8001

app.use(express.json())
app.use(cors());
app.use(router)

app.get("/",(req, res)=>{
    res.send("server start")
})

app.listen(port, ()=>{
    console.log("server start on port: ",port)
})