// models/Table.js

import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
  table_number: {
    type: Number,
    required: true,
    unique: true
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }
  ],
  current_bill: {
    type: Number,
    default: 0
  }
}, { timestamps: true });


const Table = mongoose.models.Table || mongoose.model("Table", tableSchema);
export default Table;
