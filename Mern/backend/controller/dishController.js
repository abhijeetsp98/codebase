import Dish from "../model/Dish.js";

export const createDish = async (req, res) => {
  console.log("API : DISH, CALL : CreateDish")
  try {
    const { name, description, ingredients, image } = req.body;
    const dish = await Dish.create({
      name,
      description,
      ingredients,
      image,
      createdBy: req.user._id,
    });
    res.status(201).json(dish);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create dish", error: err.message });
  }
};

export const getDishes = async (req, res) => {
  console.log("API : DISH, CALL : GetDish")
  try {
    const dishes = await Dish.find().populate("createdBy", "name email");
    res.json(dishes);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch dishes", error: err.message });
  }
};

export const getDishById = async (req, res) => {
  console.log("API : DISH, CALL : getDishById")
  try {
    const dish = await Dish.findById(req.params.id).populate(
      "createdBy",
      "name"
    );
    if (!dish) return res.status(404).json({ message: "Dish not found" });
    res.json(dish);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch dish", error: err.message });
  }
};
