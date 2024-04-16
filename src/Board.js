class Board {
  constructor(width, height, ships) {
    this.width = width
    this.height = height
    this.ships = ships

    this.board = []
    const row = []
    for (let i = 0; i < width; i++) {
      row.push(null)
    }
    for (let i = 0; i < height; i++) {
      this.board.push([...row])
    }
  }

  placeShip(x, y, index) {
    if (this.ships[index].orientation) {
      for (let i = 0; i < this.ships[index].length; i++) {
        for (let j = 0; j < this.ships[index].width; j++) {
          this.validateCoordinates(x + j, y + i)
          this.board[y + i][x + j] = this.ships[index]
        }
      }
    } else {
      for (let i = 0; i < this.ships[index].width; i++) {
        for (let j = 0; j < this.ships[index].length; j++) {
          this.validateCoordinates(x + j, y + i)
          this.board[y + i][x + j] = this.ships[index]
        }
      }
    }
  }

  validateCoordinates(x, y) {
    if (y >= this.height || x >= this.width) {
      throw new Error('Out of bounds')
    }
    if (this.board[y][x] !== null) {
      throw new Error('Ship cannot be placed on top of another ship')
    }
  }

  print() {
    console.table(this.board)
  }
}
export default Board
