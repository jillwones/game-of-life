class GameOfLifeView {
  constructor(model) {
    this.model = model;
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
}

module.exports = GameOfLifeView;
