// const generateValueIndexInPuzzle = require('./generateValueIndexInPuzzle.js');
const generateRows = require('../controllers/generateRows.js');
const generateGrids = require('../controllers/generateGrids.js');
const generateColumns = require('../controllers/generateColumns.js');
const checkIfvalueIsPresentMoreThanOnce = require('./checkIfvalueIsPresentMoreThanOnce.js');

const checkpuzzleForMultipleValues =(puzzle)=>{
    /** select best possible puzzel 
     * whose next value would not be invalid or will contain similar digits in row/column/region*/
    //  console.log('test puzzle', puzzle);
      
    let valueIsPresentMoreThanOnce = [];

    // check rows 
    let rows = generateRows(puzzle);
    // console.log(rows);
    let isAnyValuePresentMoreThanOnceInRows = checkIfvalueIsPresentMoreThanOnce(rows);
    // console.log('isAnyValuePresentMoreThanOnceInRows', isAnyValuePresentMoreThanOnceInRows)

    // check rows 
    let columns = generateColumns(rows);
    // console.log('columns', columns);
    let isAnyValuePresentMoreThanOnceInColumns = checkIfvalueIsPresentMoreThanOnce(columns);
    // console.log('isAnyValuePresentMoreThanOnceInColumns', isAnyValuePresentMoreThanOnceInColumns)

    // check rows 
    let grids = generateGrids(rows);
    // console.log('columns', columns);
    let isAnyValuePresentMoreThanOnceInGrids = checkIfvalueIsPresentMoreThanOnce(grids);
    // console.log('isAnyValuePresentMoreThanOnceInGrids', isAnyValuePresentMoreThanOnceInGrids)

    if(isAnyValuePresentMoreThanOnceInRows
         || isAnyValuePresentMoreThanOnceInColumns
          || isAnyValuePresentMoreThanOnceInGrids){
        valueIsPresentMoreThanOnce.push(true);
    };

    if(valueIsPresentMoreThanOnce.length > 0){
        return true
    }else{
        return false;
    };
      
};

module.exports = checkpuzzleForMultipleValues;




