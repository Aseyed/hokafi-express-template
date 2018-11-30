import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Event, { schema } from './model'

const router = new Router()
const { title, eventDate, description, registrationStartDate, registrationEndDate, registerUsers, organizer, more, location } = schema.tree

/**
 * @api {post} /events Create event
 * @apiName CreateEvent
 * @apiGroup Event
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title Event's title.
 * @apiParam eventDate Event's eventDate.
 * @apiParam description Event's description.
 * @apiParam registrationStartDate Event's registrationStartDate.
 * @apiParam registrationEndDate Event's registrationEndDate.
 * @apiParam registerUsers Event's registerUsers.
 * @apiParam organizer Event's organizer.
 * @apiParam more Event's more.
 * @apiParam location Event's location.
 * @apiSuccess {Object} event Event's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Event not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ title, eventDate, description, registrationStartDate, registrationEndDate, registerUsers, organizer, more, location }),
  create)

/**
 * @api {get} /events Retrieve events
 * @apiName RetrieveEvents
 * @apiGroup Event
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of events.
 * @apiSuccess {Object[]} rows List of events.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /events/:id Retrieve event
 * @apiName RetrieveEvent
 * @apiGroup Event
 * @apiSuccess {Object} event Event's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Event not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /events/:id Update event
 * @apiName UpdateEvent
 * @apiGroup Event
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title Event's title.
 * @apiParam eventDate Event's eventDate.
 * @apiParam description Event's description.
 * @apiParam registrationStartDate Event's registrationStartDate.
 * @apiParam registrationEndDate Event's registrationEndDate.
 * @apiParam registerUsers Event's registerUsers.
 * @apiParam organizer Event's organizer.
 * @apiParam more Event's more.
 * @apiParam location Event's location.
 * @apiSuccess {Object} event Event's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Event not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ title, eventDate, description, registrationStartDate, registrationEndDate, registerUsers, organizer, more, location }),
  update)

/**
 * @api {delete} /events/:id Delete event
 * @apiName DeleteEvent
 * @apiGroup Event
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Event not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
