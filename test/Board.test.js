import Board from '../src/Board.js'
import Ship from '../src/Ship.js'
import { describe, expect, it } from '@jest/globals'

describe('Board', () => {
  it('should create a board', () => {
    const board = new Board(5, 5, [])
    expect(board.width).toBe(5)
    expect(board.height).toBe(5)
  })

  it('should create a board with ships', () => {
    const s1 = new Ship(5, 1)
    const s2 = new Ship(5, 1)
    const board = new Board(5, 5, [s1, s2])
    expect(board.width).toBe(5)
    expect(board.height).toBe(5)
    expect(board.ships.length).toBe(2)
  })

  it('can place ships on board', () => {
    const s1 = new Ship(5, 1, false)
    const s2 = new Ship(5, 1, true)
    const board = new Board(10, 10, [s1, s2])
    board.placeShip(0, 0, 0)
    expect(board.board[0][0]).toBe(s1)
    expect(board.board[0][1]).toBe(s1)
    expect(board.board[0][2]).toBe(s1)
    expect(board.board[0][3]).toBe(s1)
    expect(board.board[0][4]).toBe(s1)

    board.placeShip(0, 1, 1)
    expect(board.board[1][0]).toBe(s2)
    expect(board.board[2][0]).toBe(s2)
    expect(board.board[3][0]).toBe(s2)
    expect(board.board[4][0]).toBe(s2)
    expect(board.board[5][0]).toBe(s2)
  })
})
