import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPandal extends Document {
  name: string;
  location: string;
  liveStatus: string;
  reportsInLastHour: number;
  createdAt: Date;
  updatedAt: Date;
}

const PandalSchema: Schema<IPandal> = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    liveStatus: { type: String, default: "Medium" },
    reportsInLastHour: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Pandal: Model<IPandal> = mongoose.models.Pandal || mongoose.model<IPandal>("Pandal", PandalSchema);
export default Pandal;
