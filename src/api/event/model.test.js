import { Event } from '.'

let event

beforeEach(async () => {
  event = await Event.create({ title: 'test', eventDate: 'test', description: 'test', registrationStartDate: 'test', registrationEndDate: 'test', registerUsers: 'test', organizer: 'test', more: 'test', location: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = event.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(event.id)
    expect(view.title).toBe(event.title)
    expect(view.eventDate).toBe(event.eventDate)
    expect(view.description).toBe(event.description)
    expect(view.registrationStartDate).toBe(event.registrationStartDate)
    expect(view.registrationEndDate).toBe(event.registrationEndDate)
    expect(view.registerUsers).toBe(event.registerUsers)
    expect(view.organizer).toBe(event.organizer)
    expect(view.more).toBe(event.more)
    expect(view.location).toBe(event.location)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = event.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(event.id)
    expect(view.title).toBe(event.title)
    expect(view.eventDate).toBe(event.eventDate)
    expect(view.description).toBe(event.description)
    expect(view.registrationStartDate).toBe(event.registrationStartDate)
    expect(view.registrationEndDate).toBe(event.registrationEndDate)
    expect(view.registerUsers).toBe(event.registerUsers)
    expect(view.organizer).toBe(event.organizer)
    expect(view.more).toBe(event.more)
    expect(view.location).toBe(event.location)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
