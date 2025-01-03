import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    product_name: { type: String, required: true, unique: true },
    slug: { type: String  , required: true, unique: true },
    category_id: { type: String, required: true, required: true},
    category_name: { type: String, required: true},
    quantity_per_unit: { type: String, required: false},
    cost: { type: Number, required: false},
    price: { type: Number, required: false},
    number_instock: { type: Number, required: false},
    number_onorder: { type: Number, required: false},
    reorder_level: { type: Number, required: false},
    description: { type: String, required: false },
    isactive: { type: Boolean, default: true},
  },
  {
    timestamps: true,
  }
);

const Product =  mongoose.models?.Product || mongoose.model("Product", productSchema);
export default Product;
