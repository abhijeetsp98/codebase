
import Table from "../model/Table.js";

export const getTableData = async (req, res) => {
  console.log("Backend API for getTableData ")
  const tableNumber = parseInt(req.params.id);
  const { items } = req.body;

};

export const setTableData = async (req, res) => {
  console.log("Backend API for setTableData ")
  
};



