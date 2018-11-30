import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Event } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, event

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  event = await Event.create({})
})

test('POST /events 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, title: 'test', eventDate: 'test', description: 'test', registrationStartDate: 'test', registrationEndDate: 'test', registerUsers: 'test', organizer: 'test', more: 'test', location: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.eventDate).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.registrationStartDate).toEqual('test')
  expect(body.registrationEndDate).toEqual('test')
  expect(body.registerUsers).toEqual('test')
  expect(body.organizer).toEqual('test')
  expect(body.more).toEqual('test')
  expect(body.location).toEqual('test')
})

test('POST /events 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /events 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /events 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /events/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${event.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(event.id)
})

test('GET /events/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /events/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${event.id}`)
    .send({ access_token: adminSession, title: 'test', eventDate: 'test', description: 'test', registrationStartDate: 'test', registrationEndDate: 'test', registerUsers: 'test', organizer: 'test', more: 'test', location: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(event.id)
  expect(body.title).toEqual('test')
  expect(body.eventDate).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.registrationStartDate).toEqual('test')
  expect(body.registrationEndDate).toEqual('test')
  expect(body.registerUsers).toEqual('test')
  expect(body.organizer).toEqual('test')
  expect(body.more).toEqual('test')
  expect(body.location).toEqual('test')
})

test('PUT /events/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${event.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /events/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${event.id}`)
  expect(status).toBe(401)
})

test('PUT /events/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, title: 'test', eventDate: 'test', description: 'test', registrationStartDate: 'test', registrationEndDate: 'test', registerUsers: 'test', organizer: 'test', more: 'test', location: 'test' })
  expect(status).toBe(404)
})

test('DELETE /events/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${event.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /events/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${event.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /events/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${event.id}`)
  expect(status).toBe(401)
})

test('DELETE /events/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
