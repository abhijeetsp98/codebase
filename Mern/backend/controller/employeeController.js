import Employee from '../model/Employee.js';


export const createEmployee = async (req, res) => {
  console.log("API : Employee, CALL : createEmployee");
  // Destructure all relevant fields from the request body as per the schema
  const { 
    firstName, 
    lastName, 
    position, 
    contact, 
    hireDate, 
    salaryPerHour, 
    totalHours, 
    hoursWorkedWeek, 
    hoursWorkedMonth,
    totalEarning // totalEarning is optional, but can still be received
  } = req.body;

  try {
    const employee = new Employee({
      firstName,
      lastName,
      position,
      contact,
      hireDate,
      salaryPerHour,
      totalHours,
      hoursWorkedWeek,
      hoursWorkedMonth,
      totalEarning // Include if present in the request body
    });
    
    // Save the new employee document to the database
    const savedEmployee = await employee.save(); // Corrected: use 'employee.save()'

    res.status(201).json(savedEmployee);
  } catch (err) {
    // Improved error logging for debugging
    console.error("Error creating employee:", err); 
    res.status(500).json({ message: 'Failed to create Employee', error: err.message });
  }
};

export const getEmployee = async (req, res) => {
  console.log("API : Employee, CALL : getEmployee"); // Corrected typo: geEmployee -> getEmployee
  try {
    const employees = await Employee.find(); // Fetches all employees
    res.status(200).json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ message: 'Failed to fetch employees', error: err.message });
  }
};
