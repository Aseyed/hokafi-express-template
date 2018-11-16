import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Project } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Project.create({ ...body, createdBy: user })
    .then((project) => project.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({user, querymen: { query, select, cursor } }, res, next) =>
  Project.count(query)
    .then(count => Project.find(query, select, cursor)
      .populate('createdBy')
      .then((projects) => ({
        count,
        rows: projects.filter(pilot => pilot.createdBy.equals(user.id))
        .map((project) => project.view())       
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Project.findById(params.id)
    .populate('createdBy')
    .then(notFound(res))
    .then((project) => project ? project.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Project.findById(params.id)
    .populate('createdBy')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((project) => project ? Object.assign(project, body).save() : null)
    .then((project) => project ? project.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Project.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((project) => project ? project.remove() : null)
    .then(success(res, 204))
    .catch(next)
