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
    this.mockBoard = null
  }

  placeShip(x, y, index, mock = false) {
    if (mock) {
      this.createMockBoard()
    }
    if (this.ships[index].orientation) {
      for (let i = 0; i < this.ships[index].length; i++) {
        for (let j = 0; j < this.ships[index].width; j++) {
          this.validateCoordinates(x + j, y + i)
          if (mock) {
            this.mockBoard[y + i][x + j] = this.ships[index]
          } else {
            this.board[y + i][x + j] = this.ships[index]
          }
        }
      }
      this.ships[index].coords = [x, y]
    } else {
      for (let i = 0; i < this.ships[index].width; i++) {
        for (let j = 0; j < this.ships[index].length; j++) {
          this.validateCoordinates(x + j, y + i)
          if (mock) {
            this.mockBoard[y + i][x + j] = this.ships[index]
          } else {
            this.board[y + i][x + j] = this.ships[index]
          }
        }
      }
      this.ships[index].coords = [x, y]
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

  allShipsSunk() {
    for (let i = 0; i < this.ships.length; i++) {
      if (!this.ships[i].isSunk) {
        return false
      }
    }
    return true
  }

  hitCoordinate(x, y) {
    if (this.board[y][x] === null) {
      this.board[y][x] = false
      return false
    } else if (this.board[y][x] === false) {
      throw new Error('Already hit that empty spot in that location')
    } else {
      let shipCoordX = null
      let shipCoordY = null
      if (this.board[y][x].orientation) {
        shipCoordY = x - this.board[y][x].coords[0]
        shipCoordX = y - this.board[y][x].coords[1]
      } else {
        shipCoordX = x - this.board[y][x].coords[0]
        shipCoordY = y - this.board[y][x].coords[1]
      }

      if (this.board[y][x].body[shipCoordY][shipCoordX] === false) {
        throw new Error('Already hit that ship in that location')
      }

      this.board[y][x].takeHit(shipCoordX, shipCoordY)
      return true
    }
  }

  createMockBoard() {
    this.mockBoard = []
    let mockRow = []
    this.board.forEach((row) => {
      row.forEach((cell) => {
        mockRow.push(cell)
      })
      this.mockBoard.push(mockRow)
      mockRow = []
    })
  }
}
export default Board
