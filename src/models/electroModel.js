import mongoose from "mongoose";

const ElectroSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Name of the user
    lengthInInch: { type: Number }, 
    roundInInch: { type: Number }, 
    runningturnInTarNo: { type: Number }, 
    runningSetWeightInGram: { type: Number }, 
    pichfirst: { type: Number },
    pichsecond: { type: Number },
    pichthird: { type: Number},
    pichfourth: { type: Number },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export default mongoose.models.Electro || mongoose.model("Electro", ElectroSchema);
