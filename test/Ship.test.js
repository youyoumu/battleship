import Ship from '../src/Ship'
import { describe, expect, it } from '@jest/globals'

describe('Ship', () => {
  it('should create a ship', () => {
    const ship = new Ship(5, 5)
    expect(ship.length).toBe(5)
    expect(ship.width).toBe(5)
  })

  it('create ship body', () => {
    const ship = new Ship(5, 5)
    expect(ship.body.length).toBe(ship.width)
    expect(ship.body[0].length).toBe(ship.length)
  })

  it('can be hit', () => {
    const ship = new Ship(5, 1)
    ship.takeHit(0, 0)
    expect(ship.body[0][0]).toBe(false)
    expect(ship.hp).toBe(ship.maxHp - 1)
  })

  it('sink when destroyed', () => {
    const ship = new Ship(5, 1)
    ship.takeHit(0, 0)
    ship.takeHit(0, 1)
    ship.takeHit(0, 2)
    ship.takeHit(0, 3)
    ship.takeHit(0, 4)
    expect(ship.hp).toBe(0)
    expect(ship.isSunk).toBe(true)
  })
})
