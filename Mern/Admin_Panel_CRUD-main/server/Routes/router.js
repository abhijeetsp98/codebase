const express = require("express");
const router = express.Router();
const conn = require("../db/conn")
// const users = require("../models/userSchema");


router.post("/register", async (req, res) => {
    // console.log(req.body);
    const { candidatename, gender, currentorganisation, currentdesignation, overallexp, relevantexp,
        qualification, perferredlocation, currentsalary, expectedsalary, variable,
        fixed, other, age, noticeperiod, nationality, visatype, remarks, pannumber,
        linkedinurl, functionalarea, dob, joininglocation, reportinglocation, source,
        maritalstatus, resume } = req.body;

    // if (!name || !email || !age || !mobile || !work || !add || !desc) {
    //     res.status(422).json("plz fill the data");
    // }

    try {
        conn.query("SELECT * FROM jobportal.candidate where candidatename = ?", candidatename, (err, result) => {
            console.log(result)
            if (result.length) {
                res.status(422).json("This candiate already present");
            } else {
                conn.query("INSERT INTO jobportal.candidate set ?", { candidatename, gender, currentorganisation, currentdesignation, overallexp, relevantexp,
                    qualification, perferredlocation, currentsalary, expectedsalary, variable,
                    fixed, other, age, noticeperiod, nationality, visatype, remarks, pannumber,
                    linkedinurl, functionalarea, dob, joininglocation, reportinglocation, source,
                    maritalstatus, resume }, (err, result) => {
                    
                    if (err) {
                        console.log("err", err)
                    } else {
                        res.status(201).json(req.body)
                    }
                })
            }
        })
    } catch (error) {
        console.log(error)
        res.status(422).json(error);
    }
})


// get userdata

router.get("/getusers",async(req,res)=>{
    conn.query("SELECT * FROM jobportal.candidate",(err, result)=>{
        if(err){
            console.log(err)
            res.status(422).json("No data found")
        }else{
            res.status(201).json(result)
        }
    })
})

// delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    const {id} = req.params;

    conn.query("DELETE FROM jobportal.candidate WHERE id=? ",id,(err, result)=>{
        if(err){
            console.log(err)
            res.status(422).json("Error while deleting")
        }else{
            res.status(201).json(result)
        }
    })
})

// get individual user

router.get("/getuser/:id",async(req,res)=>{
    const {id} = req.params;

    conn.query("SELECT * FROM jobportal.candidate WHERE id=? ",id,(err, result)=>{
        if(err){
            console.log(err)
            res.status(422).json("Error while Getting for one id")
        }else{
            res.status(201).json(result)
        }
    })
})

// update user data

router.patch("/updateuser/:id",async(req,res)=>{
    const {id} = req.params;

    const data = req.body;

    conn.query("UPDATE jobportal.candidate SET ? WHERE id = ?",[data,id],(err, result)=>{
        if(err){
            console.log(err)
            res.status(422).json("Error while Getting for one id")
        }else{
            res.status(201).json(result)
        }
    })
})



module.exports = router;









