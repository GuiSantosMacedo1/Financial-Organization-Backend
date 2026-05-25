import { Schema, model, Document } from 'mongoose';

export interface ITransaction extends Document {
  userId: Schema.Types.ObjectId;
  category: string;
  description: string;
  amount: number;
  date: Date;
  type: 'income' | 'expense';
}

const transactionSchema = new Schema<ITransaction>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  type: { type: String, enum: ['income', 'expense'], required: true }
});

export const Transaction = model<ITransaction>('Transaction', transactionSchema);