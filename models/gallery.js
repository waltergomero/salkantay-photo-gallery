import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    category_id: { type: String, required: true, unique: false },
    category_name: { type: String, required: true, unique: false },
    image_name: { type: String, required: true, unique: true },
    path: { type: String, required: true, unique: true },
    format: { type: String, required: false, default:null },
    caption: { type: String, required: false, default:null },
    make_visible: { type: Boolean, required: false, default:false },
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.models?.Gallery || mongoose.model("Gallery", gallerySchema);
export default Gallery;
