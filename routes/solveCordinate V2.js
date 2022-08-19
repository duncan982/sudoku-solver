const possiblePuzzelItems = require("./possiblePuzzelItems.js");
const solveCordinateWithPossibleValue = require('../routes/solveCordinateWithPossibleValue V3.js');

const solveCordinate = (puzzle, markedOriginalPuzzle, emptyValuesCordinates) => {
    
    // console.log('isPuzzleSolved in solvePuzzle.js', isPuzzleSolved)
    if (emptyValuesCordinates.length > 0) {
      // console.log('puzzle', puzzle);
      // console.log('markedOriginalPuzzle', markedOriginalPuzzle[0]);
      // console.log('emptyValuesCordinates', emptyValuesCordinates);
      let retainedEmptyvaluesIndexAndCordinates = [...emptyValuesCordinates];
      let retainedMarkedOriginalPuzzle = [...markedOriginalPuzzle];
  
      // console.log('emptyValuesCordinates', emptyValuesCordinates)
      let obtainedCoordinate = retainedEmptyvaluesIndexAndCordinates.splice(0, 1)[0]; 
      // let obtainedCoordinate = retainedEmptyvaluesIndexAndCordinates.splice(0, 1)[0]; 
      // console.log("obtainedCoordinate", obtainedCoordinate);

      // let row = obtainedCoordinate[0];
      // let row = obtainedCoordinate[0].split('')[0];
      let row = obtainedCoordinate.split('')[0];
      // let column = obtainedCoordinate[1];
      // let column = obtainedCoordinate[0].split('')[1];
      let column = obtainedCoordinate.split('')[1];
    
      // console.log("row in request is", row, "and column in request is", column);
      // console.log('puzzle in solveCordinate.js', puzzle)
    
      // console.log('problematicRowsColumnsAndGrids', typeof(problematicRowsColumnsAndGrids), problematicRowsColumnsAndGrids); 
    
      // let solvedPuzzle = solveCordinateWithPossibleValue(puzzle, row, column, possiblePuzzelItems);
      // updatedPuzzleString = solveCordinateWithPossibleValue(puzzle, row, column, possiblePuzzelItems, retainedMarkedOriginalPuzzle);
      // updatedPuzzleString = solveCordinateWithPossibleValue(puzzle, row, column, possiblePuzzelItems, retainedMarkedOriginalPuzzle, emptyValuesCordinates);
      let updatedPuzzleString = solveCordinateWithPossibleValue(puzzle, row, column, possiblePuzzelItems, retainedMarkedOriginalPuzzle, retainedEmptyvaluesIndexAndCordinates);
      // const [updatedPuzzleString, newMarkedOriginalPuzzle, newEmptyValuesCordinates] = solveCordinateWithPossibleValue(puzzle, row, column, possiblePuzzelItems, retainedMarkedOriginalPuzzle, retainedEmptyvaluesIndexAndCordinates);
      
      let solvedPuzzle = updatedPuzzleString.puzzle;
      // console.log('solvedPuzzle', solvedPuzzle);
      let newMarkedOriginalPuzzle = updatedPuzzleString.retainedMarkedOriginalPuzzle;
      let newEmptyValuesCordinates = updatedPuzzleString.retainedEmptyvaluesIndexAndCordinates 

      // console.log('newMarkedOriginalPuzzle', newMarkedOriginalPuzzle[0]);
      // console.log('newEmptyValuesCordinates', newEmptyValuesCordinates);
      // console.log('updatedPuzzleString in solveCordinate()', updatedPuzzleString.match(/.{1,9}/g));

      // if (newEmptyValuesCordinates.length > 0) {
      // if it is not solved and there are still cordiantes available work on it to solve it
      // console.log('newEmptyValuesCordinates', newEmptyValuesCordinates.length)
      // return solveCordinate(solvedPuzzle, retainedMarkedOriginalPuzzle, retainedEmptyvaluesIndexAndCordinates);
      return solveCordinate(solvedPuzzle, newMarkedOriginalPuzzle, newEmptyValuesCordinates);
    } else {
      // if it is solved return it and exit
      
        return [puzzle, markedOriginalPuzzle];
      }

};

module.exports = solveCordinate;
