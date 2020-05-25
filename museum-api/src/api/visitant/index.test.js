import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Visitant } from '.'

const app = () => express(apiRoot, routes)

let userSession, visitant

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  visitant = await Visitant.create({})
})

test('POST /visitantes 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, dateTimeAcess: 'test', name: 'test', email: 'test', phone: 'test', id_device: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.dateTimeAcess).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.phone).toEqual('test')
  expect(body.id_device).toEqual('test')
})

test('POST /visitantes 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /visitantes 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /visitantes 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /visitantes/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${visitant.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(visitant.id)
})

test('GET /visitantes/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${visitant.id}`)
  expect(status).toBe(401)
})

test('GET /visitantes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /visitantes/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${visitant.id}`)
    .send({ access_token: userSession, dateTimeAcess: 'test', name: 'test', email: 'test', phone: 'test', id_device: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(visitant.id)
  expect(body.dateTimeAcess).toEqual('test')
  expect(body.name).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.phone).toEqual('test')
  expect(body.id_device).toEqual('test')
})

test('PUT /visitantes/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${visitant.id}`)
  expect(status).toBe(401)
})

test('PUT /visitantes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, dateTimeAcess: 'test', name: 'test', email: 'test', phone: 'test', id_device: 'test' })
  expect(status).toBe(404)
})
