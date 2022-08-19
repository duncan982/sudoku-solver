// "use strict";

const checkPuzzle = require("./checkPuzzle.js");
const checkToDetectIssues = require("./checkToDetectIssues.js");
// const solvePuzzle = require("./solvePuzzle.js");
const updatePuzzleString = require("./updatePuzzleString.js");
const puzzleCordinates = require("./puzzleCordinates.js");
// const GeneratePuzzleCordinatesWithKeys = require("./GeneratePuzzleCordinatesWithKeys.js");
// const checkIfvalueIsPresentMoreThanOnce = require("./checkIfvalueIsPresentMoreThanOnce.js");
const markOriginalPuzzle = require("./markOriginalPuzzle.js");
const generateCordinatesOfEmptyValues = require("./generateCordinatesOfEmptyValues");
const checkpuzzleForMultipleValues = require("./checkpuzzleForMultipleValues.js");
const Solver = require("../controllers/sudoku-solver.js");
const solver = new Solver();
module.exports = function (app) {
  app.route("/api/check").post((req, res) => {
    // console.log("/api/check");
    // console.log("req.body", req.body);

    const { puzzle, coordinate, value } = req.body;

    if (!puzzle || !coordinate || !value) {
      // check if the object submitted to /api/check is missing puzzle, coordinate or value
      // console.log("Required field missing");
      res.json({ error: "Required field(s) missing" });
    } else {
      // the object submitted to /api/check is not missing puzzle, coordinate or value
      if (/[^\d.]/g.test(puzzle)) {
        // check if the puzzle submitted to /api/check contains values which are not numbers or periods
        // console.log("Invalid characters in puzzle", puzzle);
        res.json({ error: "Invalid characters in puzzle" });
      } else {
        // the puzzle submitted to /api/check contains values which are numbers or periods

        if (puzzle.split("").length < 81 || puzzle.split("").length > 81) {
          // check If the puzzle submitted to /api/check is greater or less than 81 characters
          // console.log("error: Expected puzzle to be 81 characters long");
          res.json({ error: "Expected puzzle to be 81 characters long" });
        } else {
          // the puzzle submitted to /api/check is not greater or less than 81 characters

          if (!puzzleCordinates.includes(coordinate)) {
            // Check if the coordinate submitted to api/check does not point to an existing grid cell
            // console.log("error: Invalid coordinate");
            res.json({ error: "Invalid coordinate" });
          } else {
            // the coordinate submitted to api/check does points to an existing grid cell

            if (/[^1-9]/g.test(value)) {
              // check if the value submitted to /api/check is not a number between 1 and 9
              // console.log("error: Invalid value");
              res.json({ error: "Invalid value" });
            } else {
              // the value submitted to /api/check is a number between 1 and 9
              // split coordinate to obtain row and column

              if (checkpuzzleForMultipleValues(puzzle)) {
                // if (checkIfvalueIsPresentMoreThanOnce(puzzle)) {
                // check if one of the possible values is present more than once in any one of the puzzle rows
                // console.log("Puzzle cannot be solved");
                res.json({ error: "Puzzle cannot be solved" });
              } else {
                // none of the possible values is present more than once in any one of the puzzle rows
                let row = coordinate.split("")[0];
                let column = coordinate.split("")[1];
                //    console.log('row in request is', row, 'and column in request is', column)

                //check if puzzle is solved and if value is in row/column or grid
                let checks = checkPuzzle(puzzle, row, column, value);
                // console.log("checks", checks);
                // check to detect if there are issues with row, column, grid and puzzle
                let response = checkToDetectIssues(checks);
                // console.log("response before", response);

                if (response.valid) {
                  // value is valid but it is not already added to puzzle at the specific cordinate //  value is not found in row/column/region

                  //update string with value at coordinate
                  let regeneratedPuzzle = updatePuzzleString(
                    puzzle,
                    row,
                    column,
                    value
                  );
                  // console.log("puzzle after", regeneratedPuzzle);

                  if (regeneratedPuzzle.valueAddedToPuzzle) {
                    // check if value was added to puzzle
                    res.send({ valid: true });
                  }
                } else if (
                  !response.valid &&
                  response.isValueIsValidButAlreadyAddedToPuzzle
                ) {
                  // value is valid but it is already added to puzzle at the specific cordinate
                  res.send({ valid: true });
                } else {
                  // value is not valid  //  value is found in row/column/region
                  // console.log("response before deleting", response);
                  delete response["isValueIsValidButAlreadyAddedToPuzzle"];
                  // console.log("response after deleting", response);
                  res.send(response);
                }
              }
            }
          }
        }
      }
    }
  });

  app.route("/api/solve").post((req, res) => {
    // console.log("/api/solve");
    // console.log("req.body", req.body);

    // const data = formData.get(puzzle);
    // console.log("data", data);

    const { puzzle } = req.body;
    // console.log("puzzle", puzzle);

    if (!puzzle) {
      // check if the object submitted to /api/solve is missing puzzle
      // console.log("Required field missing");
      res.json({ error: "Required field missing" });
    } else {
      //object submitted to /api/solve is not missing puzzle

      if (/[^\d.]/g.test(puzzle)) {
        // check if the puzzle submitted to /api/solve contains values which are not numbers or periods
        // console.log("Invalid characters in puzzle", puzzle);
        res.json({ error: "Invalid characters in puzzle" });
      } else {
        // the puzzle submitted to /api/solve contains values which are numbers or periods

        if (puzzle.split("").length < 81 || puzzle.split("").length > 81) {
          // check If the puzzle submitted to /api/solve is greater or less than 81 characters
          // console.log("error: Expected puzzle to be 81 characters long");
          res.json({ error: "Expected puzzle to be 81 characters long" });
        } else {
          // the puzzle submitted to /api/solve is not greater or less than 81 characters
          // create an array to hold puzzle coordinates

          if (checkpuzzleForMultipleValues(puzzle)) {
            // check if one of the possible values is present more than once in any one of the puzzle rows
            // console.log("error: Puzzle cannot be solved");
            res.json({ error: "Puzzle cannot be solved" });
          } else {
            // none of the possible values is present more than once in any one of the puzzle rows
            // create an object of puzzle coordinates and their keys
            // console.log("query puzzle", puzzle);
            let solvedPuzzle = solver.solve(puzzle);
            // console.log("solvedPuzzle", solvedPuzzle);

            if (solvedPuzzle) {
              // console.log("solution:", solvedPuzzle);
              res.send({ solution: `${solvedPuzzle}` });
              // res.json({
              // solution: solvedPuzzle
              // });
            } else {
              // check if the puzzle submitted to /api/solve is invalid or cannot be solved
              // console.log("error: Puzzle cannot be solved");
              res.json({ error: "Puzzle cannot be solved" });
            }
          }
        }
      }
    }
  });
};
