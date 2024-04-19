import Gui from './Gui.js'
import Player from './Player.js'
import Ship from './Ship.js'

class Game {
  constructor() {
    this.ready = false
    this.coordsForComputer = []
    this.shipsIndexForComputer = []
    this.gui = new Gui()
    this.player1 = new Player(
      'Player 1',
      parseInt(this.gui.boardWidth.value),
      parseInt(this.gui.boardHeight.value),
      [
        new Ship(
          parseInt(this.gui.ship1Length.value),
          parseInt(this.gui.ship1Width.value),
          this.gui.ship1Orientation.checked
        ),
        new Ship(
          parseInt(this.gui.ship2Length.value),
          parseInt(this.gui.ship2Width.value),
          this.gui.ship2Orientation.checked
        ),
        new Ship(
          parseInt(this.gui.ship3Length.value),
          parseInt(this.gui.ship3Width.value),
          this.gui.ship3Orientation.checked
        ),
        new Ship(
          parseInt(this.gui.ship4Length.value),
          parseInt(this.gui.ship4Width.value),
          this.gui.ship4Orientation.checked
        ),
        new Ship(
          parseInt(this.gui.ship5Length.value),
          parseInt(this.gui.ship5Width.value),
          this.gui.ship5Orientation.checked
        ),
        new Ship(
          parseInt(this.gui.ship6Length.value),
          parseInt(this.gui.ship6Width.value),
          this.gui.ship6Orientation.checked
        )
      ]
    )
    this.player2 = new Player(
      'Computer',
      parseInt(this.gui.boardWidth.value),
      parseInt(this.gui.boardHeight.value),
      [
        new Ship(
          parseInt(this.gui.ship1Length.value),
          parseInt(this.gui.ship1Width.value),
          this.gui.ship1Orientation.checked
        ),
        new Ship(
          parseInt(this.gui.ship2Length.value),
          parseInt(this.gui.ship2Width.value),
          this.gui.ship2Orientation.checked
        ),
        new Ship(
          parseInt(this.gui.ship3Length.value),
          parseInt(this.gui.ship3Width.value),
          this.gui.ship3Orientation.checked
        ),
        new Ship(
          parseInt(this.gui.ship4Length.value),
          parseInt(this.gui.ship4Width.value),
          this.gui.ship4Orientation.checked
        ),
        new Ship(
          parseInt(this.gui.ship5Length.value),
          parseInt(this.gui.ship5Width.value),
          this.gui.ship5Orientation.checked
        ),
        new Ship(
          parseInt(this.gui.ship6Length.value),
          parseInt(this.gui.ship6Width.value),
          this.gui.ship6Orientation.checked
        )
      ]
    )
  }

  start() {
    this.gui.printName(this.gui.pvcPlayerName, this.player1.name)
    this.gui.printBoard(this.gui.pvcPlayerBoard, this.player1.board)

    this.gui.printName(this.gui.pvcComputerName, this.player2.name)
    this.gui.printBoard(this.gui.pvcComputerBoard, this.player2.board)
    this.gui.setGridSize()
    if (this.ready) {
      this.placeComputerShips(
        this.coordsForComputer,
        this.shipsIndexForComputer
      )
      console.table(this.player2.board.board)
      this.player1.attack(this.player2, this)
      this.gui.showToast('Game started')
    } else {
      this.prepare()
    }
  }

  prepare() {
    this.gui.arrangeShips(this.hoverCallback, this.clickCallback, this)
  }

  hoverCallback(e, game) {
    const x = parseInt(e.target.dataset.x)
    const y = parseInt(e.target.dataset.y)
    const index = parseInt(game.gui.shipSelect.value)
    const ship = game.player1.board.ships[index]
    const shipLength = ship.length
    const shipWidth = ship.width

    if (ship.orientation) {
      if (
        x + shipWidth <= game.player1.board.width &&
        y + shipLength <= game.player1.board.height
      ) {
        let overlap = false
        for (let i = 0; i < shipLength; i++) {
          for (let j = 0; j < shipWidth; j++) {
            if (game.player1.board.board[y + i][x + j] !== null) {
              overlap = true
            }
          }
        }
        if (!overlap) {
          game.player1.board.placeShip(x, y, index, true)
        }
      }
    } else {
      if (
        x + shipLength <= game.player1.board.width &&
        y + shipWidth <= game.player1.board.height
      ) {
        let overlap = false
        for (let i = 0; i < shipWidth; i++) {
          for (let j = 0; j < shipLength; j++) {
            if (game.player1.board.board[y + i][x + j] !== null) {
              overlap = true
            }
          }
        }
        if (!overlap) {
          game.player1.board.placeShip(x, y, index, true)
        }
      }
    }
    game.gui.reprintBoard(game.gui.pvcPlayerBoard, game.player1.board)
  }

  clickCallback(e, game) {
    const x = parseInt(e.target.dataset.x)
    const y = parseInt(e.target.dataset.y)
    const index = parseInt(game.gui.shipSelect.value)
    const ship = game.player1.board.ships[index]
    const shipLength = ship.length
    const shipWidth = ship.width

    if (ship.orientation) {
      if (
        x + shipWidth <= game.player1.board.width &&
        y + shipLength <= game.player1.board.height
      ) {
        let overlap = false
        for (let i = 0; i < shipLength; i++) {
          for (let j = 0; j < shipWidth; j++) {
            if (game.player1.board.board[y + i][x + j] !== null) {
              overlap = true
            }
          }
        }
        if (!overlap) {
          game.player1.board.placeShip(x, y, index)
          game.coordsForComputer.push([x, y])
          game.shipsIndexForComputer.push(index)
          if (game.coordsForComputer.length < 6) {
            game.gui.shipSelect[
              game.gui.shipSelect.selectedIndex
            ].disabled = true
            for (let i = 0; i < game.gui.shipSelect.length; i++) {
              if (!game.gui.shipSelect[i].disabled) {
                game.gui.shipSelect.selectedIndex = i
                break
              }
            }
          } else {
            game.ready = true
            game.start()
          }
        }
      }
    } else {
      if (
        x + shipLength <= game.player1.board.width &&
        y + shipWidth <= game.player1.board.height
      ) {
        let overlap = false
        for (let i = 0; i < shipWidth; i++) {
          for (let j = 0; j < shipLength; j++) {
            if (game.player1.board.board[y + i][x + j] !== null) {
              overlap = true
            }
          }
        }
        if (!overlap) {
          game.player1.board.placeShip(x, y, index)
          game.coordsForComputer.push([x, y])
          game.shipsIndexForComputer.push(index)
          if (game.coordsForComputer.length < 6) {
            game.gui.shipSelect[
              game.gui.shipSelect.selectedIndex
            ].disabled = true
            for (let i = 0; i < game.gui.shipSelect.length; i++) {
              if (!game.gui.shipSelect[i].disabled) {
                game.gui.shipSelect.selectedIndex = i
                break
              }
            }
          } else {
            game.ready = true
            game.start()
          }
        }
      }
    }
  }

  placeComputerShips(coords, shipsIndex) {
    for (let i = 0; i < coords.length; i++) {
      this.player2.board.placeShip(coords[i][0], coords[i][1], shipsIndex[i])
    }
  }

  endGame(player) {
    this.gui.showToast(`Game over, ${player.name} won!`)
    this.gui.printBoard(this.gui.pvcPlayerBoard, this.player1.board)
    this.gui.printBoard(this.gui.pvcComputerBoard, this.player2.board)
  }
}

export default Game
