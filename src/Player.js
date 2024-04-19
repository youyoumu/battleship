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
    const attackedCoordsString = player.attackedCoords.map((coord) => {
      return `[${coord[0]}, ${coord[1]}]`
    })

    if (!attackedCoordsString.includes(`[${x}, ${y}]`)) {
      player.attackedCoords.push([x, y])
      if (enemy.board.hitCoordinate(x, y)) {
        e.target.classList.add('hit')
        game.gui.playNewOof()
      } else {
        e.target.classList.add('miss')
        game.gui.playMiss()
      }
      if (enemy.isLost()) {
        game.endGame(player)
      }
      enemy.computerAttack(player, game)
    }
  }

  computerAttack(player, game) {
    const x = Math.floor(Math.random() * this.board.width)
    const y = Math.floor(Math.random() * this.board.height)
    const attackedCoordsString = this.attackedCoords.map((coord) => {
      return `[${coord[0]}, ${coord[1]}]`
    })

    if (!attackedCoordsString.includes(`[${x}, ${y}]`)) {
      this.attackedCoords.push([x, y])

      if (player.board.hitCoordinate(x, y)) {
        game.gui.playOof()
        if (game.unfair) {
          this.computerAttack(player, game)
        }
      }
      game.gui.printBoard(game.gui.pvcPlayerBoard, player.board)
      if (player.isLost()) {
        game.endGame(this)
      }
    } else {
      this.computerAttack(player, game)
    }
  }
}
export default Player
