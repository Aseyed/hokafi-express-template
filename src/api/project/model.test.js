import { Project } from '.'
import { User } from '../user'

let user, project

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  project = await Project.create({ createdBy: user, subject: 'test', description: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = project.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(project.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.subject).toBe(project.subject)
    expect(view.description).toBe(project.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = project.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(project.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.subject).toBe(project.subject)
    expect(view.description).toBe(project.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
