import { Schema, model, SchemaTypes} from 'mongoose';

const imageSchema = new Schema({
  title: { type: SchemaTypes.String, required: true },
  description: { type: SchemaTypes.String },
  key: { type: SchemaTypes.String, required: true },
  url: { type: SchemaTypes.String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  createdAt: { type: SchemaTypes.Date, default: Date.now }
});

export const imageModel = model('images', imageSchema);

export default imageModel;