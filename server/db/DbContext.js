import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { CarSchema } from '../models/Car'
import { HouseSchema } from '../models/House'
import { JobSchema } from '../models/Job'

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Cars = mongoose.model('Car', CarSchema)
  Houses = mongoose.model('Houses', HouseSchema)
  Jobs = mongoose.model('Jobs', JobSchema)
}

export const dbContext = new DbContext()
