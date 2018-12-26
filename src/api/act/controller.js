import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Act } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Act.create({ ...body, user })
    .then((act) => act.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Act.find(query, select, cursor)
    .populate('user')
    .then((acts) => acts.map((act) => act.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Act.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((act) => act ? act.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Act.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((act) => act ? Object.assign(act, body).save() : null)
    .then((act) => act ? act.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Act.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((act) => act ? act.remove() : null)
    .then(success(res, 204))
    .catch(next)
