const checkPuzzle = require("./checkPuzzle.js");
const regeneratePuzzle = require("./regeneratePuzzle.js");
const checkToDetectIssues = require("./checkToDetectIssues.js");
const splitPuzzleValuesWithKeys = require("./splitPuzzleValuesWithKeys.js");
const generatePuzzleValuesWithKeys = require("./generatePuzzleValuesWithKeys.js");
// const generateNewPuzzleValuesWithKeys = require("./generateNewPuzzleValuesWithKeys.js");
const replaceIdentifiedCordinateInRow = require("./replaceIdentifiedCordinateInRow.js");
const generateSelectedRowValues = require("./generateSelectedRowValues.js");
const generateEmptyCordinates = require("./generateEmptyCordinates.js");
const checkIfThereIsAValidAlreadyAddedToPuzzle = require('./checkIfThereIsAValidAlreadyAddedToPuzzle.js')
const updatePuzzleString = (puzzle, row, column, value) => {
  let solvedPuzzle;
  let regeneratedPuzzle;
  let valueAddedToPuzzle;

  // create an array of puzzle string values
  let puzzleValuesWithKeys = generatePuzzleValuesWithKeys(puzzle);
  // console.log("puzzleValuesWithKeys in solvePuzzle.js:", puzzleValuesWithKeys);

  //check if puzzle is solved and if value is in row/column or grid
  let checks = checkPuzzle(puzzle, row, column, value);
  // console.log("checks", checks);

  // check to detect if there are issues with row, column, grid and puzzle
  let response = checkToDetectIssues(checks);
  // console.log("response", response);

  if (response.valid) {
    // check if value can be added to puzzle

    // iterate puzzleValuesWithKeys and separate items into respective rows
    let splitedPuzzleValuesWithKeys = splitPuzzleValuesWithKeys(
      puzzleValuesWithKeys
    );
    // console.log(
    //   "splitedPuzzleValuesWithKeys before",
    //   splitedPuzzleValuesWithKeys[row]
    // );

    // select respective row based on provided cordinate
    let selectedRow = splitedPuzzleValuesWithKeys[row];
    // console.log("selectedRow before", selectedRow);

    // check if there is a value in specified cordinate in selected row
    let isThereAValueAlreadyAddedToPuzzle = checkIfThereIsAValidAlreadyAddedToPuzzle(selectedRow, column)
    
    if(!isThereAValueAlreadyAddedToPuzzle){
        //if there is no value in specified cordinate in selected row

        // generate empty cordinates from selected row
        let emptyCordinates = generateEmptyCordinates(selectedRow, row, column);
        // console.log("emptyCordinates", emptyCordinates);
    
        //generate selected row values
        // let selectedRowValues = generateSelectedRowValues(selectedRow);
        // console.log("selectedRowValues", selectedRowValues);
    
        // if (!selectedRowValues.includes(`${value}`)) {
        // check if value is not in selected row
    
        // console.log(
        //   "selectedRowValues",
        //   selectedRowValues,
        //   "does not include value",
        //   value
        // );
    
        // replace identifiedCordinate in selected row
        let newSelectedRow = replaceIdentifiedCordinateInRow(
          emptyCordinates,
          selectedRow,
          value,row, column
        );
        // console.log("newSelectedRow", newSelectedRow);
    
        // replace previous row with the new updated row
        let newSplitedPuzzleValuesWithKeys = {};
        for (const [key, value] of Object.entries(splitedPuzzleValuesWithKeys)) {
          // console.log(value)
          if (key === row) {
            newSplitedPuzzleValuesWithKeys[key] = newSelectedRow;
          } else {
            newSplitedPuzzleValuesWithKeys[key] = value;
          }
        }
        // console.log(
        //   "splitedPuzzleValuesWithKeys after",
        //   newSplitedPuzzleValuesWithKeys[row]
        // );
        // console.log("row", row, "column", column, "value", value);
    
        // rejoin the various rows into puzzleValuesWithKeys
        let newPuzzleValuesWithKeys = [];
        for (const [keys, values] of Object.entries(
          newSplitedPuzzleValuesWithKeys
        )) {
          // console.log(values)
          values.forEach((item) => {
            newPuzzleValuesWithKeys.push(item);
          });
        }
        // console.log("newPuzzleValuesWithKeys", newPuzzleValuesWithKeys);
    
        valueAddedToPuzzle = true; //indicated value was added to puzzle
        solvedPuzzle = newPuzzleValuesWithKeys;
        // solvedPuzzle = generateNewPuzzleValuesWithKeys(splitPuzzleValuesWithKeys);
        // console.log("puzzle to return", solvedPuzzle);
        // }else {
        //   // value is in selected row// , dont do anything
        //   valueAddedToPuzzle = false; //indicate value was not added to puzzle
        //   solvedPuzzle = puzzleValuesWithKeys;
        //   // console.log("puzzle to return", solvedPuzzle);
        // }

    }else{
         // there is a value in specified cordinate in selected row
         valueAddedToPuzzle = false; //indicate value was not added to puzzle
         solvedPuzzle = puzzleValuesWithKeys;
         // console.log("puzzle to return", solvedPuzzle);
    }

  } 
  else {
    // value is already in row/column/region
    valueAddedToPuzzle = false; //indicate value was not added to puzzle
    solvedPuzzle = puzzleValuesWithKeys;
    // console.log("puzzle to return", solvedPuzzle);


  }

  regeneratedPuzzle = regeneratePuzzle(solvedPuzzle);
  // console.log(regeneratedPuzzle);
  // console.log("regeneratedPuzzle to return", regeneratedPuzzle);

  return {
    valueAddedToPuzzle: valueAddedToPuzzle,
    regeneratedPuzzle: regeneratedPuzzle
  };

  // return regeneratedPuzzle
};

module.exports = updatePuzzleString;
