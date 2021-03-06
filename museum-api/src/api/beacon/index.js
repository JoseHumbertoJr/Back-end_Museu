import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Beacon, { schema } from './model'

const router = new Router()
const { name, description, legend, content, type } = schema.tree

/**
 * @api {post} /beacons Create beacon
 * @apiName CreateBeacon
 * @apiGroup Beacon
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Beacon's name.
 * @apiParam description Beacon's description.
 * @apiSuccess {Object} beacon Beacon's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Beacon not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, description, legend, content, type }),
  create)

/**
 * @api {get} /beacons Retrieve beacons
 * @apiName RetrieveBeacons
 * @apiGroup Beacon
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} beacons List of beacons.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /beacons/:id Retrieve beacon
 * @apiName RetrieveBeacon
 * @apiGroup Beacon
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} beacon Beacon's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Beacon not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /beacons/:id Update beacon
 * @apiName UpdateBeacon
 * @apiGroup Beacon
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Beacon's name.
 * @apiParam description Beacon's description.
 * @apiSuccess {Object} beacon Beacon's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Beacon not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, description }),
  update)

/**
 * @api {delete} /beacons/:id Delete beacon
 * @apiName DeleteBeacon
 * @apiGroup Beacon
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Beacon not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
