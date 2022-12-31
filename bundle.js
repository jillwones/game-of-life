(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/model.js
  var require_model = __commonJS({
    "src/model.js"(exports, module) {
      var GameOfLifeModel2 = class {
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
              if (this.isCellAlive(
                (i + this.numOfRows) % this.numOfRows,
                (j + this.numOfColumns) % this.numOfColumns
              )) {
                count++;
              }
            }
          }
          return count;
        }
        isCellAlive(row, column) {
          return this.grid[row][column] === 1;
        }
      };
      module.exports = GameOfLifeModel2;
    }
  });

  // src/view.js
  var require_view = __commonJS({
    "src/view.js"(exports, module) {
      var GameOfLifeView2 = class {
        constructor(model2) {
          this.model = model2;
        }
        view() {
          let table = document.querySelector("table");
          if (!table) {
            table = document.createElement("table");
            document.querySelector("#grid").append(table);
          }
          table.innerHTML = "";
          for (let i = 0; i < this.model.numOfRows; i++) {
            let row = document.createElement("tr");
            for (let j = 0; j < this.model.numOfColumns; j++) {
              let cell = document.createElement("td");
              let checkbox = document.createElement("input");
              checkbox.type = "checkbox";
              if (this.model.grid[i][j] === 1) {
                checkbox.checked = true;
              } else {
                checkbox.checked = false;
              }
              checkbox.addEventListener("change", () => {
                this.model.grid[i][j] = checkbox.checked ? 1 : 0;
              });
              cell.append(checkbox);
              row.append(cell);
            }
            table.append(row);
          }
        }
      };
      module.exports = GameOfLifeView2;
    }
  });

  // src/controller.js
  var require_controller = __commonJS({
    "src/controller.js"(exports, module) {
      var GameOfLifeController2 = class {
        constructor(model2, view2) {
          this.model = model2;
          this.view = view2;
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
            this.model.randomise();
            this.view.view();
            clearInterval(this.intervalID);
            this.intervalID = null;
          });
          clearBtn.addEventListener("click", () => {
            this.model.clear();
            this.view.view();
            clearInterval(this.intervalID);
            this.intervalID = null;
          });
          fast.addEventListener("change", () => {
            if (fast.checked) {
              clearInterval(this.intervalID);
              this.model.speed = 20;
              this.start();
            }
          });
          slow.addEventListener("change", () => {
            if (slow.checked) {
              clearInterval(this.intervalID);
              this.model.speed = 200;
              this.start();
            }
          });
        }
        start() {
          this.intervalID = setInterval(() => {
            this.model.nextGeneration();
            this.view.view();
          }, this.model.speed);
        }
      };
      module.exports = GameOfLifeController2;
    }
  });

  // index.js
  var GameOfLifeModel = require_model();
  var GameOfLifeView = require_view();
  var GameOfLifeController = require_controller();
  var model = new GameOfLifeModel(35, 65);
  var view = new GameOfLifeView(model);
  var controller = new GameOfLifeController(model, view);
})();
