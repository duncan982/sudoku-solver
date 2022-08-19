const rowsIndex = require('./rowsIndex.js');
const columnsIndex = require('./columnsIndex.js')
const generateValueIndexInPuzzle = (row, column) =>{
    /**generate index of value in puzzle */

    // set index of value in puzzle as the sum of row and column indexes
    let valueIndex = (rowsIndex[row]+columnsIndex[column])-1 // less 1 because js is 0 based when counting
    return valueIndex
}

module.exports = generateValueIndexInPuzzle