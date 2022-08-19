const generateRowsColumnsAndGrids = require('./generateRowsColumnsAndGrids.js');
const updateRowAndMergePuzzleStrings = require('./updateRowAndMergePuzzleStrings.js');
const rowsIndexInColumn = require('./rowsIndexInColumn.js');
const Solver = require("../controllers/sudoku-solver.js");
const solver = new Solver();
const gridCordinatesKysAndValues = require('../controllers/gridCordinatesKeysAndValues.js');
const generateValueIndexInPuzzle = require('./generateValueIndexInPuzzle.js')
const rowsID = require('./rowsID.js');

const solveRow = (puzzle, value, row, column, retainedMarkedOriginalPuzzle) =>{
    // console.log('puzzle', puzzle, 'value', value, 'row', row, 'column', column)
    let updatedRows // variable to hold regenerated row
    let valueIndex // variable to hold index of value in puzzle

    // // check if value is in row
    // let isValueAlreadyInRow = solver.checkRowPlacement(puzzle, row, column, value);
    // // console.log("isValueAlreadyInRow", isValueAlreadyInRow);

    // if(isValueAlreadyInRow){
    //     // if value is in row/column/grid, dont add it, return puzzle
    //     updatedRows = puzzle

    // }else{
        // if value is not in row/column/grid, add it to the row

        // generate rows, columns and grids
        const [rows, columns, grids] = generateRowsColumnsAndGrids(puzzle);
        // let generatedRowsColumnsAndGrids = generateRowsColumnsAndGrids(puzzle);

        // console.log('row', rows)
        // console.log('columns', columns);
        // console.log('grids', grids);

        // obtain rowIndex
        let rowIndex = Number(rowsIndexInColumn[row]);
        // console.log('rowIndex', rowIndex);

        // select the grids in which the row passes through
        let selectedGrids = []
        for(const[keys, values] of Object.entries(gridCordinatesKysAndValues)){
            // generate cordinates
            let cordinates = values.split(',')
            // console.log('cordinates', cordinates)

            cordinates.forEach(cordinate => { 
                if(cordinate.split('').includes(row)){ // check if letter matches row
                    // console.log('cordinate', cordinate, 'includes row?', row, cordinate.split('').includes(row))
                    selectedGrids.push(keys) // if it does collect the grid
                };
            })
        };

        // console.log('selectedGrids before', selectedGrids);

        // remove duplicate entries
        selectedGrids = [...new Set(selectedGrids)];
        // console.log('selectedGrids after', selectedGrids);

        // identify the grids in selectedGrids that dont contain the value
        let gridsWithRowButWithoutValue = [] // collect grids which the row passes through but dont contain the value  
        for(const[keys, values] of Object.entries(grids)){
            selectedGrids.forEach(selectedGrid => {
                // check if grid key matches selectedGrid
                if(keys === selectedGrid){
                    // if it does check if it includes the value
                    if(!values.includes(value)){
                        // if it does not collect grid keys
                        gridsWithRowButWithoutValue.push(keys);
                        // gridsWithRowButWithoutValue[keys]=values
                    }
                }
            })
        };

        // console.log('gridsWithRowButWithoutValue', gridsWithRowButWithoutValue);

        // from the identified grid, identify column with empty value at the row index 
        let dectedColumns = []
        for(const[keys, values] of Object.entries(gridCordinatesKysAndValues)){
            // iterate through gridsWithRowButWithoutValue
            gridsWithRowButWithoutValue.forEach(item => {
                if(keys === item){ // check if grid key matches any of the gridsWithRowButWithoutValue
                    // if it doesn generate cordinates
                    let cordinates = values.split(',')
                    // console.log('cordinates', cordinates)
      
                    // select the columns which passes through the identified grid
                    cordinates.forEach(cordinate => { 
                        let dectedColumn = cordinate.split('')[1]// split cordinate and select the second item
                        dectedColumns.push(dectedColumn)  
                    }) 
                        // console.log(keys, values)
                };
            });
        };

        // console.log('dectedColumns before', dectedColumns);

        // remove duplicates
        dectedColumns = [...new Set(dectedColumns)];

        // console.log('dectedColumns after', dectedColumns);


        // identify in which of these columns the value is not there and the cordinate has an empty value
        let selectedColumns = [] // collect selected columns
        // let selectedRowDetails = [] // selected details about the problematic row
        for(const[keys, values] of Object.entries(columns)){ //  iterate through each column keys value pair
            dectedColumns.forEach(element =>{ // iterate through each detectedColumn
                if(keys === element){ // ensure that only detected columns are worked on
                        // // generate value index
                        valueIndex = generateValueIndexInPuzzle(row, keys)
                        if(values[rowIndex] === '.') { // ensure the colum has an empty value at the row index
                            // console.log('column', keys, 'has an empty value at the row index', rowIndex);
                            if(!values.includes(value)){ // ensure the column does not contain the value
                                // console.log('keys', keys, 'values', values, 'doesnt include value', value);
                                selectedColumns.push(keys) // collect the selectedColumn
                            }
                            // else{// if the column does contain the value, add to current item list of invalid valid values, 
                            //     // then move it to a different index and empty its cordinate
                            //     console.log('Column', keys, 'with values', values, 'includes value', value, 'at index', values.indexOf(value));

                            //     // console.log('keys', keys, 'values', values, 'retainedMarkedOriginalPuzzle[valueIndex]', retainedMarkedOriginalPuzzle[valueIndex]);

                            //     // generate new row the column passes through
                            //     let newRow = rowsID[values.indexOf(value)]
                            //     console.log('row', row)
                            //     console.log('newRow', newRow);

                            //     // recreate value index based on the new row
                            //     let newValueIndex = generateValueIndexInPuzzle(newRow, (Number(keys) -1));
                            //     console.log('newValueIndex', newValueIndex);
                            //     console.log('item at newValueIndex', puzzle[newValueIndex])
                            //     // console.log('retainedMarkedOriginalPuzzle', retainedMarkedOriginalPuzzle)
                            //     // console.log('retainedMarkedOriginalPuzzle[newValueIndex]', retainedMarkedOriginalPuzzle[newValueIndex])
                            //     retainedMarkedOriginalPuzzle.forEach(item => {

                            //         if(item.index === newValueIndex && item.status !== 'original'){
                            //             // ensure the item matches the index, its value is not from original puzzle and its not empty 

                            //             console.log('item.index', item.index, 'item.value', item.value, 'item.status', item.status);
                                
                            //             // add it to items's list of invalid values
                            //             let itemInvalidValues = [...retainedMarkedOriginalPuzzle[newValueIndex].invalidValues]
                            //             itemInvalidValues.push(values[values.indexOf(value)])
                            //             console.log('values[rowIndex]', values[values.indexOf(value)])
                            //             // console.log('itemInvalidValues', itemInvalidValues)
                            //             retainedMarkedOriginalPuzzle[newValueIndex].invalidValues = [...new Set(itemInvalidValues)];

                            //             // empty its cordinate
                            //             retainedMarkedOriginalPuzzle[newValueIndex].value = '.'

                            //             // obtain rowIndex
                            //             let newRowIndex = Number(rowsIndexInColumn[newRow]);
                            //             console.log('rowIndex', rowIndex);

                            //             // select details about the problematic row
                            //             selectedRowDetails.push({
                            //                 row: `${newRow}`,
                            //                 invalidValue: values[newRowIndex],
                            //                 indexOfValueInRow : Number(keys)
                            //             });

                            //             // collect the selectedColumn
                            //             selectedColumns.push(keys);
                            //         }
                            //     })
                            // }
                        }
                        // else{
                        //     // console.log('column', keys, 'doesnt have an empty value at the row index', rowIndex)
                        // }
                };
            });
        };

        // console.log('selectedRowDetails', selectedRowDetails);
        // if(selectedRowDetails.length > 0){

        //     // correct the problematic row
        //     let newRows = {}
        //     for(const[keys, values] of Object.entries(rows)){
        //         // console.log('keys', keys, 'values', values)
        //         if(keys === selectedRowDetails[0].row){
        //             console.log('problematic row', 'keys', keys, 'values', values)
        //             console.log('values before', values);
        //             let newValues=''
        //             for(let i=0; i<values.split('').length; i++){
        //                 i === selectedRowDetails[0].indexOfValueInRow - 1 ? newValues=newValues + '.' : newValues=newValues + values.split('')[i]
        //             };
    
        //             newRows[keys]= newValues
        //             console.log('values after', newValues);
        //         }else{
        //             // console.log('non problematic row', 'keys', keys, 'values', values)
        //             newRows[keys]=values
        //             }
        //     }
        //     //   if(selectedColumns.length > 0){
        //         // console.log('selectedColumns', selectedColumns);
        //         // select column
        //         let selectedColumn = selectedColumns[0];
        //         // console.log('selectedColumn', selectedColumn);
        //         updatedRows = updateRowAndMergePuzzleStrings(newRows, row, selectedColumn, value);
        //         // }else{
        //         //     updatedRows=puzzle;
        //         // }
        //     // updatedRows = updateRowAndMergePuzzleStrings(newRows, row, selectedColumn, value);
        // }else{
            // if(selectedColumns.length > 0){
                // console.log('selectedColumns', selectedColumns);
                // select column
                let selectedColumn = selectedColumns[0];
                // console.log('selectedColumn', selectedColumn);
                updatedRows = updateRowAndMergePuzzleStrings(rows, row, selectedColumn, value);
                // }else{
                //     updatedRows=puzzle;
                // }
            // updatedRows = updateRowAndMergePuzzleStrings(rows, row, selectedColumn, value);
        // };

        // update the row within the selectedRows at the column index
        // updatedRows = updateRowAndMergePuzzleStrings(newRows, row, selectedColumn, value);
        // console.log('updatedRows', updatedRows);

        // updatedRows = updateRowAndMergePuzzleStrings(rows, row, selectedColumn, value);

    // }

    // check if value was added to puzzle
    let valueAddedToPuzzle;
    valueIndex = generateValueIndexInPuzzle(row, column)
    updatedRows[valueIndex] !=='.' ? valueAddedToPuzzle=true : valueAddedToPuzzle=false;
    
    return [updatedRows, valueAddedToPuzzle]
    // return [updatedRows, valueAddedToPuzzle, retainedMarkedOriginalPuzzle]
    
};

module.exports = solveRow