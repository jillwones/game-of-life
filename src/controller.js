class GameOfLifeController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

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
}

module.exports = GameOfLifeController;
