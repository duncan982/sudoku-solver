// "use strict";

// const SudokuSolver = require("../controllers/sudoku-solver.js");

const checkPuzzle = require("./checkPuzzle.js");

const checkToDetectIssues = require("./checkToDetectIssues.js");

const solvePuzzle = require("./solvePuzzle.js");

const updatePuzzleString = require("./updatePuzzleString.js");
module.exports = function (app) {
  // let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    // console.log('first post: req.body', req.body);

    const { puzzle, coordinate, value } = req.body;
    // console.log('puzzle', puzzle)
    // console.log('coordinate', coordinate)
    // console.log('value', value)

    // split coordinate to obtain row and column
    let row = coordinate.split("")[0];
    let column = coordinate.split("")[1];
    //    console.log('row in request is', row, 'and column in request is', column)

    //check if puzzle is solved and if value is in row/column or grid
    let checks = checkPuzzle(puzzle, row, column, value);

    // check to detect if there are issues with row, column, grid and puzzle
    let response = checkToDetectIssues(checks);
    // console.log('response before', response);

    //update string with value at coordinate if not found in row/column/region
    console.log("puzzle before", puzzle);
    let regeneratedPuzzle = updatePuzzleString(puzzle, row, column, value);
    console.log("puzzle after", regeneratedPuzzle);

    // check if puzzle is solved again
    let isPuzzleSolved = checkPuzzle(regeneratedPuzzle);
    // console.log('isPuzzleSolved', isPuzzleSolved)

    //  check if puzzle is solved and if response.conflict doesnt include puzzle , update response
    // if (
    //   isPuzzleSolved.validate === false &&
    //   !response.conflict.includes("puzzle")
    // )
    if (isPuzzleSolved.validate === false) {
      response.conflict.push("puzzle");
    }
    // response.validate=puzzle.validate;
    // console.log('response after', response);

    console.log("response in api.js", response);
    res.json(response);
  });

  app.route("/api/solve").post((req, res) => {
    // console.log('/api/solve', req.body)
    // obtain puzzle from request
    const { puzzle } = req.body;
    // console.log('puzzle', puzzle)

    // create an array to hold puzzle coordinates
    let puzzleCordinates = [
      "A1",
      "A2",
      "A3",
      "A4",
      "A5",
      "A6",
      "A7",
      "A8",
      "A9",
      "B1",
      "B2",
      "B3",
      "B4",
      "B5",
      "B6",
      "B7",
      "B8",
      "B9",
      "C1",
      "C2",
      "C3",
      "C4",
      "C5",
      "C6",
      "C7",
      "C8",
      "C9",
      "D1",
      "D2",
      "D3",
      "D4",
      "D5",
      "D6",
      "D7",
      "D8",
      "D9",
      "E1",
      "E2",
      "E3",
      "E4",
      "E5",
      "E6",
      "E7",
      "E8",
      "E9",
      "F1",
      "F2",
      "F3",
      "F4",
      "F5",
      "F6",
      "F7",
      "F8",
      "F9",
      "G1",
      "G2",
      "G3",
      "G4",
      "G5",
      "G6",
      "G7",
      "G8",
      "G9",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6",
      "H7",
      "H8",
      "H9",
      "I1",
      "I2",
      "I3",
      "I4",
      "I5",
      "I6",
      "I7",
      "I8",
      "I9"
    ];

    // create an object to hold puzzle coordinates and their keys
    let puzzleCordinatesWithKeys = [];
    for (let i = 0; i < puzzleCordinates.length; i++) {
      // iterate puzzle cordinates, assign key value and add to puzzleCordinatesWithKeys
      puzzleCordinatesWithKeys.push({ [i]: puzzleCordinates[i] });
    }

    // console.log('puzzle before', puzzle)
    let solvedPuzzle = solvePuzzle(puzzle, puzzleCordinatesWithKeys);
    console.log("puzzle after in apiSolve.js", solvedPuzzle);
    // console.log('puzzle after', solvedPuzzle.match(/.{1,9}/g));

    res.json(solvedPuzzle);
  });
};
