const checkPuzzle = require("./checkPuzzle.js");
const checkToDetectIssues = require("./checkToDetectIssues.js");
const generateValueIndexInPuzzle = require('./generateValueIndexInPuzzle.js')
const Solver = require("../controllers/sudoku-solver.js");
const solver = new Solver();

const updatePuzzleString = (puzzle, row, column, value) => {
  let solvedPuzzle;
  let valueAddedToPuzzle;

  // check if value is in row
  let isValueAlreadyInRow = solver.checkRowPlacement(puzzle, row, column, value);
  // console.log("isValueAlreadyInRow", isValueAlreadyInRow);
  
  // check if value is in column
  let isValueAlreadyInColumn = solver.checkColPlacement(puzzle, row, column, value);
  // console.log('isValueAlreadyInColumn', isValueAlreadyInColumn);
  
  // check if value is in grid
  let isValueAlreadyInGrids = solver.checkRegionPlacement(puzzle, row, column, value);
  // console.log('isValueAlreadyInGrids', isValueAlreadyInGrids);

  //check if value is in row/column/grid
  if(isValueAlreadyInRow === false && isValueAlreadyInColumn === false && isValueAlreadyInGrids === false){
    // console.log('value',value,
    //  'isValueAlreadyInRow', isValueAlreadyInRow,
    //  'isValueAlreadyInColumn', isValueAlreadyInColumn,
    //  'isValueAlreadyInGrids', isValueAlreadyInGrids);
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
    // console.log('value',value,
    // 'isValueAlreadyInRow', isValueAlreadyInRow,
    // 'isValueAlreadyInColumn', isValueAlreadyInColumn,
    // 'isValueAlreadyInGrids', isValueAlreadyInGrids);
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
