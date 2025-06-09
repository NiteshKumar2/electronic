import mongoose from "mongoose";

const ElectroSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Name of the user
    slot: { type: String },
    connectionType: { type: String },
    runningWireGauge: { type: String },
    rpm: { type: String },
    length: { type: String },
    runningLength: { type: String },
    startingLength: { type: String },
    breadth: { type: String },
    runningPintchOne: { type: String },
    runningPintchTwo: { type: String },
    runningPintchThree: { type: String },
    runningPintchFour: { type: String },
    runningPintchFive: { type: String },
    runningPintchSix: { type: String },
    startingPintchOne: { type: String },
    startingPintchTwo: { type: String },
    startingPintchThree: { type: String },
    startingPintchFour: { type: String },
    startingPintchFive: { type: String },
    startingPintchSix: { type: String },
    runningSetWeight: { type: String },
    startingSetWeight: { type: String },
    startingWireGauge: { type: String },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export default mongoose.models.Electro ||
  mongoose.model("Electro", ElectroSchema);
