import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Button from '@mui/material/Button';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Header from "../../components/Header";
import React, { useState, useEffect, useContext } from 'react'


const Candidate = () => {
  var allData = [
    {
        "id": 3,
        "candidatename": "Akshay Nevla",
        "gender": "Male",
        "currentorganisation": "Freelancer",
        "currentdesignation": "Engineer",
        "overallexp": "5",
        "relevantexp": "2",
        "qualification": "M tech",
        "perferredlocation": "Nagpur",
        "currentsalary": "1200000",
        "expectedsalary": "1500000",
        "variable": "50000",
        "fixed": "1200000",
        "other": "00",
        "age": "26",
        "noticeperiod": "2 months",
        "nationality": "India",
        "visatype": "Indian",
        "remarks": "None",
        "pannumber": "1234",
        "linkedinurl": "akshayninwae21",
        "functionalarea": "Web development",
        "dob": "21/12/1991",
        "joininglocation": "Blr",
        "reportinglocation": "Blr",
        "source": "Internet",
        "maritalstatus": "Single",
        "resume": "link"
    },
    {
        "id": 5,
        "candidatename": "h",
        "gender": "h",
        "currentorganisation": "h",
        "currentdesignation": "h",
        "overallexp": "h",
        "relevantexp": "h",
        "qualification": "h",
        "perferredlocation": "h",
        "currentsalary": "h",
        "expectedsalary": "h",
        "variable": "h",
        "fixed": "h",
        "other": "h",
        "age": "h",
        "noticeperiod": "h",
        "nationality": "h",
        "visatype": "h",
        "remarks": "h",
        "pannumber": "h",
        "linkedinurl": "h",
        "functionalarea": "h",
        "dob": "h",
        "joininglocation": "h",
        "reportinglocation": "h",
        "source": "h",
        "maritalstatus": "h",
        "resume": "h"
    },
    {
        "id": 6,
        "candidatename": "sdsf",
        "gender": "female",
        "currentorganisation": "dsdd",
        "currentdesignation": "d",
        "overallexp": "d",
        "relevantexp": "d",
        "qualification": "d",
        "perferredlocation": "d",
        "currentsalary": "d",
        "expectedsalary": "d",
        "variable": "d",
        "fixed": "d",
        "other": "d",
        "age": "d",
        "noticeperiod": "d",
        "nationality": "d",
        "visatype": "d",
        "remarks": "d",
        "pannumber": "d",
        "linkedinurl": "d",
        "functionalarea": "d",
        "dob": "2023-06-13",
        "joininglocation": "d",
        "reportinglocation": "d",
        "source": "d",
        "maritalstatus": "d",
        "resume": ""
    }
]
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "candidatename",
      headerName: "Candidate Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "gender",
      headerName: "Gender",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "dob",
      headerName: "Current Organisation",
      flex: 1,
    },
    {
      field: "remarks",
      headerName: "Current Designation",
      flex: 1,
    },
   
  ];

  
  const [getuserdata, setUserdata] = useState([]);
  console.log("getuserdata",getuserdata);

  const getdata = async () => {

      const res = await fetch("http://localhost:8001/getusers", {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
      });
      

      const data = await res.json();
     

      if (res.status === 422 || !data) {
          console.log("error ");

      } else {
          setUserdata(data)
          console.log("get data");

      }
  }

  useEffect(() => {
      getdata();
  }, [])

  return (
    <Box m="20px">
      <Button variant="contained" href="/candidateForm" color="success"  startIcon={<LibraryAddIcon />}>
        Add Candidate
      </Button>
      <Header title="Candidate" subtitle="Managing the Candidate" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        {/* <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} /> */}
        <DataGrid checkboxSelection rows={getuserdata} columns={columns} />
      </Box>
    </Box>
  );
};

export default Candidate;
