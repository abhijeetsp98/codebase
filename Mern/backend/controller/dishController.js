import Dish from "../model/Dish.js";

export const createDish = async (req, res) => {
  console.log("API : DISH, CALL : CreateDish");
  try {
    // Destructure all relevant fields from the request body as per the schema
    const { 
      dishId,         // New field
      name, 
      description, 
      category, 
      quantity,       // New field
      price, 
      costPrice,      // New field
      prepTime,       // New field
      calories,       // New field
      inventoryAlert  // New field
      // Removed: ingredients, image, createdBy
    } = req.body;

    // --- MODIFICATION START ---
    // Convert quantity to a number. Use parseInt as quantity is likely an integer.
    // Add validation to ensure it's a valid number.
    const parsedQuantity = parseInt(quantity, 10); // Base 10 for decimal numbers

    if (isNaN(parsedQuantity)) {
      return res.status(400).json({ message: 'Validation Error: Quantity must be a valid number.' });
    }
    // --- MODIFICATION END ---

    const dish = await Dish.create({
      dishId,
      name,
      description,
      category,
      quantity: parsedQuantity, // Use the parsed number
      price,
      costPrice,
      prepTime,
      calories,
      inventoryAlert,
      // Removed: ingredients, image, createdBy (as per the updated schema)
    });

    res.status(201).json(dish);
  } catch (err) {
    console.error("Error creating dish:", err); // Improved error logging
    // Mongoose validation errors often have a 'name' property of 'ValidationError'
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ message: 'Validation Error', errors: messages });
    }
    res.status(500).json({ message: "Failed to create dish", error: err.message });
  }
};

export const getDishes = async (req, res) => {
  console.log("API : DISH, CALL : GetDish");
  try {
    // Removed .populate("createdBy", "name email") as 'createdBy' field is no longer in schema
    const dishes = await Dish.find(); 
    res.json(dishes);
  } catch (err) {
    console.error("Error fetching dishes:", err); // Improved error logging
    res.status(500).json({ message: "Failed to fetch dishes", error: err.message });
  }
};

export const getDishById = async (req, res) => {
  console.log("API : DISH, CALL : getDishById");
  try {
    // Removed .populate("createdBy", "name") as 'createdBy' field is no longer in schema
    const dish = await Dish.findById(req.params.id); 
    if (!dish) return res.status(404).json({ message: "Dish not found" });
    res.json(dish);
  } catch (err) {
    console.error("Error fetching dish by ID:", err); // Improved error logging
    res.status(500).json({ message: "Failed to fetch dish", error: err.message });
  }
};