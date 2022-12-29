(() => {
  // index.js
  var Grid = class {
    constructor() {
      this.grid = null;
      const randomiseBtn = document.querySelector("#randomise");
      const clearBtn = document.querySelector("#clear");
      document.addEventListener("DOMContentLoaded", () => {
        clearBtn.click();
      });
      randomiseBtn.addEventListener("click", () => {
        this.randomise();
        this.view();
      });
      clearBtn.addEventListener("click", () => {
        this.clear();
        this.view();
      });
    }
    randomise() {
      let array = [];
      for (let i = 0; i < 35; i++) {
        array.push([]);
        for (let j = 0; j < 68; j++) {
          array[i][j] = Math.random() > 0.7 ? 1 : 0;
        }
      }
      this.grid = array;
    }
    clear() {
      let array = [];
      for (let i = 0; i < 35; i++) {
        array.push([]);
        for (let j = 0; j < 68; j++) {
          array[i][j] = 0;
        }
      }
      this.grid = array;
    }
    view() {
      let table = document.querySelector("table");
      if (!table) {
        table = document.createElement("table");
        document.querySelector("#grid").append(table);
      }
      table.innerHTML = "";
      for (let i = 0; i < 35; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 68; j++) {
          let cell = document.createElement("td");
          let checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          if (this.grid[i][j] === 1) {
            checkbox.checked = true;
          } else {
            checkbox.checked = false;
          }
          cell.append(checkbox);
          row.append(cell);
        }
        table.append(row);
      }
    }
  };
  var grid = new Grid();
})();
