import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const hexRx = /^#(?:[0-9a-fA-F]{3}){1,2}$/

export const CarSchema = new Schema({
  creatorId: { type: ObjectId, required: true, ref: 'Account' },
  make: { type: String, required: true },
  model: { type: String, required: true },
  imgUrl: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  color: { type: String, validate: [function(val) { return hexRx.test(val) }, 'you must pass a valid color hexcode'] }
},
{ timestamps: true, toJSON: { virtuals: true } }
)

CarSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
