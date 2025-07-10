class Cell {
  xPos;
  yPos;
  alive = false;

  constructor(x, y) {
    this.xPos = x;
    this.yPos = y;
  }
}

function updateGame(grid) {
  if (generationNum == 0) {
    displayGrid(grid);
    generationNum++;
    return;
  }

  console.log("Generation: " + generationNum);
  updateGrid(grid);
  displayGrid(grid);

  generationNum++;
}

function updateGrid(grid) {
  const numAliveNeighboursGrid = getNumAliveNeighboursGrid(grid);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      updateCellState(grid[i][j], numAliveNeighboursGrid[i][j]);
    }
  }
}

function updateCellState(cell, numAliveNeighbours) {
  if (cell.alive) {
    if (numAliveNeighbours < 2 || numAliveNeighbours > 3) {
      cell.alive = false;
    }
  } else {
    if (numAliveNeighbours == 3) {
      cell.alive = true;
    }
  }
}

function getNumAliveNeighboursGrid(grid) {
  const numAliveNeighboursGrid = createGrid(grid.length);
  for (let i = 0; i < numAliveNeighboursGrid.length; i++) {
    for (let j = 0; j < numAliveNeighboursGrid.length; j++) {
      numAliveNeighboursGrid[i][j] = getNumAliveNeighbours(grid, grid[i][j])
    }
  }

  return numAliveNeighboursGrid;
}

function getNumAliveNeighbours(grid, cell) {
  let numAliveNeighbours = 0;
  for (let i = cell.xPos - 1; i < cell.xPos + 2; i++) {
    for (let j = cell.yPos - 1; j < cell.yPos + 2; j++) {
      if (i < 0 || i >= grid.length || j < 0 || j >= grid.length) {
        continue;
      }

      if (i == cell.xPos && j == cell.yPos) {
        continue;
      }

      if (grid[i][j].alive) {
        numAliveNeighbours++;
      }
    }
  }

  return numAliveNeighbours;
}

function createGrid(size) {
  const grid = new Array(size);
  for (let i = 0; i < size; i++) {
    grid[i] = new Array(size);
  }

  return grid;
}

function fillGridWithCells(grid) {
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(grid.length);
    for (let j = 0; j < grid.length; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }
}

function displayGrid(grid) {
  for (let i = 0; i < grid.length; i++) {
    line = "";
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j].alive) {
        line += "[#]";
      } else {
        line += "[ ]";
      }

      line += " ";
    }

    console.log(line);
  }
  console.log();
}

const SIZE = 25;
let generationNum = 0;

const gameGrid = createGrid(SIZE);
fillGridWithCells(gameGrid);
gameGrid[7][7].alive = true;
gameGrid[6][6].alive = true;
gameGrid[6][7].alive = true;
gameGrid[6][8].alive = true;

setInterval(function() { updateGame(gameGrid) }, 500);
