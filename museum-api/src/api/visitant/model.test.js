import { Visitant } from '.'

let visitant

beforeEach(async () => {
  visitant = await Visitant.create({ dateTimeAcess: 'test', name: 'test', email: 'test', phone: 'test', id_device: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = visitant.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(visitant.id)
    expect(view.dateTimeAcess).toBe(visitant.dateTimeAcess)
    expect(view.name).toBe(visitant.name)
    expect(view.email).toBe(visitant.email)
    expect(view.phone).toBe(visitant.phone)
    expect(view.id_device).toBe(visitant.id_device)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = visitant.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(visitant.id)
    expect(view.dateTimeAcess).toBe(visitant.dateTimeAcess)
    expect(view.name).toBe(visitant.name)
    expect(view.email).toBe(visitant.email)
    expect(view.phone).toBe(visitant.phone)
    expect(view.id_device).toBe(visitant.id_device)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
