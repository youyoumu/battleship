class Ship {
  constructor(length, width, orientation) {
    this.length = length
    this.width = width
    this.orientation = orientation
    this.isSunk = false
    this.maxHp = this.length * this.width
    this.hp = this.maxHp
    this.coords = null

    this.body = []
    const row = []
    for (let i = 0; i < this.length; i++) {
      row.push(true)
    }
    for (let i = 0; i < this.width; i++) {
      this.body.push([...row])
    }
  }

  takeHit(x, y) {
    this.body[y][x] = false
    this.hp--
    if (this.hp === 0) {
      this.isSunk = true
    }
  }

  print() {
    console.table(this.body)
  }
}
export default Ship
