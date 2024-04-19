import Game from './Game.js'
import './output.css'

let game = new Game()
game.start()

const settingsClose = document.getElementById('settings-close')
settingsClose.addEventListener('click', () => {
  game = new Game()
  game.start()
})
