const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
// const solvePuzzle = require("../routes/solvePuzzle.js");
const solver = new Solver();
const puzzleCordinates = require("../routes/puzzleCordinates.js");
const GeneratePuzzleCordinatesWithKeys = require("../routes/GeneratePuzzleCordinatesWithKeys.js");
const checkIfvalueIsValidButAlreadyAddedToPuzzle = require("../routes/checkIfvalueIsValidButAlreadyAddedToPuzzle.js");
const splitPuzzleValuesWithKeys = require("../routes/splitPuzzleValuesWithKeys.js");
const generatePuzzleValuesWithKeys = require("../routes/generatePuzzleValuesWithKeys.js");
const markOriginalPuzzle = require("../routes/markOriginalPuzzle.js");
const generateCordinatesOfEmptyValues = require("../routes/generateCordinatesOfEmptyValues");

suite("", function () {
  this.timeout("120s");
  suite("UnitTests", () => {
    test("#1 Logic handles a valid puzzle string of 81 characters", () => {
      let validPuzzle =
        "9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      // console.log(solver.validate(validPuzzle));
      assert.isTrue(solver.validatePuzzleValuesAndLength(validPuzzle));
    });

    test("#2 Logic handles a puzzle string with invalid characters (not 1-9 or .)", () => {
      let inValidPuzzle =
        "AA9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      assert.isFalse(solver.validatePuzzleValuesAndLength(inValidPuzzle));
    });

    test("#3 Logic handles a puzzle string that is not 81 characters in length", () => {
      let inValidPuzzle =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6...";
      assert.isFalse(solver.validate(inValidPuzzle));
    });

    test("#4 Logic handles a valid row placement", () => {
      let puzzle =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      assert.isFalse(solver.checkRowPlacement(puzzle, "A", "1", "7"));
    });

    test("#5 Logic handles an invalid row placement", () => {
      let puzzle =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      assert.isTrue(solver.checkRowPlacement(puzzle, "A", "3", "9"));
    });

    test("#6 Logic handles a valid column placement", () => {
      let puzzle =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      assert.isFalse(solver.checkColPlacement(puzzle, "A", "1", "7"));
    });

    test("#7 Logic handles an invalid column placement", () => {
      let puzzle =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      assert.isTrue(solver.checkColPlacement(puzzle, "A", "3", "9"));
    });

    test("#8 Logic handles a valid region (3x3 grid) placement", () => {
      let puzzle =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      assert.isFalse(solver.checkRegionPlacement(puzzle, "A", "1", "7"));
    });

    test("#9 Logic handles an invalid region (3x3 grid) placement", () => {
      let puzzle =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      assert.isTrue(solver.checkRegionPlacement(puzzle, "A", "3", "9"));
    });

    test("#10 Valid puzzle strings pass the solver", () => {
      let completePuzzle =
        "969725318851473692432716895145769283397824561628713549236785194518924637749312658";
      assert.isTrue(solver.validate(completePuzzle));
    });

    test("#11 Invalid puzzle strings fail the solver", () => {
      let inCompletePuzzle =
        "9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      assert.isFalse(solver.validate(inCompletePuzzle));
    });
    test("#12 Solver returns the expected solution for an incomplete puzzle", () => {
      let inCompletevalidVPuzzle =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

      let solvedPuzzle;

      if (solver.validatePuzzleValuesAndLength(inCompletevalidVPuzzle)) {
        solvedPuzzle = solver.solve(inCompletevalidVPuzzle);
      }
      assert.isTrue(solver.validate(solvedPuzzle));
    });

    test("#13 check if value is in specified cordinate in selected row ", () => {
      let puzzle =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      let row = "C";
      let column = "3";
      let value = "2";

      // console.log("row", row, "column", column, "value", value);
      // create an array of puzzle string values
      let puzzleValuesWithKeys = generatePuzzleValuesWithKeys(puzzle);
      // console.log('puzzleValuesWithKeys in solvePuzzle.js:', puzzleValuesWithKeys)

      // iterate puzzleValuesWithKeys and separate items into respective rows
      let splitedPuzzleValuesWithKeys = splitPuzzleValuesWithKeys(
        puzzleValuesWithKeys
      );
      // console.log( "splitedPuzzleValuesWithKeys before", splitedPuzzleValuesWithKeys);

      // select respective row based on provided cordinate
      let selectedRow = splitedPuzzleValuesWithKeys[row];
      // console.log("selectedRow", selectedRow);

      let isValidButAlreadyAddedToPuzzle = checkIfvalueIsValidButAlreadyAddedToPuzzle(
        selectedRow,
        row,
        column,
        value
      );

      // console.log(
      //   "isValidButAlreadyAddedToPuzzle",
      //   isValidButAlreadyAddedToPuzzle
      // );
      assert.isTrue(isValidButAlreadyAddedToPuzzle);
    });
  });
});
