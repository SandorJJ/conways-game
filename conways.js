const CELL_PIXEL_AMOUNT = 24;

const UPDATE_SPEED = 250;

const ALIVE = "1";
const DEAD = "0";

let playing = false;
let updateIntervalId = 0;

let generationNum = 0;

window.onload = function() {
  createGrid();
};

function startButton() {
  if (!playing) {
    start();
  } else {
    stop();
  }
}

function start() {
  playing = true;
  document.getElementById("startStop").innerText = "Stop";
  updateIntervalId = setInterval(update, UPDATE_SPEED);
}

function stop() {
  playing = false;
  document.getElementById("startStop").innerText = "Start";
  clearInterval(updateIntervalId);
}

function update() {
  const numAliveNeighboursGrid = getNumAliveNeighboursGrid();

  for (let i = 0; i < document.getElementById("width").value; i++) {
    for (let j = 0; j < document.getElementById("height").value; j++) {
      updateCellState(j, i, numAliveNeighboursGrid[j][i]);
    }
  }
}

function getNumAliveNeighboursGrid() {
  const numAliveNeighboursGrid = create2DArray(document.getElementById("width").value, document.getElementById("height").value);

  for (let i = 0; i < numAliveNeighboursGrid.length; i++) {
    for (let j = 0; j < numAliveNeighboursGrid[i].length; j++) {
      numAliveNeighboursGrid[i][j] = getNumAliveNeighbours(j, i);
    }
  }

  return numAliveNeighboursGrid;
}

function create2DArray(x, y) {
  const array = new Array(parseInt(y));
  for (let i = 0; i < array.length; i++) {
    array[i] = new Array(parseInt(x));
  }

  return array;
}

function updateCellState(x, y, numAliveNeighbours) {
  const cell = document.getElementById("grid").rows[x].cells[y];

  if (cell.id === "alive" && (numAliveNeighbours < 2 || numAliveNeighbours > 3)) {
    inverseCellState(cell);
  } else if (cell.id === "" && numAliveNeighbours === 3) {
    inverseCellState(cell);
  }
}

function getNumAliveNeighbours(x, y) {
  let numAliveNeighbours = 0;
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i < 0 || j < 0 || i > document.getElementById("width").value - 1 || j > document.getElementById("height").value - 1) continue;

      if (i === x && j === y) continue;

      if (document.getElementById("grid").rows[j].cells[i].id === "alive") {
        numAliveNeighbours++;
      }
    }
  }

  return numAliveNeighbours;
}

function createGrid() {
  if (document.getElementById("grid")) {
    document.getElementById("grid").remove();
  }

  const table = document.createElement("table");
  const width = document.getElementById("width").value;
  const height = document.getElementById("height").value;
  table.style.width = width * CELL_PIXEL_AMOUNT + "px";
  table.style.height = height * CELL_PIXEL_AMOUNT + "px";
  table.id = "grid";

  for (let i = 0; i < height; i++) {
    const tr = document.createElement("tr");
    table.appendChild(tr);

    for (let j = 0; j < width; j++) {
      const td = document.createElement("td");
      td.id = "";
      tr.appendChild(td);
    }
  }

  document.getElementById("body").appendChild(table);

  addClickListener(table);
}

function addClickListener(table) {
  table.addEventListener("click", (event) => {
    if (playing) startButton();

    x = Math.floor(((event.clientX - table.getBoundingClientRect().left) / CELL_PIXEL_AMOUNT));
    y = Math.floor(((event.clientY - table.getBoundingClientRect().top) / CELL_PIXEL_AMOUNT));

    cell = document.getElementById("grid").rows[y].cells[x];
    inverseCellState(cell)
  });
}

function inverseCellState(cell) {
  if (cell.id === "alive") {
    cell.id = "";
  } else {
    cell.id = "alive";
  }
}
