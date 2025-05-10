import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    itemName: { type: String, required: true },
    itemCategory: { type: String, required: true },
    itemQuantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    totalValue: { type: Number, required: true },
  },
  { timestamps: true }
);

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;