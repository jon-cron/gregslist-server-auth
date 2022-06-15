import { Auth0Provider } from '@bcwdev/auth0provider'
import { baseService } from '../services/BaseService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

function _attachCollection(req, res, next) {
  logger.log(req.params.collection)
  // eslint-disable-next-line prefer-const
  let collection = req.params.collection.split('')
  collection[0] = collection[0].toUpperCase()
  req.collection = collection.join('')
  next()
}

export class ModelController extends BaseController {
  constructor() {
    super('api/:collection')
    this.router
      .use('', _attachCollection)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      const data = await baseService.find(req.collection, req.query)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async getById(req, res, next) {
    try {
      const data = await baseService.findById(req.collection, req.params.id)
      if (!data) {
        throw new Error('Invalid Id')
      }
      res.send(data)
    } catch (error) { next(error) }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const data = await baseService.create(req.collection, req.body)
      res.send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const data = await baseService.edit(req.collection, req.body)
      if (!data) { throw new Error('invalid id') }
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const data = await baseService.delete(req.collection, req.params.id, req.userInfo.id)
      if (!data) { throw new Error('Invalid Id or User') }
      res.send('deleted value')
    } catch (error) { next(error) }
  }
}
