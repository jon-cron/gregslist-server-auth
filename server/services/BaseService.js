import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import { logger } from '../utils/Logger'

class BaseService {
  /**
   *
   * @param {String} collection
   * @param {Object} query
   */
  async find(collection, query = {}) {
    const values = await dbContext[collection].find(query).populate('creator', 'name picture')
    return values
  }

  /**
   *
   * @param {String} collection
   * @param {String} id
   */
  async findById(collection, id) {
    const value = await dbContext[collection].findById(id).populate('creator', 'name picture')
    if (!value) {
      throw new BadRequest('Invalid Id')
    }
    return value
  }

  /**
   *
   * @param {String} collection
   * @param {Object} body
   */
  async create(collection, body) {
    logger.log('creating a', collection, body)
    const doc = await dbContext[collection].create(body)
    await doc.populate('creator', 'name picture')
    return doc
  }

  /**
 *
 * @param {String} collection
 * @param {Object} body
 */
  async edit(collection, body) {
    return await dbContext[collection].findOneAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true }).populate('creator', 'name picture')
  }

  /**
 *
 * @param {String} collection
 * @param {String} id
 */
  async delete(collection, id, userId) {
    return await dbContext[collection].findOneAndDelete({ _id: id, creatorId: userId })
  }
}

export const baseService = new BaseService()
