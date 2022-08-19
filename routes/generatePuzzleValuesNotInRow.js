const generateRows = require('../controllers/generateRows.js');
const generateColumns = require('../controllers/generateColumns.js')
const generateGrids = require('../controllers/generateGrids.js')
const gridIndex = require('./gridIndex.js');
const generateValueIndexInPuzzle = require('./generateValueIndexInPuzzle.js');
const rowsID = require('./rowsID.js');
const gridIndexValues = require('./gridIndexValues.js');
const gridCordinates = require('../controllers/gridCordinates.js');

const generatePuzzleValuesNotInRow = (puzzle, rowsColumnsAndGridsWithEmptyValues) =>{
    /** add value(s) to item list of invalid values if value cannot be added to puzzle at item's index because its present 
     * at row/column/grid */ 

    // console.log(rowsColumnsAndGridsWithEmptyValues)

    let rows = generateRows(puzzle);
    // console.log('rows', rows);

    let columns = generateColumns(rows);
    // console.log('columns', columns);

    let grids = generateGrids(rows)
    // console.log('grids', grids)

    let valuesNotInRow = [];
    
    // iterate rowsColumnsAndGridsWithEmptyValues and 
    rowsColumnsAndGridsWithEmptyValues.forEach(element => {
        // console.log('element', element)

       // select rows/columns/grids in rowsColumnsAndGridsWithEmptyValues
       let row = rows[element.row];
    //    console.log('row', row)

       let column = columns[element.column];
    //    console.log('column', column)

       let grid = grids[gridIndex[element.grid]]
    //    console.log('grid', gridIndex[element.grid], 'values', grid)
    //    console.log('grid', grid)

       // compare row and column
        column.split('').forEach(columnValue => {

            //identify values in column that are not in row 
            if(columnValue !== '.' && !row.includes(columnValue)){
                // console.log('columnValue', columnValue);

                // identify which row the value belongs to
                let rowValueIsIn =  rowsID[column.indexOf(columnValue)]
                // console.log('rowValueIsIn', rowValueIsIn) 

                // identify index of value in puzzle
                let indexOfValueInPuzzle = generateValueIndexInPuzzle(rowValueIsIn, element.column)
                
                // collect values in column that is not in row and it index in puzzle
                valuesNotInRow.push({index: indexOfValueInPuzzle, value: columnValue});
    
            }
        });

        // compare row and grid 
        grid.split('').forEach(gridValue => {

            //identify values in column that are not in row 
            if(gridValue !== '.' && gridValue !== ',' && !row.includes(gridValue)){
                // console.log('element', element)
                // console.log('grid', gridIndex[element.grid], 'values', grid)
                // console.log('gridValue not in row is', gridValue);

                // identify which row and column value belongs to
                let gridIndexValue = gridIndexValues[gridIndex[element.grid]];
                // console.log('gridIndexValue', gridIndexValue);

                let gridCordinate = gridCordinates[gridIndexValue - 1] // less 1 because js is zero based
                // console.log('gridCordinate', gridCordinate);

                let indexOfCordinateInGridCordinates = grid.replace(/,/g, '').indexOf(gridValue);
                // console.log('indexOfCordinateInGridCordinates', indexOfCordinateInGridCordinates)

                let cordinate = gridCordinate.split(',')[indexOfCordinateInGridCordinates];
                // console.log('cordinate', cordinate);

                // identify index of value in puzzle
                let indexOfValueInPuzzle = generateValueIndexInPuzzle(cordinate[0], cordinate[1]);
                // console.log('indexOfValueInPuzzle', indexOfValueInPuzzle);

                // collect value in grid that is not in row and it index in puzzle
                valuesNotInRow.push({index: indexOfValueInPuzzle, value: gridValue});
            };
        });

    });

    // console.log('valuesNotInRow', valuesNotInRow);
    
    return valuesNotInRow

};

module.exports = generatePuzzleValuesNotInRow