import { Schema, model, Document } from 'mongoose';

export interface IComic extends Document {
  title: string;  
  year: number;
  description: string;
  url: string;
  amount: number;
  price: number;
  creator: Schema.Types.ObjectId;
}

const comicSchema = new Schema<IComic>({
  title: { type: String, required: true },  
  year: { type: Number, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },  
}, { timestamps: true });

export default model<IComic>('Comic', comicSchema);
