const checkPuzzle = require("./checkPuzzle.js");
const checkToDetectIssues = require("./checkToDetectIssues.js");
const generateValueIndexInPuzzle = require('./generateValueIndexInPuzzle.js')

const updatePuzzleString = (puzzle, row, column, value) => {
  let solvedPuzzle;
  let valueAddedToPuzzle;

  //check if puzzle is solved and if value is in row/column or grid
  let checks = checkPuzzle(puzzle, row, column, value);
  // console.log("value", value, "checks", checks);

  // check to detect if there are issues with row, column, grid and puzzle
  let response = checkToDetectIssues(checks);
  // console.log("value", value, "response", response);

  if (response.valid) {
    // check if value can be added to puzzle

        // generate index of value in puzzle row, column,
        let valueIndex = generateValueIndexInPuzzle(row, column)
        //  console.log('valueIndex', valueIndex)

        let splittedPuzzle = puzzle.split('');
        // console.log('splittedPuzzle', splittedPuzzle);

        let newPuzzle =''
    
        for(let i=0; i<splittedPuzzle.length; i++){
          if(i===Number(valueIndex)){
            newPuzzle = newPuzzle + value;
          }else{
            newPuzzle = newPuzzle + splittedPuzzle[i];
          }
        };

        // console.log('newPuzzle', newPuzzle);

        valueAddedToPuzzle = true; //indicated value was added to puzzle;
        solvedPuzzle = newPuzzle;

  } else {
    // value is already in row/column/region
    valueAddedToPuzzle = false; //indicate value was not added to puzzle;
    solvedPuzzle = puzzle;
    // console.log("puzzle to return", solvedPuzzle);

  }

  return {
    valueAddedToPuzzle: valueAddedToPuzzle,
    regeneratedPuzzle: solvedPuzzle
  };

  // return solvedPuzzle;

};

module.exports = updatePuzzleString;
