import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update } from './controller'
import { schema } from './model'
export Visitant, { schema } from './model'

const router = new Router()
const { name, email, phone, id_device } = schema.tree

/**
 * @api {post} /visitantes Create visitant
 * @apiName CreateVisitant
 * @apiGroup Visitant
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam dateTimeAcess Visitant's dateTimeAcess.
 * @apiParam name Visitant's name.
 * @apiParam email Visitant's email.
 * @apiParam phone Visitant's phone.
 * @apiParam id_device Visitant's id_device.
 * @apiSuccess {Object} visitant Visitant's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Visitant not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, email, phone, id_device }),
  create)

/**
 * @api {get} /visitantes Retrieve visitants
 * @apiName RetrieveVisitants
 * @apiGroup Visitant
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} visitants List of visitants.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /visitantes/:id Retrieve visitant
 * @apiName RetrieveVisitant
 * @apiGroup Visitant
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} visitant Visitant's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Visitant not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /visitantes/:id Update visitant
 * @apiName UpdateVisitant
 * @apiGroup Visitant
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam dateTimeAcess Visitant's dateTimeAcess.
 * @apiParam name Visitant's name.
 * @apiParam email Visitant's email.
 * @apiParam phone Visitant's phone.
 * @apiParam id_device Visitant's id_device.
 * @apiSuccess {Object} visitant Visitant's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Visitant not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, email, phone, id_device }),
  update)

export default router
