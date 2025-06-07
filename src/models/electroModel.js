import mongoose from "mongoose";

const ElectroSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Name of the user
    slot: { type: String },
    connectionType: { type: String },
    runningWireGauge: { type: String },
    rpm: { type: String },
    length: { type: String },
    breadth: { type: String },
    runningPintch: { type: String },
    startingPintch: { type: String },
    runningSetWeight: { type: String },
    startingSetWeight: { type: String },
    startingWireGauge: { type: String },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export default mongoose.models.Electro ||
  mongoose.model("Electro", ElectroSchema);
