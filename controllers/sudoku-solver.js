const { generateRows } = require("./generateRows");
const { generateColumns } = require("./generateColumns");
const { generateGrids } = require("./generateGrids");

class SudokuSolver {
  validate(puzzleString) {
    /**test if string contains only digits and its 81 units long */
    if (
      /^\d+$/g.test(puzzleString) &&
      !/\./g.test(puzzleString) &&
      puzzleString.split("").length === 81
    ) {
      console.log("puzzleString is valid");
      return true;
    } else {
      return false;
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let ranksInPuzzle = generateRows(puzzleString); // get rows and their values
    // console.log('ranksInPuzzle', ranksInPuzzle);

    // iterates ranks to cofirm if value is there
    let isRowValueFound;
    for (const [key, values] of Object.entries(ranksInPuzzle)) {
      if (key === row) {
        console.log("row key values", key, ":", values);
        // check if value is in row
        if (values.includes(value)) {
          //value is in row
          // isRowValueFound = (values.split('')[column-1]) === value//split values and check if value is at index (coulmn - 1);
          isRowValueFound = true;
        } else {
          // value is not in row
          isRowValueFound = false;
        }
      }
    }
    console.log("isRowValueFound", isRowValueFound);
    return isRowValueFound;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let ranksInPuzzle = generateRows(puzzleString); // get rows and their values
    let stacksInPuzzle = generateColumns(ranksInPuzzle); // get columns and their values
    // console.log('stacksInPuzzle', stacksInPuzzle)
    let isColValueFound;
    let rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    // iterates stacks to cofirm if value is there

    for (const [key, values] of Object.entries(stacksInPuzzle)) {
      // console.log('key', key, 'column', column, "key===column", key===column);
      // console.log('values', values)
      if (key === column) {
        console.log("column key values", key, ":", values);
        // console.log('key', key, 'column', column);
        // console.log('values', values);
        // console.log('row index', (rows.indexOf(row)))

        isColValueFound = values.split("")[rows.indexOf(row)] === value; //split values and check if value is at index (coulmn - 1)

        // check if value is in column
        // if(values.includes(value)){//value is in row
        //   // isColValueFound = (values.split('')[(rows.indexOf(row))]) === value//split values and check if value is at index (coulmn - 1)
        //   isColValueFound = true
        // }else{// value is not in column
        //   isColValueFound = false
        // }
      }
    }

    // console.log('isColValueFound', isColValueFound)
    return isColValueFound;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let ranksInPuzzle = generateRows(puzzleString); // get rows and their values
    // console.log('ranksInPuzzle', ranksInPuzzle)

    // let stacksInPuzzle = generateColumns(ranksInPuzzle); // get columns and their values
    // console.log('stacksInPuzzle', stacksInPuzzle)

    let gridsInPuzzle = generateGrids(ranksInPuzzle);
    // console.log('gridsInPuzzle', gridsInPuzzle)

    /****check if value is in respective grid****/
    // recreate coordinate
    let coordinate = row + column;
    // console.log('coordinate', coordinate)

    // recreate grid quarter keys
    let gridKeys = [
      "A1B1C1",
      "A2B2C2",
      "A3B3C3",
      "D1E1F1",
      "D2E2F2",
      "D3E3F3",
      "G1H1I1",
      "G2H2I2",
      "G3H3I3"
    ];

    // recreate grid quarter cordinates

    let gridCordinates = [
      "A1,A2,A3,B1,B2,B3,C1,C2,C3",
      "A4,A5,A6,B4,B5,B6,C4,C5,C6",
      "A7,A8,A9,B7,B8,B9,C7,C8,C9",
      "D1,D2,D3,E1,E2,E3,F1,F2,F3",
      "D4,D5,D6,E4,E5,E6,F4,F5,F6",
      "D7,D8,D9,E7,E8,E9,F7,F8,F9",
      "G1,G2,G3,H1,H2,H3,I1,I2,I3",
      "G4,G5,G6,H4,H5,H6,I4,I5,I6",
      "G7,G8,G9,H7,H8,H9,I7,I8,I9"
    ];

    // determine which grid quarter the coordinate belongs to
    let detectedGridQuarter;

    for (let i = 0; i < gridCordinates.length; i++) {
      if (gridCordinates[i].split(",").includes(coordinate)) {
        let detectedGridIndex = gridCordinates.indexOf(gridCordinates[i]);
        detectedGridQuarter = gridKeys[detectedGridIndex];
        console.log(
          "grid keys and values",
          detectedGridQuarter,
          gridsInPuzzle[detectedGridQuarter]
        );
      }
    }

    // console.log('detectedGridQuarter', detectedGridQuarter)

    // check if value is in the respective grid values
    let isQueryValueInGridValues = gridsInPuzzle[detectedGridQuarter].includes(
      value
    );
    console.log("isQueryValueInGridValues", isQueryValueInGridValues);

    return isQueryValueInGridValues;
  }

  solve(puzzleString) {}
}

module.exports = SudokuSolver;
