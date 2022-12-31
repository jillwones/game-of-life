class GameOfLifeModel {
  constructor(numOfRows, numOfColumns) {
    this.grid = null;
    this.intervalID = null;
    this.speed = 200;
    this.numOfRows = numOfRows;
    this.numOfColumns = numOfColumns;
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
  }

  countAliveNeighbours(row, column) {
    let count = 0;
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = column - 1; j <= column + 1; j++) {
        if (i === row && j === column) {
          continue;
        }
        if (
          this.isCellAlive(
            (i + this.numOfRows) % this.numOfRows,
            (j + this.numOfColumns) % this.numOfColumns
          )
        ) {
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

module.exports = GameOfLifeModel;
