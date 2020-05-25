import { success, notFound } from '../../services/response/'
import { Visitant } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Visitant.create(body)
    .then((visitant) => visitant.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Visitant.find(query, select, cursor)
    .then((visitants) => visitants.map((visitant) => visitant.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Visitant.findById(params.id)
    .then(notFound(res))
    .then((visitant) => visitant ? visitant.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Visitant.findById(params.id)
    .then(notFound(res))
    .then((visitant) => visitant ? Object.assign(visitant, body).save() : null)
    .then((visitant) => visitant ? visitant.view(true) : null)
    .then(success(res))
    .catch(next)
