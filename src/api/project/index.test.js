import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Project } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, project

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  project = await Project.create({ createdBy: user })
})

test('POST /projects 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, subject: 'test', description: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.subject).toEqual('test')
  expect(body.description).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('POST /projects 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /projects 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
  expect(typeof body.rows[0].createdBy).toEqual('object')
})

test('GET /projects 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /projects/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${project.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(project.id)
  expect(typeof body.createdBy).toEqual('object')
})

test('GET /projects/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${project.id}`)
  expect(status).toBe(401)
})

test('GET /projects/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /projects/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${project.id}`)
    .send({ access_token: userSession, subject: 'test', description: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(project.id)
  expect(body.subject).toEqual('test')
  expect(body.description).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('PUT /projects/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${project.id}`)
    .send({ access_token: anotherSession, subject: 'test', description: 'test' })
  expect(status).toBe(401)
})

test('PUT /projects/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${project.id}`)
  expect(status).toBe(401)
})

test('PUT /projects/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, subject: 'test', description: 'test' })
  expect(status).toBe(404)
})

test('DELETE /projects/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${project.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /projects/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${project.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /projects/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${project.id}`)
  expect(status).toBe(401)
})

test('DELETE /projects/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
