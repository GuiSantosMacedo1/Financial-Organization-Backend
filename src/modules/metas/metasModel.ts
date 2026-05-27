import { Document, Schema, model } from "mongoose";

export interface IMetas extends Document {
  userId: Schema.Types.ObjectId;
  title: string;
  description: string;
  amount: number;
  amountSaved: number;
  date: Date;
  saved: boolean;
}

const metasSchema = new Schema<IMetas>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  amountSaved: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  saved: { type:Boolean, required: true }
});

export const Metas = model<IMetas>('Metas', metasSchema);