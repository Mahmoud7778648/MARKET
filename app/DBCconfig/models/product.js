import mongoose from "mongoose";
import { type } from "os";

const productSchema = new mongoose.Schema({
  publicid: [String],
  sizes: [{ type: String }],
  img: [{ type: String }], // تعريف img كمصفوفة من السلاسل
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

const ProductModal =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default ProductModal;
