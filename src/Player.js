import Board from './Board.js'

class Player {
  constructor(name, boardWidth, boardHeight, ships) {
    this.name = name
    this.board = new Board(boardWidth, boardHeight, ships)
  }

  isLost() {
    return this.board.allShipsSunk()
  }

  attack(player) {
    console.log('attacking')
  }
}
export default Player
