import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Beacon } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, beacon

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  beacon = await Beacon.create({})
})

test('POST /beacons 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', description: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
})

test('POST /beacons 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /beacons 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /beacons 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /beacons 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /beacons 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /beacons/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${beacon.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(beacon.id)
})

test('GET /beacons/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${beacon.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /beacons/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${beacon.id}`)
  expect(status).toBe(401)
})

test('GET /beacons/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /beacons/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${beacon.id}`)
    .send({ access_token: adminSession, name: 'test', description: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(beacon.id)
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
})

test('PUT /beacons/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${beacon.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /beacons/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${beacon.id}`)
  expect(status).toBe(401)
})

test('PUT /beacons/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', description: 'test' })
  expect(status).toBe(404)
})

test('DELETE /beacons/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${beacon.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /beacons/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${beacon.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /beacons/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${beacon.id}`)
  expect(status).toBe(401)
})

test('DELETE /beacons/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
