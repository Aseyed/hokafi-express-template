import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy } from './controller'

const router = new Router()

/**
 * @api {post} /sms Create sms
 * @apiName CreateSms
 * @apiGroup Sms
 * @apiSuccess {Object} sms Sms's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Sms not found.
 */
router.post('/',
  create)

/**
 * @api {get} /sms Retrieve sms
 * @apiName RetrieveSms
 * @apiGroup Sms
 * @apiUse listParams
 * @apiSuccess {Object[]} sms List of sms.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /sms/:id Retrieve sms
 * @apiName RetrieveSms
 * @apiGroup Sms
 * @apiSuccess {Object} sms Sms's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Sms not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /sms/:id Update sms
 * @apiName UpdateSms
 * @apiGroup Sms
 * @apiSuccess {Object} sms Sms's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Sms not found.
 */
router.put('/:id',
  update)

/**
 * @api {delete} /sms/:id Delete sms
 * @apiName DeleteSms
 * @apiGroup Sms
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Sms not found.
 */
router.delete('/:id',
  destroy)

export default router
