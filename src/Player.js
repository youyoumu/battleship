import Board from './Board.js'

class Player {
  constructor(name, boardWidth, boardHeight, ships) {
    this.name = name
    this.board = new Board(boardWidth, boardHeight, ships)
    this.attackedCoords = []
  }

  isLost() {
    return this.board.allShipsSunk()
  }

  attack(enemy, game) {
    game.gui.attackShips(this.attackCallback, game, enemy, this)
  }

  attackCallback(e, game, enemy, player) {
    const x = parseInt(e.target.dataset.x)
    const y = parseInt(e.target.dataset.y)

    if (!player.attackedCoords.includes([x, y])) {
      player.attackedCoords.push([x, y])
      if (enemy.board.hitCoordinate(x, y)) {
        e.target.classList.add('hit')
      } else {
        e.target.classList.add('miss')
      }
      // if (enemy.isLost()) {
      //   game.endGame()
      // }
    }
  }
}
export default Player
