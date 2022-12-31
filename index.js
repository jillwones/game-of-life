class GameOfLife {
  constructor(numOfRows, numOfColumns) {
    this.grid = null;
    this.intervalID = null;
    this.speed = 200;
    this.numOfRows = numOfRows;
    this.numOfColumns = numOfColumns;

    const randomiseBtn = document.querySelector("#randomise");
    const clearBtn = document.querySelector("#clear");
    const startBtn = document.querySelector("#start");
    const fast = document.querySelector("#fast");
    const slow = document.querySelector("#slow");

    document.addEventListener("DOMContentLoaded", () => {
      clearBtn.click();
    });

    startBtn.addEventListener("click", () => {
      if (this.intervalID) {
        clearInterval(this.intervalID);
        this.intervalID = null;
      } else {
        this.start();
      }
    });

    randomiseBtn.addEventListener("click", () => {
      this.randomise();
      this.view();
      clearInterval(this.intervalID);
      this.intervalID = null;
    });

    clearBtn.addEventListener("click", () => {
      this.clear();
      this.view();
      clearInterval(this.intervalID);
      this.intervalID = null;
    });

    fast.addEventListener("change", () => {
      if (fast.checked) {
        clearInterval(this.intervalID)
        this.speed = 20;
        this.start()
      }
    });

    slow.addEventListener("change", () => {
      if (slow.checked) {
        clearInterval(this.intervalID)
        this.speed = 200;
        this.start()
      }
    });
  }

  randomise() {
    let array = [];
    for (let i = 0; i < this.numOfRows; i++) {
      array.push([]);
      for (let j = 0; j < this.numOfColumns; j++) {
        array[i][j] = Math.random() > 0.7 ? 1 : 0;
      }
    }
    this.grid = array;
  }

  clear() {
    let array = [];
    for (let i = 0; i < this.numOfRows; i++) {
      array.push([]);
      for (let j = 0; j < this.numOfColumns; j++) {
        array[i][j] = 0;
      }
    }
    this.grid = array;
  }

  start() {
    this.intervalID = setInterval(() => this.nextGeneration(), this.speed);
  }

  view() {
    let table = document.querySelector("table");
    if (!table) {
      table = document.createElement("table");
      document.querySelector("#grid").append(table);
    }
    table.innerHTML = "";
    for (let i = 0; i < this.numOfRows; i++) {
      let row = document.createElement("tr");
      for (let j = 0; j < this.numOfColumns; j++) {
        let cell = document.createElement("td");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        if (this.grid[i][j] === 1) {
          checkbox.checked = true;
        } else {
          checkbox.checked = false;
        }
        checkbox.addEventListener("change", () => {
          this.grid[i][j] = checkbox.checked ? 1 : 0;
        });
        cell.append(checkbox);
        row.append(cell);
      }
      table.append(row);
    }
  }

  nextGeneration() {
    let nextGen = [];
    for (let i = 0; i < this.numOfRows; i++) {
      nextGen.push([]);
      for (let j = 0; j < this.numOfColumns; j++) {
        let aliveNeighbours = this.countAliveNeighbours(i, j);
        if (this.isCellAlive(i, j)) {
          if (aliveNeighbours === 2 || aliveNeighbours === 3) {
            nextGen[i][j] = 1;
          } else {
            nextGen[i][j] = 0;
          }
        } else {
          if (aliveNeighbours === 3) {
            nextGen[i][j] = 1;
          } else {
            nextGen[i][j] = 0;
          }
        }
      }
    }
    this.grid = nextGen;
    this.view();
  }

  countAliveNeighbours(row, column) {
    let count = 0;
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = column - 1; j <= column + 1; j++) {
        if (i === row && j === column) {
          continue;
        }
        if (this.isCellAlive((i + this.numOfRows) % this.numOfRows, (j + this.numOfColumns) % this.numOfColumns)) {
          count++;
        }
      }
    }
    return count;
  }

  isCellAlive(row, column) {
    return this.grid[row][column] === 1;
  }
}

const game = new GameOfLife(35, 65);
