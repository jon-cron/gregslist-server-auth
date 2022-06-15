import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const HouseSchema = new Schema({
  creatorId: { type: ObjectId, required: true, ref: 'Account' },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  levels: { type: Number, required: true },
  imgUrl: { type: String },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String }
},
{ timestamps: true, toJSON: { virtuals: true } }
)

HouseSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
