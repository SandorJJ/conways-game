class Cell {
  xPos;
  yPos;
  alive = false;

  constructor(x, y) {
    this.xPos = x;
    this.yPos = y;
  }

  getNumAliveNeighbours(grid) {
    let numAliveNeighbours = 0;
    for (let i = this.xPos - 1; i < this.xPos + 2; i++) {
      for (let j = this.yPos - 1; j < this.yPos + 2; j++) {
        if (i < 0 || i >= grid.length || j < 0 || j >= grid.length) {
          continue;
        }

        if (i == this.xPos && j == this.yPos) {
          continue;
        }

        if (grid[i][j].alive) {
          numAliveNeighbours++;
        }
      }
    }

    return numAliveNeighbours;
  }
}
