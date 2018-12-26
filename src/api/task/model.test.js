import { Task } from '.'
import { User } from '../user'

let user, task

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  task = await Task.create({ user, title: 'test', acts: 'test', done: 'test', location: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = task.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(task.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.title).toBe(task.title)
    expect(view.acts).toBe(task.acts)
    expect(view.done).toBe(task.done)
    expect(view.location).toBe(task.location)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = task.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(task.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.title).toBe(task.title)
    expect(view.acts).toBe(task.acts)
    expect(view.done).toBe(task.done)
    expect(view.location).toBe(task.location)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
