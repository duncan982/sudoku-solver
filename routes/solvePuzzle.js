const checkPuzzle = require("./checkPuzzle.js");
const solveCordinate = require("./solveCordinate.js");

// import {regeneratePuzzle} from './regeneratePuzzle.js';

const solvePuzzle = (puzzle, puzzleCordinatesWithKeys) => {
  // export const solvePuzzle = (puzzleValuesWithKeys, puzzleCordinatesWithKeys) => {
  // console.log('**************************it starts here*****************************')
  // let missingItems=0

  let solvedPuzzle;
  // console.log('puzzle is', puzzle);

  if (puzzleCordinatesWithKeys.length > 0) {
    // check to see if there are still coordinates to work with
    // console.log('puzzleCordinatesWithKeys', puzzleCordinatesWithKeys)
    // console.log('puzzleCordinatesWithKeys length is', puzzleCordinatesWithKeys.length)
    let obtainedCoordinate = puzzleCordinatesWithKeys.splice(0, 1)[0];
    // console.log('obtainedCoordinate', obtainedCoordinate)

    // // create an array of puzzle string values
    let puzzleValues;
    let puzzleValuesWithKeys = [];
    // if(typeof(puzzle)==="string"){
    puzzleValues = puzzle.split("");
    // create an object to hold puzzle values and their keys
    puzzleValuesWithKeys = [];
    for (let i = 0; i < puzzleValues.length; i++) {
      // iterate puzzle Values, assign key value and add to puzzleValuesWithKeys
      puzzleValuesWithKeys.push({ [i]: puzzleValues[i] });
    }
    //     // console.log('puzzleValuesWithKeys in solvePuzzle.js:', puzzleValuesWithKeys)
    // }else{
    //     console.log('its here')
    //     puzzleValuesWithKeys = solvedPuzzle;
    //     console.log('puzzleValuesWithKeys in solvePuzzle.js:', puzzleValuesWithKeys)
    // };

    // solvedPuzzle = solveCordinate(puzzle, obtainedCoordinate);
    // solvedPuzzle = solveCordinate(puzzle, obtainedCoordinate);
    solvedPuzzle = solveCordinate(puzzleValuesWithKeys, obtainedCoordinate);
    // solvedPuzzle = solveCordinate(puzzleValuesWithKeys, obtainedCoordinate);
    // console.log('puzzle to be solved is', solvedPuzzle);

    // let regeneratedPuzzle = regeneratePuzzle(solvedPuzzle)
    // let puzzle = regeneratePuzzle(solvedPuzzle)
    // console.log('regeneratedPuzzle', puzzle)
    // console.log('solvedPuzzle in solvePuzzle.js:', solvedPuzzle.match(/.{1,9}/g))
    // console.log('solvedPuzzle in solvePuzzle.js:', solvedPuzzle)
    // console.log('regeneratedPuzzle in solvePuzzle.js:', regeneratedPuzzle.match(/.{1,9}/g))
    // console.log('regeneratedPuzzle in solvePuzzle.js:', puzzle.match(/.{1,9}/g))

    // check if puzzle is solved
    let isPuzzleSolved = checkPuzzle(solvedPuzzle);
    // console.log('isPuzzleSolved in solvePuzzle.js', isPuzzleSolved)
    // console.log('isPuzzleSolved in solvePuzzle.js', isPuzzleSolved.validate)
    if (isPuzzleSolved.validate === false) {
      // if it is not solved work on it to solve it
      // console.log('puzzle is not solved', solvedPuzzle);

      // console.log('**************************it re-starts here*****************************');
      return solvePuzzle(solvedPuzzle, puzzleCordinatesWithKeys);
    } else {
      // if it is solved return it and exit
      // console.log('puzzle is solved', solvedPuzzle)
      // return solvedPuzzle
      // console.log('**************************it ends here*****************************');
      return solvedPuzzle;
      // return puzzle
    }
  }
};

module.exports = solvePuzzle;
