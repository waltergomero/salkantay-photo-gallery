import mongoose from "mongoose";

const homePageCategoriesSchema = new mongoose.Schema(
  {
    category_id: { type: String, required: true, unique: false },
    category_name: { type: String, required: true, unique: false },
    image_name: { type: String, required: true, unique: true },
    path: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const HomePageCategories = mongoose.models?.HomePageCategories || mongoose.model("HomePageCategories", homePageCategoriesSchema);
export default HomePageCategories;
