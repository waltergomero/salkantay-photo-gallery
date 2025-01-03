import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    category_name: { type: String, required: true, unique: true },
    parent_category_id: { type: String, required: false, default:null },
    parent_category_name: { type: String, required: false, default:null },
    isactive: { type: Boolean, default: true},
    notes: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Category =
  mongoose.models?.Category || mongoose.model("Category", categorySchema);
export default Category;
