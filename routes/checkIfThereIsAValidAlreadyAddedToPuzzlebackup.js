const rowsIndex = require("./rowsIndex.js");
const columnsIndex = require("./columnsIndex.js");

const checkIfThereIsAValidAlreadyAddedToPuzzle= (
  selectedRow,
  column,
) => {

  let thereIsAValueAlreadyAddedToPuzzle;
  // check if value is in specified cordinate in selected row

  for (const [rowkey, rowValue] of Object.entries(selectedRow[column - 1])) {
    // iterate selected cordinate in selectedRow
    if ((/[1-9]/g).test(rowValue)) {
      // check if there is a value [1-9] at the selected cordinate
      thereIsAValueAlreadyAddedToPuzzle = true;
    } else {rowValue
      // there is no value [1-9] at the selected cordinate
      thereIsAValueAlreadyAddedToPuzzle = false;
    }
  }
  return thereIsAValueAlreadyAddedToPuzzle;
};

module.exports = checkIfThereIsAValidAlreadyAddedToPuzzle;
