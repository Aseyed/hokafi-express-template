import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Location } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Location.create({ ...body, user })
    .then((location) => location.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Location.find(query, select, cursor)
    .populate('user')
    .then((locations) => locations.map((location) => location.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Location.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((location) => location ? location.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Location.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((location) => location ? Object.assign(location, body).save() : null)
    .then((location) => location ? location.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Location.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((location) => location ? location.remove() : null)
    .then(success(res, 204))
    .catch(next)
