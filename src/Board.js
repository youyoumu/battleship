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
          if (y + i >= this.height || x + j >= this.width) {
            throw new Error('Out of bounds')
          }
          if (this.board[y + i][x + j] !== null) {
            throw new Error('Ship cannot be placed on top of another ship')
          }
          this.board[y + i][x + j] = this.ships[index]
        }
      }
    } else {
      for (let i = 0; i < this.ships[index].width; i++) {
        for (let j = 0; j < this.ships[index].length; j++) {
          if (y + i >= this.height || x + j >= this.width) {
            throw new Error('Out of bounds')
          }
          if (this.board[y + i][x + j] !== null) {
            throw new Error('Ship cannot be placed on top of another ship')
          }
          this.board[y + i][x + j] = this.ships[index]
        }
      }
    }
  }

  print() {
    console.table(this.board)
  }
}
export default Board
