import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Location } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, location

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  location = await Location.create({ user })
})

test('POST /locations 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', lat: 'test', lng: 'test', tesks: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.lat).toEqual('test')
  expect(body.lng).toEqual('test')
  expect(body.tesks).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /locations 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /locations 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /locations 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /locations/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${location.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(location.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /locations/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${location.id}`)
  expect(status).toBe(401)
})

test('GET /locations/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /locations/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${location.id}`)
    .send({ access_token: userSession, name: 'test', lat: 'test', lng: 'test', tesks: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(location.id)
  expect(body.name).toEqual('test')
  expect(body.lat).toEqual('test')
  expect(body.lng).toEqual('test')
  expect(body.tesks).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /locations/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${location.id}`)
    .send({ access_token: anotherSession, name: 'test', lat: 'test', lng: 'test', tesks: 'test' })
  expect(status).toBe(401)
})

test('PUT /locations/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${location.id}`)
  expect(status).toBe(401)
})

test('PUT /locations/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, name: 'test', lat: 'test', lng: 'test', tesks: 'test' })
  expect(status).toBe(404)
})

test('DELETE /locations/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${location.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /locations/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${location.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /locations/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${location.id}`)
  expect(status).toBe(401)
})

test('DELETE /locations/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
