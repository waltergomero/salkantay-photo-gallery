import mongoose from "mongoose";

const imagesSchema = new mongoose.Schema(
  {
    product_id: { type: String, required: true, unique: false },
    image_name: { type: String, required: true, unique: true },
    path: { type: String, required: true, unique: true },
    format: { type: String, required: false, default:null },
    order: { type: Number, required: false, default:0 },
  },
  {
    timestamps: true,
  }
);

const Images = mongoose.models?.Images || mongoose.model("Images", imagesSchema);
export default Images;
