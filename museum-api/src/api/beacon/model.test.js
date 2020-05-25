import { Beacon } from '.'

let beacon

beforeEach(async () => {
  beacon = await Beacon.create({ name: 'test', description: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = beacon.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(beacon.id)
    expect(view.name).toBe(beacon.name)
    expect(view.description).toBe(beacon.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = beacon.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(beacon.id)
    expect(view.name).toBe(beacon.name)
    expect(view.description).toBe(beacon.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
