const generateValueIndexInPuzzle = require('./generateValueIndexInPuzzle.js')
const replaceIdentifiedCordinateInRow = (
  emptyCordinates,
  selectedRow,
  value,row, column
) => {
  /** update identifiedCordinate in selected row with value*/

  // generate index of value in puzzle row, column,
  let valueIndex = generateValueIndexInPuzzle(row, column)
  // console.log('valueIndex', valueIndex)

  // select the first empty cordinate
  let identifiedCordinate = emptyCordinates[0];
  // console.log("identifiedCordinate before", identifiedCordinate);

  let identifiedselectedRowKey; // create key to identify cordinate
  if (identifiedCordinate) {
    // check for identified empty cordinates
    for (const [keys, values] of Object.entries(identifiedCordinate)) {
      //confirm if key of empty cordinate is the target valueIndex 
      if(keys === `${valueIndex}`){
        // replace value of empty cordinate with provided value
        identifiedselectedRowKey = keys;
      }
    }
  }
  // console.log('identifiedselectedRowKey', identifiedselectedRowKey)

  let newSelectedRow = []

  // replace identifiedCordinate in selected row
  for (let i = 0; i < selectedRow.length; i++) {
    // console.log(selectedRow[i])
    for (const [keys, values] of Object.entries(selectedRow[i])) {
      let newCordinate = {}; // create empty object to hold cordinates

      if (keys === identifiedselectedRowKey) {
        // check if key matches identifiedselectedRowKey

        // replace value of empty cordinate with provided value
        newCordinate[keys] = `${value}`; // add keys and replace values with provided value
        newSelectedRow.push(newCordinate)
        // selectedRow[i] = newCordinate;
      }
      else{
        // dont replace value of empty cordinate with provided value
        newCordinate[keys] = values // add keys and replace values with provided value
        newSelectedRow.push(newCordinate)
      }
    }
  }
  // console.log("selectedRow after", selectedRow)
  return newSelectedRow;
};

module.exports = replaceIdentifiedCordinateInRow;
