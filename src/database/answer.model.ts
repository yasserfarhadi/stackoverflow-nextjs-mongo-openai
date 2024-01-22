import { Schema, models, model, Document } from 'mongoose';

export interface IAnswer extends Document {
  content: string;
  question: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const AnsewrSchema = new Schema({
  content: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

const Answer = models.Answer || model('Answer', AnsewrSchema);

export default Answer;
