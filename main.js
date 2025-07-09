class Cell {
  xPos;
  yPos;
  alive = false;

  constructor(x, y) {
    this.xPos = x;
    this.yPos = y;
  }
}

const cells = createCells(3);
displayCells(cells);

cells[1][1].alive = true;
cells[0][0].alive = true;
cells[0][1].alive = true;
cells[0][2].alive = true;
displayCells(cells);

updateCells(cells);
displayCells(cells);


function createCells(size) {
  const cells = new Array(size);
  for (let i = 0; i < cells.length; i++) {
    cells[i] = new Array(size);
  }

  for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < cells.length; j++) {
      cells[i][j] = new Cell(i, j);
    }
  }

  return cells;
}

function displayCells(cells) {
  for (let i = 0; i < cells.length; i++) {
    line = "";
    for (let j = 0; j < cells.length; j++) {
      if (cells[i][j].alive) {
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

function updateCells(cells) {
  const previousGeneration = createCells(cells.length);
  for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < cells.length; j++) {
      if (cells[i][j].alive) {
        previousGeneration[i][j].alive = true;
      }
    }
  }

  for (let i = 0; i < previousGeneration.length; i++) {
    for (let j = 0; j < previousGeneration.length; j++) {
      updateCellState(cells[i][j], previousGeneration[i][j]);
    }
  }
}

function updateCellState(cellToUpdate, cellPreviousState) {
  const numAliveNeighbours = checkNeighbours(cellPreviousState);

  if (cellPreviousState.alive && (numAliveNeighbours < 2 || numAliveNeighbours > 3)) {
    cellToUpdate.alive = false;
  }

  if (!cellPreviousState.alive && numAliveNeighbours == 3) {
    cellToUpdate.alive = true;
  }
}

function checkNeighbours(cell) {
  let numAliveNeighbours = 0;
  for (let i = cell.xPos - 1; i < cell.xPos + 2; i++) {
    for (let j = cell.yPos - 1; j < cell.yPos + 2; j++) {
      if (i < 0 || i >= cells.length || j < 0 || j >= cells.length) {
        continue;
      }

      if (i == cell.xPos && j == cell.yPos) {
        continue;
      }

      if (cells[i][j].alive) {
        numAliveNeighbours++;
      }
    }
  }

  return numAliveNeighbours;
}
