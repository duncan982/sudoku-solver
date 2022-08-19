const puzzleCordinates = require("./puzzleCordinates.js");
const GeneratePuzzleCordinatesWithKeys = require("./GeneratePuzzleCordinatesWithKeys.js");
const gridCordinates = require('../controllers/gridCordinates.js');
// const checkIfConflictIsRowColumnOrGrid = require('./checkIfConflictIsRowColumnOrGrid.js');
// const checkIfRowOrColumnOrGridIsAmongProblematicOnes = require('./checkIfRowOrColumnOrGridIsAmongProblematicOnes V2.js')
// const checkIfRowOrColumnOrGridIsAmongProblematicOnes = require('./checkIfRowOrColumnOrGridIsAmongProblematicOnes.js')
// const generatePuzzleValuesNotInRow = require('./generatePuzzleValuesNotInRow.js');

const reviseProblematicCordinates = (markedsolvedPuzzle, solvedPuzzle) => {

    // generate puzzle cordinates with keys
    let puzzleCordinatesWithKeys = GeneratePuzzleCordinatesWithKeys(puzzleCordinates);
    // console.log("puzzleCordinatesWithKeys", puzzleCordinatesWithKeys);

    // determine row/column/grid
    puzzleCordinatesWithKeys.forEach(item => {
        for(const[keys, values] of Object.entries(item)){
            item['index'] = Number(keys); // add index value
            item['cordinate']=values;
            item['row'] = values[0]; // add row
            item['column'] = values[1]; // add column

            // determine grid
            let grid
            for(let i=0; i < gridCordinates.length; i++){
                if(gridCordinates[i].indexOf(values) !== -1){
                    grid = gridCordinates.indexOf(gridCordinates[i])
                };
            };
            item['grid']=`${grid+1}` // add grid
        };
    });

    // console.log("puzzleCordinatesWithKeys", puzzleCordinatesWithKeys);

    // let rowsColumnsAndGridsWithConflicts = [] // collect rows/columns/grids with conflicts
    let rowsColumnsAndGridsWithEmptyValues = [] //  collect row/column/grid with atleast one empty values
    // let problematicRowColumnOrGrid = []; // collect row/column/grid with atleast one empty values
    let newPuzzle = '' // create new puzzle
    let emptyvaluesIndexAndCordinates = [] // collect empty values index and cordinates

    // iterate each item in markedsolvedPuzzle
    let newMarkedsolvedPuzzle = [...markedsolvedPuzzle]
    newMarkedsolvedPuzzle.forEach(item => {

        // add rows/columns/grids ids to each item based on index in puzzle and markedsolvedPuzzle
        let similarItem 
        puzzleCordinatesWithKeys.map(element => {element.index === item.index ? 
            similarItem = element :
             'it doesnt matter'});

        item['cordinate']=similarItem.cordinate;
        item['row'] = similarItem.row;
        item['column'] = similarItem.column;
        item['grid'] = similarItem.grid;
        // if(item.invalidValues && item.invalidValues.length > 0 ){console.log('item.index', item.index, 'item.invalidValues', item.invalidValues)}
    });

    // // check if the conflict lies on row/column/grid values, if it is collect the row and the indicated possible value
    // newMarkedsolvedPuzzle.forEach(item => {
    //     // item.conflicts ? console.log('item.conflicts', item.conflicts) : console.log('item.conflicts is not found');
    //     // item.value === '.' && item.conflicts ? console.log('item.conflicts', item.conflicts) : ''
    //     item.value === '.' && item.conflicts ?
    //      rowsColumnsAndGridsWithConflicts = [...rowsColumnsAndGridsWithConflicts, ...checkIfConflictIsRowColumnOrGrid(item)] :
    //     //  problematicRowsColumnsAndGrids.push(checkIfConflictIsRowColumnOrGrid(item)) :
    //              'it doesnt matter';
    //     item.conflicts = [] // reset item list of conflicts to empty
    // });

    // // remove duplicate entries
    // let revisedRowsColumnsAndGridsWithConflicts ;
    // rowsColumnsAndGridsWithConflicts.length > 0?
    // revisedRowsColumnsAndGridsWithConflicts =[...new Map(rowsColumnsAndGridsWithConflicts .map(conflict => [conflict.invalidValue,
    //      conflict])).values()] :
    //       revisedRowsColumnsAndGridsWithConflicts = rowsColumnsAndGridsWithConflicts 
    // //  console.log('problematicRowsColumnsAndGrids after', revisedProblematicRowsColumnsAndGrids.length);

    //  // check if item cordinate is among problematic ones. If item cordinate is among problematic ones set the value to be empty and add it to the list of invalid values
    //  newMarkedsolvedPuzzle.forEach(item => {

    //     // check if row/column/grid is among the problematic ones and that the value is valid but not original and correct as appropriate
    //     let newItem = checkIfRowOrColumnOrGridIsAmongProblematicOnes(item, revisedRowsColumnsAndGridsWithConflicts 
    //         );
    //     // let newItem = checkIfRowOrColumnOrGridIsAmongProblematicOnes(item, problematicRowsColumnsAndGrids);

    //     item = newItem;

    // });

    // collect row/column/region with empty values
    newMarkedsolvedPuzzle.forEach(item =>{

        // check if item value is empty and item status is not original then collect its cordinates
        // item.value === '.' && item.invalidValues && item.invalidValues.length > 0 ? problematicRowColumnOrGrid.push({row: item.row, column: item.column, grid: item.grid}) : 'it doesnt matter';
        item.value === '.'  && item.conflicts ?
         rowsColumnsAndGridsWithEmptyValues.push({row: item.row, column: item.column, grid: item.grid}) : 
        //  rowsColumnsAndGridsWithEmptyValues.push({row: item.row, column: item.column, grid: item.grid, conflicts: [...item.conflicts]}) : 
         'it doesnt matter';

    });

    // console.log('rowsColumnsAndGridsWithEmptyValues', rowsColumnsAndGridsWithEmptyValues[0].conflicts.length);
    // console.log('rowsColumnsAndGridsWithEmptyValues', rowsColumnsAndGridsWithEmptyValues[0]);
    // console.log('rowsColumnsAndGridsWithEmptyValues', rowsColumnsAndGridsWithEmptyValues);

    // // identify values that are in column and grid but not in row
    // let puzzleValuesNotInRow = generatePuzzleValuesNotInRow(solvedPuzzle, rowsColumnsAndGridsWithEmptyValues);

    // // revise marked solved puzzle by identifying these respective items using the identified index and add the value to the item's list of invalid values
    // newMarkedsolvedPuzzle.forEach(item =>{
    //     puzzleValuesNotInRow.forEach(invalidValue => {
    //         // check if value is valid, its not original and its index matches invalid ones
    //         if(item.status === 'empty' && item.value !== '.' && item.index === invalidValue.index){

    //             let itemInvalidValues = [...item.invalidValues]
    //             itemInvalidValues.push(item.value)
    //             // console.log('itemInvalidValues', itemInvalidValues)
    //             item.invalidValues = [...new Set(itemInvalidValues)]
    //             // item.invalidValues.push(invalidValue.value); // add the value to the item's list of invalid values
    //             item.value = '.' // change the current item's value to be empty 
    //         };
    //     });
    //     //  item.invalidValues.length > 0 ?
    //     //   console.log('item.invalidValues', item.invalidValues, 'cordinate', item.cordinate, 'index', item.index) :
    //     //    'it doesnt matter'
    // });

    // correct row/column/region with empty values
    newMarkedsolvedPuzzle.forEach(item =>{

        // iterate list of all rows, columns or grids with empty values
        rowsColumnsAndGridsWithEmptyValues.forEach(cordinate =>{

            if((cordinate.row === item.row || cordinate.column === item.column || cordinate.grid === item.grid) &&
                item.value !== '.' && item.status !== 'original'){  
                // check if item cordinates matches problematic ones an it not empty or a valid original digit
        
                // if it does, delete the invalid value that was previously added to the cordinate
                item.value = '.'

                // console.log('item after', item.value);
                };
            });

        // regenerate puzzle
        newPuzzle = newPuzzle + item.value

        // collect empty values index and cordinates
        // let emptyvalueIndexAndCordinate =  {}
        // emptyvalueIndexAndCordinate[item.index] = item.cordinate
        // item.value === '.' ? emptyvaluesIndexAndCordinates.push(emptyvalueIndexAndCordinate) : 'it doesnt matter';
        item.value === '.' ? emptyvaluesIndexAndCordinates.push(item.cordinate) : 'it doesnt matter';

        // item ? console.log('item.index', item.index,) : 'it doesnt matter'
        // item.invalidValues ? console.log('item.index', item.index) : console.log('item.index', item.index, 'item.invalidValues doesnt exist');
        // item.invalidValues && item.invalidValues.length > 0 ?
        //  console.log('item.index', item.index, 'item.invalidValues', item.invalidValues) : 'it doesnt matter'
        // if(item.invalidValues && item.invalidValues.length > 0 ){console.log('item.index', item.index, 'item.invalidValues', item.invalidValues)}
    });

    return [newPuzzle, emptyvaluesIndexAndCordinates, newMarkedsolvedPuzzle]

};

module.exports = reviseProblematicCordinates;