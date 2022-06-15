import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const JobSchema = new Schema({
  creatorId: { type: ObjectId, required: true, ref: 'Account' },
  company: { type: String, required: true },
  jobTitle: { type: String, required: true },
  hours: { type: Number, required: true },
  rate: { type: Number, required: true },
  description: { type: String }
},
{ timestamps: true, toJSON: { virtuals: true } }
)

JobSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
