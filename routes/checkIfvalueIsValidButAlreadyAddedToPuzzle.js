const rowsIndex = require("./rowsIndex.js");
const columnsIndex = require("./columnsIndex.js");

const checkIfvalueIsValidButAlreadyAddedToPuzzle = (
  selectedRow,
  row,
  column,
  value
) => {

  let valueIsValidButAlreadyAddedToPuzzle;
  // check if value is in specified cordinate in selected row

  for (const [rowkey, rowValue] of Object.entries(selectedRow[column - 1])) {
    // iterate selected cordinate in selectedRow
    if (rowValue === `${value}`) {
      // check if value at the selected cordiante is equal to provided value
      valueIsValidButAlreadyAddedToPuzzle = true;
    } else {
      // value at the selected cordiante is not equal to provided value
      valueIsValidButAlreadyAddedToPuzzle = false;
    }
  }
  return valueIsValidButAlreadyAddedToPuzzle;
};

module.exports = checkIfvalueIsValidButAlreadyAddedToPuzzle;
