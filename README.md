# Conway's Game of Life

[Play the Game of Life](https://jillwones.github.io/game-of-life/)

### Introduction

This is an implementation of the Game of Life, a cellular automaton created by John Horton Conway in 1970. The simulation is a zero-player game that evolves based on a set of rules and the initial state of the grid. This implementation allows users to control the speed of the simulation, randomize or clear the grid, and view the next generation of cells.

### Getting Started

1. Clone the repository to your local machine.
2. Open the index.html file in your browser.

### Usage

The program starts with a grid of cells, with each cell being in one of two states: alive or dead. The user can control the speed of the simulation using the provided controls. The user can also randomize the grid by clicking the "Randomize" button, or clear the grid by clicking the "Clear" button. Once the game is running the user can pause the game my clicking the start button again. The program will continue to evolve the grid according to the Game of Life rules and display the next generation of cells in real-time.

### Code Structure

The program is separated into three main parts:

1. Model: The GameOfLifeModel class is responsible for the grid and its evolution. It contains methods for randomizing, clearing, and calculating the next generation of cells.
2. View: The GameOfLifeView class is responsible for the visual representation of the grid. It contains a method for displaying the grid on the screen.
3. Controller: The GameOfLifeController class is responsible for handling user input and updating the model and view accordingly.
