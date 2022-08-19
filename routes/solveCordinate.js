const possiblePuzzelItems = require("./possiblePuzzelItems.js");
const solveCordinateWithPossibleValue = require('../routes/solveCordinateWithPossibleValue V2.js');
// const solveCordinateWithPossibleValue = require('../routes/solveCordinateWithPossibleValue.js');

const solveCordinate = (puzzle, obtainedCoordinate) => {

  let row;
  let column;

  for (const [key, value] of Object.entries(obtainedCoordinate)) {
    row = value[0];
    column = value[1];
  };

  // console.log("row in request is", row, "and column in request is", column);

  let updatedPuzzleString = solveCordinateWithPossibleValue(puzzle, row, column, possiblePuzzelItems);
  // console.log('updatedPuzzle', updatedPuzzleString);
  // console.log('updatedPuzzleString in solveCordinate()', updatedPuzzleString)
  // console.log('updatedPuzzleString in solveCordinate()', updatedPuzzleString.match(/.{1,9}/g));
  return updatedPuzzleString;
};

module.exports = solveCordinate;
