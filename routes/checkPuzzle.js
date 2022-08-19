const SudokuSolver = require("../controllers/sudoku-solver.js");
const splitPuzzleValuesWithKeys = require("./splitPuzzleValuesWithKeys.js");
const generatePuzzleValuesWithKeys = require("./generatePuzzleValuesWithKeys.js");
const checkIfvalueIsValidButAlreadyAddedToPuzzle = require("./checkIfvalueIsValidButAlreadyAddedToPuzzle.js");

const checkPuzzle = (puzzle, row = "Z", column = 10, value = 10) => {
  /** check if puzzle is solved and if value is in row/column or grid*/
  /** default values set so that function can also be called with puzzel only*/
  let solver = new SudokuSolver();

  // create object to save checks
  let checks = {};

  if (puzzle && row !== "Z" && column !== 10 && value !== 10) {
    /** reject default values set so that function can be called with only valid request values*/

    // check if puzzle is solved
    let isPuzzleSolved = solver.validate(puzzle);
    checks["validate"] = isPuzzleSolved;

    // check if value is in row
    let isValueAlreadyInRow = solver.checkRowPlacement(
      puzzle,
      row,
      column,
      value
    );
    // console.log("isValueAlreadyInRow", isValueAlreadyInRow);
    checks["checkRowPlacement"] = isValueAlreadyInRow;

    // check if value is in column
    let isValueAlreadyInColumn = solver.checkColPlacement(
      puzzle,
      row,
      column,
      value
    );
    // console.log('isValueAlreadyInColumn', isValueAlreadyInColumn);
    checks["checkColPlacement"] = isValueAlreadyInColumn;

    // check if value is in grid
    let isValueAlreadyInGrids = solver.checkRegionPlacement(
      puzzle,
      row,
      column,
      value
    );
    // console.log('isValueAlreadyInGrids', isValueAlreadyInGrids);
    checks["checkRegionPlacement"] = isValueAlreadyInGrids;

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

    // check if value is in specified cordinate in selected row
    let isValueIsValidButAlreadyAddedToPuzzle = checkIfvalueIsValidButAlreadyAddedToPuzzle(
      selectedRow,
      row,
      column,
      value
    );

    checks[
      "isValueIsValidButAlreadyAddedToPuzzle"
    ] = isValueIsValidButAlreadyAddedToPuzzle;
  } else {
    /**call function with puzzel only to recheck if puzzle is solved*/
    let isPuzzleSolved = solver.validate(puzzle);
    // console.log("isPuzzleSolved in checkPuzzle.js", isPuzzleSolved);
    checks["validate"] = isPuzzleSolved;
  }

  // console.log("checks in checkPuzzle.js", checks);
  return checks;
};

module.exports = checkPuzzle;
