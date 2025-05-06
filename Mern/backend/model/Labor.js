import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const laborSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    hourlyRate: { type: Number, required: true },
    hoursWorked : { type: Number, required: true },
    totalEarning : { type: Number, required: true },
  },
  { timestamps: true }
);


const Labour = mongoose.model("Labour", laborSchema);
export default Labour;
