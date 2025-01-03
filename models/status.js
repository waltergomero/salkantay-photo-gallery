import mongoose from "mongoose";

const statusSchema = new mongoose.Schema(
  {
    status_name: { type: String, required: true },
    status_type_id: { type: Number, required: true },
    isactive: { type: Boolean, default: true  },
  },
  {
    timestamps: true,
  }
);

const Status = mongoose.models?.Status || mongoose.model("Status", statusSchema);
export default Status;
