import Gui from './Gui.js'
import Player from './Player.js'
import Ship from './Ship.js'

class Game {
  constructor() {
    this.gui = new Gui()
    this.player1 = new Player(
      'Player 1',
      this.gui.boardWidth.value,
      this.gui.boardHeight.value,
      [
        new Ship(
          this.gui.ship1Length.value,
          this.gui.ship1Width.value,
          this.gui.ship1Orientation.checked
        ),
        new Ship(
          this.gui.ship2Length.value,
          this.gui.ship2Width.value,
          this.gui.ship2Orientation.checked
        ),
        new Ship(
          this.gui.ship3Length.value,
          this.gui.ship3Width.value,
          this.gui.ship3Orientation.checked
        ),
        new Ship(
          this.gui.ship4Length.value,
          this.gui.ship4Width.value,
          this.gui.ship4Orientation.checked
        ),
        new Ship(
          this.gui.ship5Length.value,
          this.gui.ship5Width.value,
          this.gui.ship5Orientation.checked
        ),
        new Ship(
          this.gui.ship6Length.value,
          this.gui.ship6Width.value,
          this.gui.ship6Orientation.checked
        )
      ]
    )
    this.player2 = new Player(
      'Player 2',
      this.gui.boardWidth.value,
      this.gui.boardHeight.value,
      [
        new Ship(
          this.gui.ship1Length.value,
          this.gui.ship1Width.value,
          this.gui.ship1Orientation.checked
        ),
        new Ship(
          this.gui.ship2Length.value,
          this.gui.ship2Width.value,
          this.gui.ship2Orientation.checked
        ),
        new Ship(
          this.gui.ship3Length.value,
          this.gui.ship3Width.value,
          this.gui.ship3Orientation.checked
        ),
        new Ship(
          this.gui.ship4Length.value,
          this.gui.ship4Width.value,
          this.gui.ship4Orientation.checked
        ),
        new Ship(
          this.gui.ship5Length.value,
          this.gui.ship5Width.value,
          this.gui.ship5Orientation.checked
        ),
        new Ship(
          this.gui.ship6Length.value,
          this.gui.ship6Width.value,
          this.gui.ship6Orientation.checked
        )
      ]
    )
  }

  start() {
    console.log(this.player1, this.player2)
    this.player1.board.placeShip(0, 0, 0)
    this.player1.board.placeShip(0, 2, 1)
    this.player1.board.hitCoordinate(0, 0)
    this.player1.board.hitCoordinate(0, 4)
    this.gui.printBoard(this.gui.pvcPlayerBoard, this.player1.board)
    this.gui.setGridSize()
  }
}

export default Game
