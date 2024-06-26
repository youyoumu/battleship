import oof from './sfx/oof.mp3'
import newOof from './sfx/new-oof.mp3'
import miss from './sfx/miss.wav'

class Gui {
  constructor() {
    this.oof = new Audio(oof)
    this.newOof = new Audio(newOof)
    this.miss = new Audio(miss)

    this.boardWidth = document.getElementById('board-width')
    this.boardHeight = document.getElementById('board-height')
    this.pvp = document.getElementById('pvp')
    this.mirror = document.getElementById('mirror')
    this.unfair = document.getElementById('unfair')

    this.toast = document.getElementById('toast')
    this.toastMessage = document.getElementById('toast-message')
    this.shipSelect = document.getElementById('ship-select')
    this.shipSelect.selectedIndex = 0
    for (let i = 0; i < this.shipSelect.options.length; i++) {
      this.shipSelect.options[i].disabled = false
    }

    this.pvcPlayerBoard = document.getElementById('pvc-player-board')
    this.pvcPlayerName = document.getElementById('pvc-player-name')
    this.pvcComputerBoard = document.getElementById('pvc-computer-board')
    this.pvcComputerName = document.getElementById('pvc-computer-name')

    this.ship1Length = document.getElementById('ship-1-length')
    this.ship1Width = document.getElementById('ship-1-width')
    this.ship1Orientation = document.getElementById('ship-1-orientation')

    this.ship2Length = document.getElementById('ship-2-length')
    this.ship2Width = document.getElementById('ship-2-width')
    this.ship2Orientation = document.getElementById('ship-2-orientation')

    this.ship3Length = document.getElementById('ship-3-length')
    this.ship3Width = document.getElementById('ship-3-width')
    this.ship3Orientation = document.getElementById('ship-3-orientation')

    this.ship4Length = document.getElementById('ship-4-length')
    this.ship4Width = document.getElementById('ship-4-width')
    this.ship4Orientation = document.getElementById('ship-4-orientation')

    this.ship5Length = document.getElementById('ship-5-length')
    this.ship5Width = document.getElementById('ship-5-width')
    this.ship5Orientation = document.getElementById('ship-5-orientation')

    this.ship6Length = document.getElementById('ship-6-length')
    this.ship6Width = document.getElementById('ship-6-width')
    this.ship6Orientation = document.getElementById('ship-6-orientation')
  }

  printBoard(boardElement, board) {
    boardElement.innerHTML = ''
    for (let i = 0; i < board.height; i++) {
      for (let j = 0; j < board.width; j++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        if (board.board[i][j]) {
          cell.classList.add('ship')
          if (board.board[i][j].orientation) {
            const shipCoordY = j - board.board[i][j].coords[0]
            const shipCoordX = i - board.board[i][j].coords[1]
            if (board.board[i][j].body[shipCoordY][shipCoordX] === false) {
              cell.classList.add('hit')
            }
          } else {
            const shipCoordX = j - board.board[i][j].coords[0]
            const shipCoordY = i - board.board[i][j].coords[1]
            if (board.board[i][j].body[shipCoordY][shipCoordX] === false) {
              cell.classList.add('hit')
            }
          }
        } else if (board.board[i][j] === false) {
          cell.classList.add('miss')
        }
        cell.dataset.x = j
        cell.dataset.y = i
        boardElement.appendChild(cell)
      }
    }
  }

  setGridSize() {
    this.pvcPlayerBoard.style.gridTemplateColumns = `repeat(${this.boardWidth.value}, 1fr)`
    this.pvcPlayerBoard.style.gridTemplateRows = `repeat(${this.boardHeight.value}, 1fr)`
    this.pvcComputerBoard.style.gridTemplateColumns = `repeat(${this.boardWidth.value}, 1fr)`
    this.pvcComputerBoard.style.gridTemplateRows = `repeat(${this.boardHeight.value}, 1fr)`
  }

  printName(nameElement, name) {
    nameElement.innerHTML = name
  }

  arrangeShips(hoverCallback, clickCallback, game) {
    const cells = this.pvcPlayerBoard.childNodes
    cells.forEach((cell) => {
      cell.addEventListener('mouseover', (e) => hoverCallback(e, game))
    })
    cells.forEach((cell) => {
      cell.addEventListener('click', (e) => clickCallback(e, game))
    })
  }

  reprintBoard(boardElement, board) {
    if (board.mockBoard === null) {
      return
    }
    const cells = boardElement.childNodes
    for (let i = 0; i < board.height; i++) {
      for (let j = 0; j < board.width; j++) {
        if (board.mockBoard[i][j] === 'invalid') {
          cells[i * board.width + j].classList.add('invalid')
        } else if (board.mockBoard[i][j]) {
          cells[i * board.width + j].classList.remove('invalid')
          cells[i * board.width + j].classList.add('ship')
        } else {
          cells[i * board.width + j].classList.remove('invalid')
          cells[i * board.width + j].classList.remove('ship')
        }
      }
    }
  }

  attackShips(clickCallback, game, enemy, player) {
    const cells = this.pvcComputerBoard.childNodes
    cells.forEach((cell) => {
      cell.addEventListener('click', (e) =>
        clickCallback(e, game, enemy, player)
      )
    })
  }

  showToast(message) {
    this.toastMessage.innerHTML = message
    this.toast.classList.remove('invisible')
    this.toast.classList.remove('inactive')
    this.toast.classList.add('active')
    setTimeout(() => {
      this.toast.classList.add('invisible')
      this.toast.classList.add('inactive')
    }, 3000)
  }

  playOof() {
    this.oof.play()
  }

  playNewOof() {
    this.newOof.play()
  }

  playMiss() {
    this.miss.play()
  }
}

export default Gui
