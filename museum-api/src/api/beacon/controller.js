import { success, notFound } from '../../services/response/'
import { Beacon } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Beacon.create(body)
    .then((beacon) => beacon.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Beacon.find(query, select, cursor)
    .then((beacons) => beacons.map((beacon) => beacon.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Beacon.findById(params.id)
    .then(notFound(res))
    .then((beacon) => beacon ? beacon.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Beacon.findById(params.id)
    .then(notFound(res))
    .then((beacon) => beacon ? Object.assign(beacon, body).save() : null)
    .then((beacon) => beacon ? beacon.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Beacon.findById(params.id)
    .then(notFound(res))
    .then((beacon) => beacon ? beacon.remove() : null)
    .then(success(res, 204))
    .catch(next)
