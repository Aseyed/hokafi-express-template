import { Act } from '.'
import { User } from '../user'

let user, act

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  act = await Act.create({ user, description: 'test', startDate: 'test', endDate: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = act.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(act.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.description).toBe(act.description)
    expect(view.startDate).toBe(act.startDate)
    expect(view.endDate).toBe(act.endDate)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = act.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(act.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.description).toBe(act.description)
    expect(view.startDate).toBe(act.startDate)
    expect(view.endDate).toBe(act.endDate)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
