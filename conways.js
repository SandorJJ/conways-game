function updateGame(grid) {
  if (generationNum == 0) {
    displayGridToConsole(grid);
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
      numAliveNeighboursGrid[i][j] = grid[i][j].getNumAliveNeighbours(grid);
    }
  }

  return numAliveNeighboursGrid;
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

function displayGridToConsole(grid) {
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

//setInterval(function() { updateGame(gameGrid) }, 500);
//
const CELL_PIXEL_AMOUNT = 24;

function createGridTable() {
  if (document.getElementById("grid")) {
    document.getElementById("grid").remove();
  }

  const width = document.getElementById("width").value;
  const height = document.getElementById("height").value;

  const table = document.createElement("table");
  table.style.width = width * CELL_PIXEL_AMOUNT + "px";
  table.style.height = height * CELL_PIXEL_AMOUNT + "px";
  table.id = "grid";

  table.addEventListener("click", (event) => {
    x = Math.floor(((event.clientX - table.getBoundingClientRect().left) / CELL_PIXEL_AMOUNT));
    y = Math.floor(((event.clientY - table.getBoundingClientRect().top) / CELL_PIXEL_AMOUNT));

    cell = document.getElementById("grid").rows[y].cells[x];
    if (cell.id == "alive") {
      cell.id = "";
    } else {
      cell.id = "alive";
    }
  });

  for (let i = 0; i < height; i++) {
    const tr = document.createElement("tr");
    table.appendChild(tr);

    for (let j = 0; j < width; j++) {
      const td = document.createElement("td");
      tr.appendChild(td);
    }
  }

  document.getElementById("body").appendChild(table);
}
