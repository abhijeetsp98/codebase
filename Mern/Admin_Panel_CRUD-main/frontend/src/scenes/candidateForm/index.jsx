import { Box, Button, TextField, FormControl, Divider, Radio, RadioGroup, FormControlLabel, FormLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useContext, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { adddata } from '../../components/context/ContextProvider';
import Stack from "@mui/material/Stack";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Country, State, City }  from 'country-state-city';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const CandidateForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const { udata, setUdata } = useContext(adddata);
  const tempCities = City.getCitiesOfState('IN','MH')
  var cities = []
  tempCities.forEach((val)=>{
      cities.push(val.name)
  })
  const tempStates = State.getStatesOfCountry('IN')
  var states = []
  tempStates.forEach((val)=>{
      states.push(val.name)
  })

  // const history = useHistory();

  const [inpval, setINP] = useState({
    candidatename: "",
    gender: "",
    currentorganisation: "",
    currentdesignation: "",
    overallexp: "",
    relevantexp: "",
    qualification: "",
    perferredlocation: "",
    currentsalary: "",
    expectedsalary: "",
    variable: "",
    fixed: "",
    other: "",
    age: "",
    noticeperiod: "",
    nationality: "",
    visatype: "",
    remarks: "",
    pannumber: "",
    linkedinurl: "",
    functionalarea: "",
    dob: "",
    joininglocation: "",
    reportinglocation: "",
    source: "",
    maritalstatus: "",
    resume: "",
  })

  const getAge = (val)=>{
    if(val){
      var today = new Date()
      var year = val[0]+val[1]+val[2]+val[3]
      year = parseInt(year)
      return today.getFullYear() - year
    }else{
      return 0
    }
  };
  

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value
      }
    })
  }


  const addinpdata = async (e) => {
    e.preventDefault();

    const { candidatename, gender, currentorganisation, currentdesignation, overallexp, relevantexp,
      qualification, perferredlocation, currentsalary, expectedsalary, variable,
      fixed, other, age, noticeperiod, nationality, visatype, remarks, pannumber,
      linkedinurl, functionalarea, dob, joininglocation, reportinglocation, source,
      maritalstatus, resume } = inpval;

    const res = await fetch("http://localhost:8001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        candidatename, gender, currentorganisation, currentdesignation, overallexp, relevantexp,
        qualification, perferredlocation, currentsalary, expectedsalary, variable,
        fixed, other, age, noticeperiod, nationality, visatype, remarks, pannumber,
        linkedinurl, functionalarea, dob, joininglocation, reportinglocation, source,
        maritalstatus, resume
      })
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
      alert("error");

    } else {
      // history.push("/")
      setUdata(data)
      console.log("data added");

    }
  }

  return (
    <Box m="20px">
      <Header title="Create Candidate" subtitle="Create a New candidate Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form className="mt-4">
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Personal Information" />
                  </ListItemButton>
                </ListItem>
              </List>
              <divider/>
              <divider/>
              <divider/>
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Profile photo" />
                  </ListItemButton>
                  <TextField  label="Resume" type={"file"} inputProps={{accept:"application/pdf"}}/>
                </ListItem>
              </List>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Full Name"
                onBlur={handleBlur}
                value={inpval.candidatename}
                onChange={setdata}
                name="candidatename"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <divider></divider>
              <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Marital Status</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel value="female" control={<Radio />} label="Yes" />
                <FormControlLabel value="male" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
              <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
             

              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Gender"
                onBlur={handleBlur}
                value={inpval.currentorganisation}
                onChange={setdata}
                name="currentorganisation"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              /> */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact No"
                onBlur={handleBlur}
                value={inpval.currentdesignation}
                onChange={setdata}
                name="currentdesignation"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Alternate No"
                onBlur={handleBlur}
                value={inpval.overallexp}
                onChange={setdata}
                name="overallexp"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Mail ID"
                onBlur={handleBlur}
                value={inpval.relevantexp}
                onChange={setdata}
                name="relevantexp"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                value={inpval.qualification}
                onChange={setdata}
                name="qualification"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              
              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-filled-label">Nationality</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  onChange={handleChange}
                >
                  
                  <MenuItem value={10}>Indian</MenuItem>
                  <MenuItem value={20}>American</MenuItem>
                  <MenuItem value={30}>British</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-filled-label">State</InputLabel>
                <Select
                  size="10"
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  
                  onChange={handleChange} // we want to work in controlled mode
                  onBlur={handleBlur}
                >
                  {states?.map(option => {
                      return (
                        <MenuItem key={option} value={option}>
                          {option ?? option}
                        </MenuItem>
                      );
                  })}
                </Select>
              </FormControl>
              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-filled-label">City</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  size=""
                  onChange={handleChange} // we want to work in controlled mode
                  onBlur={handleBlur}
                >
                  {cities?.map(option => {
                      return (
                        <MenuItem key={option} value={option}>
                          {option ?? option}
                        </MenuItem>
                      );
                  })}
                </Select>
              </FormControl>
             
            
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Date Of Birth"
                onBlur={handleBlur}
                value={inpval.dob}
                onChange={setdata}
                name="dob"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Age"
                onBlur={handleBlur}
                value={getAge(inpval.dob)}
                onChange={setdata}
                name="age"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
               
              
             
               
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Education Info" />
                  </ListItemButton>
                </ListItem>
              </List>
              <divider/>
              <divider/>

               <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-filled-label">Education</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>High School</MenuItem>
                  <MenuItem value={2}>Under Graduate</MenuItem>
                  <MenuItem value={3}>Post Graduate</MenuItem>
                  <MenuItem value={4}>Phd</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Institue"
                onBlur={handleBlur}
                value={inpval.institute}
                onChange={setdata}
                name="institute"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-filled-label">Course</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  onChange={handleChange}
                >
                  <MenuItem value={30}>B Tech</MenuItem>
                  <MenuItem value={10}>M Tech</MenuItem>
                  <MenuItem value={20}>Phd</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-filled-label">Branch</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  onChange={handleChange}
                >
                  <MenuItem value={30}>Computer Science</MenuItem>
                  <MenuItem value={10}>Civil Engineering</MenuItem>
                  <MenuItem value={20}>Mechanical Engineering</MenuItem>
                </Select>
              </FormControl>
               <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-filled-label">Education type</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  onChange={handleChange}
                >
                  <MenuItem value={30}>Correspondence</MenuItem>
                  <MenuItem value={10}>Part Time</MenuItem>
                  <MenuItem value={20}>Full Time</MenuItem>
                </Select>
              </FormControl>
               <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-filled-label">Year of Degree</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  onChange={handleChange}
                >
                  <MenuItem value={31}>1998 </MenuItem>
                  <MenuItem value={12}>1999 </MenuItem>
                  <MenuItem value={23}>2000 </MenuItem>
                  <MenuItem value={34}>2001 </MenuItem>
                  <MenuItem value={35}>2002 </MenuItem>
                  <MenuItem value={36}>2003 </MenuItem>
                </Select>
              </FormControl>
              <TextField
                
                id="outlined-multiline-static"
                label="Other Certificate & Courses"
                multiline
                rows={4}
                defaultValue="Default Value"
                fullWidth
                variant="filled"
                type="text"
                onBlur={handleBlur}
                value={inpval.perferredlocation}
                onChange={setdata}
                maxRows={4}
                name="perferredlocation"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                id="outlined-multiline-static"
                label="Skills"
                multiline
                rows={4}
                defaultValue="Default Value"
                fullWidth
                variant="filled"
                type="text"
                onBlur={handleBlur}
                value={inpval.perferredlocation}
                onChange={setdata}
                maxRows={4}
                name="perferredlocation"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <divider/>
              <divider/>
              <divider/>
              <divider/>
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Work Experience" />
                  </ListItemButton>
                </ListItem>
              </List>
              <Box>
              <Button type="submit" onClick={addinpdata} color="secondary" variant="contained">
                  Fresher
                </Button>
              </Box>
              <divider/>
              <divider/>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Designation"
                onBlur={handleBlur}
                value={inpval.designation}
                onChange={setdata}
                name="designation"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Department"
                onBlur={handleBlur}
                value={inpval.Department}
                onChange={setdata}
                name="Department"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Company Name"
                onBlur={handleBlur}
                value={inpval.CompanyName}
                onChange={setdata}
                name="CompanyName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Industry"
                onBlur={handleBlur}
                value={inpval.Industry}
                onChange={setdata}
                name="Industry"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Exclude Industry"
                onBlur={handleBlur}
                value={inpval.ExcludeIndustry}
                onChange={setdata}
                name="ExcludeIndustry"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Durations"
                onBlur={handleBlur}
                value={inpval.Durations}
                onChange={setdata}
                name="Durations"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              
                <Box display="flex" justifyContent="center" mt="20px">
                <Button type="submit" onClick={addinpdata} color="secondary" variant="contained">
                  Add More Work Experience
                </Button>
              </Box>
              <divider/>
              <divider/>
              <divider/>
              
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Salary" />
                  </ListItemButton>
                </ListItem>
              </List>
              <divider/>
              <divider/>


              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-filled-label">Current CTC</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>0 - 3 Lakh</MenuItem>
                  <MenuItem value={2}>3 - 7 Lakh</MenuItem>
                  <MenuItem value={3}>7 - 12 Lakh</MenuItem>
                  <MenuItem value={4}>12 -18 Lakh</MenuItem>
                  <MenuItem value={4}>18 - Above</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-filled-label">Expected CTC</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  onChange={handleChange}
                >
                  <MenuItem value={1}>0 - 3 Lakh</MenuItem>
                  <MenuItem value={2}>3 - 7 Lakh</MenuItem>
                  <MenuItem value={3}>7 - 12 Lakh</MenuItem>
                  <MenuItem value={4}>12 -18 Lakh</MenuItem>
                  <MenuItem value={4}>18 - Above</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Notice Period"
                onBlur={handleBlur}
                value={inpval.noticeperiod}
                onChange={setdata}
                name="noticeperiod"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Prefer Location"
                onBlur={handleBlur}
                value={inpval.nationality}
                onChange={setdata}
                name="nationality"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
             
              
              {/* <Stack direction="row" alignItems="center" spacing={2}>
                <Button variant="contained" component="label">
                  Resume Upload
                  <input hidden accept="image/*" multiple type="file" />
                </Button>
              </Stack> */}
             
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Resume" />
                  </ListItemButton>
                  <TextField  label="Resume" type={"file"} inputProps={{accept:"application/pdf"}}/>
                </ListItem>
              </List>
              <divider/>
               
               <divider/>
               <divider/>
               
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="ID Proof" />
                  </ListItemButton>
                  <TextField  label="Resume" type={"file"} inputProps={{accept:"application/pdf"}}/>
                </ListItem>
              </List>
              <divider/>
              <divider/>
               <divider/>
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Additonal Documents"
                onBlur={handleBlur}
                value={inpval.nationality}
                onChange={setdata}
                name="nationality"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Document" />
                  </ListItemButton>
                  <TextField  label="Resume" type={"file"} inputProps={{accept:"application/pdf"}}/>
                </ListItem>
              </List>

            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" onClick={addinpdata} color="secondary" variant="contained">
                Create New client
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  candidatename: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  candidatename: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

export default CandidateForm;
