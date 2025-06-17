import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    firstName: { 
      type: String, 
      required: true 
    },
    lastName: { 
      type: String, 
      required: true 
    },
    position: { 
      type: String, 
      required: true 
    },
    contact: { 
      type: String, // Assuming contact can be a string (phone, email, etc.)
      required: true 
    },
    hireDate: { 
      type: Date, // Store dates as Date objects for proper date operations
      required: true 
    },
    salaryPerHour: { 
      type: Number, // Changed from String to Number for calculations
      required: true 
    },
    totalHours: { 
      type: Number, 
      required: true 
    },
    hoursWorkedWeek: { 
      type: Number, 
      required: true 
    },
    hoursWorkedMonth: { 
      type: Number, 
      required: true 
    },
    // Keeping totalEarning, as it might be calculated or manually added
    // If it's always calculated from other fields, you might omit it from the schema
    // and calculate it on the fly or in a pre-save hook.
    totalEarning: { 
      type: Number, 
      required: false // Made optional as it's often derived
    }, 
  },
  { timestamps: true } // Keeps createdAt and updatedAt timestamps
);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
