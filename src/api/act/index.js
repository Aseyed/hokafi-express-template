import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Act, { schema } from './model'

const router = new Router()
const { description, startDate, endDate } = schema.tree

/**
 * @api {post} /acts Create act
 * @apiName CreateAct
 * @apiGroup Act
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam description Act's description.
 * @apiParam startDate Act's startDate.
 * @apiParam endDate Act's endDate.
 * @apiSuccess {Object} act Act's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Act not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ description, startDate, endDate }),
  create)

/**
 * @api {get} /acts Retrieve acts
 * @apiName RetrieveActs
 * @apiGroup Act
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} acts List of acts.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /acts/:id Retrieve act
 * @apiName RetrieveAct
 * @apiGroup Act
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} act Act's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Act not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /acts/:id Update act
 * @apiName UpdateAct
 * @apiGroup Act
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam description Act's description.
 * @apiParam startDate Act's startDate.
 * @apiParam endDate Act's endDate.
 * @apiSuccess {Object} act Act's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Act not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ description, startDate, endDate }),
  update)

/**
 * @api {delete} /acts/:id Delete act
 * @apiName DeleteAct
 * @apiGroup Act
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Act not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
