import { Schema, model, Document } from 'mongoose';

export interface IPurchase extends Document {
  user: Schema.Types.ObjectId;
  comic: Schema.Types.ObjectId;
  purchasedAt: Date;
}

const purchaseSchema = new Schema<IPurchase>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comic: { type: Schema.Types.ObjectId, ref: 'Comic', required: true },
  purchasedAt: { type: Date, default: Date.now },
});

export default model<IPurchase>('Purchase', purchaseSchema);
