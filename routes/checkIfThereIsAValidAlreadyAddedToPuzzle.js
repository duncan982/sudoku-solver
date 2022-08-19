const generateValueIndexInPuzzle = require('./generateValueIndexInPuzzle.js')

const checkIfThereIsAValidAlreadyAddedToPuzzle= (puzzle, row, column) => {
  /** check if value is in specified cordinate in selected row */

  let thereIsAValueAlreadyAddedToPuzzle;

  // generate index of value in puzzle row, column,
  let valueIndex = generateValueIndexInPuzzle(row, column)
  //  console.log('valueIndex', valueIndex)

  // obtain test value from puzzle
  let puzzleValue = puzzle.split('')[valueIndex]
    // iterate selected cordinate in selectedRow
    if ((/[1-9]/g).test(puzzleValue)) {
      // check if there is a value [1-9] at the selected cordinate
      thereIsAValueAlreadyAddedToPuzzle = true;
    } else {
      // there is no value [1-9] at the selected cordinate
      thereIsAValueAlreadyAddedToPuzzle = false;
    }
  
  return thereIsAValueAlreadyAddedToPuzzle;
};

module.exports = checkIfThereIsAValidAlreadyAddedToPuzzle;
