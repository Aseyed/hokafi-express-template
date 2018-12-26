import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Act } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, act

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  act = await Act.create({ user })
})

test('POST /acts 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, description: 'test', startDate: 'test', endDate: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.description).toEqual('test')
  expect(body.startDate).toEqual('test')
  expect(body.endDate).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /acts 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /acts 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /acts 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /acts/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${act.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(act.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /acts/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${act.id}`)
  expect(status).toBe(401)
})

test('GET /acts/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /acts/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${act.id}`)
    .send({ access_token: userSession, description: 'test', startDate: 'test', endDate: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(act.id)
  expect(body.description).toEqual('test')
  expect(body.startDate).toEqual('test')
  expect(body.endDate).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /acts/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${act.id}`)
    .send({ access_token: anotherSession, description: 'test', startDate: 'test', endDate: 'test' })
  expect(status).toBe(401)
})

test('PUT /acts/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${act.id}`)
  expect(status).toBe(401)
})

test('PUT /acts/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, description: 'test', startDate: 'test', endDate: 'test' })
  expect(status).toBe(404)
})

test('DELETE /acts/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${act.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /acts/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${act.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /acts/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${act.id}`)
  expect(status).toBe(401)
})

test('DELETE /acts/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
