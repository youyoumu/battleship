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
      enemy.computerAttack(player, game)
    }
  }

  computerAttack(player, game) {
    const x = Math.floor(Math.random() * this.board.width)
    const y = Math.floor(Math.random() * this.board.height)

    if (!this.attackedCoords.includes([x, y])) {
      this.attackedCoords.push([x, y])
      player.board.hitCoordinate(x, y)
      game.gui.printBoard(game.gui.pvcPlayerBoard, player.board)
    }
  }
}
export default Player
