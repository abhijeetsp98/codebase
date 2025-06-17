import mongoose from 'mongoose';

const dishSchema = new mongoose.Schema(
  {
    dishId: { // Added: Unique identifier for the dish
      type: String,
      required: true,
      unique: true // Assuming dishId should be unique for each dish
    },
    name: { 
      type: String, 
      required: true 
    },
    description: { // Updated to be consistent with the request (string type implied)
      type: String 
    },
    category: {
      type: String,
      // Expanded enum to include "Starter" and common other categories for flexibility
      enum: ["Starter", "Main Course", "Dessert", "Beverage", "Side Dish", "Appetizer"],
      required: true,
    },
    quantity: { // Added: Assuming this represents an integer quantity
      type: Number, 
      required: true 
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    costPrice: { // Added: Represents the cost price of the dish
      type: Number, 
      required: true,
      min: 0 // Cost price should not be negative
    },
    prepTime: { // Added: Preparation time in minutes (assuming integer)
      type: Number, 
      required: true,
      min: 0 // Prep time cannot be negative
    },
    calories: { // Added: Calorie count
      type: Number, 
      required: true,
      min: 0 // Calories cannot be negative
    },
    inventoryAlert: { // Added: Threshold for inventory alerts
      type: Number, 
      required: true,
      min: 0 // Inventory alert threshold cannot be negative
    },
    // Removed: 'ingredients' as it was not present in the new POST body
    // Removed: 'image' as it was not present in the new POST body
    // Removed: 'createdBy' as it was not present in the new POST body and implies user tracking
  },
  { timestamps: true } // Keeps createdAt and updatedAt timestamps
);

const Dish = mongoose.model('Dish', dishSchema);
export default Dish;
