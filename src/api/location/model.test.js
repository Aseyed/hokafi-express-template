import { Location } from '.'
import { User } from '../user'

let user, location

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  location = await Location.create({ user, name: 'test', lat: 'test', lng: 'test', tesks: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = location.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(location.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(location.name)
    expect(view.lat).toBe(location.lat)
    expect(view.lng).toBe(location.lng)
    expect(view.tesks).toBe(location.tesks)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = location.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(location.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(location.name)
    expect(view.lat).toBe(location.lat)
    expect(view.lng).toBe(location.lng)
    expect(view.tesks).toBe(location.tesks)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
