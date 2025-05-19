import mongoose from 'mongoose';

const dishSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["starter", "main course", "dessert"],
      required: true,
    },
    description: String,
    ingredients: [String],
    image: String,
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

const Dish = mongoose.model('Dish', dishSchema);
export default Dish;
