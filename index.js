const GameOfLifeModel = require("./src/model");
const GameOfLifeView = require("./src/view");
const GameOfLifeController = require("./src/controller");

const model = new GameOfLifeModel(35, 65);
const view = new GameOfLifeView(model);
const controller = new GameOfLifeController(model, view);
