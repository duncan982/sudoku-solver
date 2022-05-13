const checkPuzzle = require("./checkPuzzle.js");
const checkToDetectIssues = require("./checkToDetectIssues.js");
const regeneratePuzzle = require("./regeneratePuzzle.js");
const splitPuzzleValuesWithKeys = require("./splitPuzzleValuesWithKeys.js");

const solveCordinate = (puzzleValuesWithKeys, obtainedCoordinate) => {
  let solvedPuzzle;
  // let puzzle
  let regeneratedPuzzle;

  let row;
  let column;

  for (const [key, value] of Object.entries(obtainedCoordinate)) {
    row = value[0];
    column = value[1];
  }
  // console.log("row in request is", row, "and column in request is", column);

  // create a list of valid items
  let possiblePuzzelItems = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // regenerate puzzle
  // console.log('puzzleValuesWithKeys in solveCordinate.js', puzzleValuesWithKeys)
  regeneratedPuzzle = regeneratePuzzle(puzzleValuesWithKeys);
  // puzzle = regeneratePuzzle(puzzleValuesWithKeys);
  // console.log('regeneratedPuzzle in solvecoordinate.js:', regeneratedPuzzle);

  // check among the possiblePuzzelItems which ones fits the coordinate
  for (let i = 0; i < possiblePuzzelItems.length; i++) {
    let value = possiblePuzzelItems[i];

    //check if puzzle is solved and if value is in row/column or grid
    let checks = checkPuzzle(regeneratedPuzzle, row, column, value);
    //  console.log('checks', checks)

    if (
      checks.checkRowPlacement === false &&
      checks.checkColPlacement === false &&
      checks.checkRegionPlacement === false
    ) {
      // check if puzzle is not solved and value is not in row/column/grid

      // check to detect if there are issues with row, column, grid and puzzle
      let response = checkToDetectIssues(checks);
      //  console.log('response', response);

      if (response.valid === true) {
        // if there are no issues, let selectedpossiblePuzzelItems to be the possiblePuzzelItems at index [i]
        // console.log("there are no issues with value", value);

        // let rowsIndex = {A:1, B:2, C:3, D:4, E:5, F:6, G:7, H:8, I:9};
        let columnsIndex = {
          1: 1,
          2: 2,
          3: 3,
          4: 4,
          5: 5,
          6: 6,
          7: 7,
          8: 8,
          9: 9
        };
        // console.log('rowsIndex.row', rowsIndex[row], 'columnsIndex.column', columnsIndex[column])
        // let valueIndex=(rowsIndex[row]*columnsIndex[column]) -1 //set index of value in string is a product of row and column index minus one
        let valueIndex = columnsIndex[column] - 1; //set index of value in string is a product of row and column index minus one
        // console.log('valueIndex', valueIndex);

        // iterate puzzleValuesWithKeys and separate items into respective rows
        let splitedPuzzleValuesWithKeys = splitPuzzleValuesWithKeys(
          puzzleValuesWithKeys
        );
        // console.log('splitedPuzzleValuesWithKeys before', splitedPuzzleValuesWithKeys)

        // select respective row based on provided cordinate
        let selectedRow = splitedPuzzleValuesWithKeys[row];
        // console.log("selectedRow", selectedRow);

        // iterate selecteRow to obtain values
        let selectedRowValues = [];
        selectedRow.forEach((cordinate) => {
          for (const [keys, values] of Object.entries(cordinate)) {
            selectedRowValues.push(values);
          }
        });
        // console.log(selectedRowValues)

        let emptyCordinates = []; // create a list to hold empty corrdiantes
        // let identifiedCordinate =[] // create a list to hold empty corrdiantes

        // check if value is in selected row
        if (selectedRowValues.includes(`${value}`)) {
          // console.log("selectedRowValues includes value");
          selectedRow = selectedRow;
        } else {
          // console.log("selectedRowValues does not include value");
          // check if value is in selected row // check if the row values are composed of 9 valid digits.

          selectedRow.forEach((cordinate) => {
            for (const [keys, values] of Object.entries(cordinate)) {
              // iterate cordinae key value pair
              if (values === ".") {
                // check if value at the specified cordinate is empty
                // console.log("emptyCordinate is", values);
                emptyCordinates.push(cordinate);
                // console.log('emptyCordinate is', emptyCordinate)

                // if it is empty, place valid value to coordinate of row and column onto the string
                // cordinate[keys] = `${value}`
              }
              // else{ // if they do skip
              //     cordinate=cordinate
              // }
            }
          });
        }

        // console.log("emptyCordinates", emptyCordinates);

        let identifiedCordinate = emptyCordinates[0]; // select the first empty cordinate
        // console.log("identifiedCordinate before", identifiedCordinate);

        // check for identified empty cordinates
        if (identifiedCordinate) {
          for (const [keys, values] of Object.entries(identifiedCordinate)) {
            // replace value of empty cordinate with provided value
            identifiedCordinate[keys] = `${value}`;

            // replace cordinate in selected row
            // selectedRow.keys = identifiedCordinate
          }
        }

        // console.log("identifiedCordinate after", identifiedCordinate);

        // console.log(selectedRow);

        // replace its previous row with the new updated row
        splitedPuzzleValuesWithKeys[row] = selectedRow;
        // splitedPuzzleValuesWithKeys[row]=solvedRow
        // console.log('splitedPuzzleValuesWithKeys after', splitedPuzzleValuesWithKeys)

        // rejoin the various rows into puzzleValuesWithKeys
        let newPuzzleValuesWithKeys = [];
        for (const [keys, values] of Object.entries(
          splitedPuzzleValuesWithKeys
        )) {
          // console.log(values)
          values.forEach((Object) => {
            newPuzzleValuesWithKeys.push(Object);
          });
        }

        // console.log('newPuzzleValuesWithKeys', newPuzzleValuesWithKeys)
        solvedPuzzle = newPuzzleValuesWithKeys;

        // if(selectedRow.length === 9){ (/^d+$/g).test(selectedRow) && !(/./g).test(selectedRow) &&
        //     solvedPuzzle=puzzleValuesWithKeys;
        // }
        let cordinate = selectedRow[valueIndex]; // select object with the respective cordinate
        // console.log("cordinate", cordinate);

        //  }
      } else {
        // if there are issues, dont do anything
        solvedPuzzle = puzzleValuesWithKeys;
        // return solvedPuzzle
      }
    } else {
      // if puzzle is not solved and value is in row/column/grid, dont do anything
      // console.log('there are issues with value', value);
      solvedPuzzle = puzzleValuesWithKeys;
      // return solvedPuzzle
    }
    // console.log('there are issues with value', value);
  }
  // console.log('solvedPuzzle in solvecoordinate.js:', solvedPuzzle)
  regeneratedPuzzle = regeneratePuzzle(solvedPuzzle);
  // console.log(
  //   "regeneratedPuzzle to return in solvecoordinate.js:",
  //   regeneratedPuzzle
  // );

  return regeneratedPuzzle;
};

module.exports = solveCordinate;
