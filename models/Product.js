import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number,
  },
  { timestamps: true }
);

// module.exports.User = mongoose.model("user", UserSchema);
// or
const Product = mongoose.model("Product", ProductSchema);
export default Product;
