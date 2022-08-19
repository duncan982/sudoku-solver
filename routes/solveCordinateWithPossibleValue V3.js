const updatePuzzleString = require("./updatePuzzleStringV4.js");
const checkIfThereIsAValidAlreadyAddedToPuzzle = require('./checkIfThereIsAValidAlreadyAddedToPuzzle.js');
const checkpuzzleForMultipleValues = require('./checkpuzzleForMultipleValues.js');
const checkIfValueIsValid = require('./checkIfValueIsValid.js');
const Solver = require("../controllers/sudoku-solver.js");
const solver = new Solver();
const solveRow = require('./solveRow.js');

const solveCordinateWithPossibleValue = (puzzle, row, column, possiblePuzzelItems, retainedMarkedOriginalPuzzle, retainedEmptyvaluesIndexAndCordinates) =>{
    /** attempt to solve cordinate with possible value */

    // check if there is a valid digit already at the specified cordinates
    let isThereAValueAlreadyAddedToPuzzle = checkIfThereIsAValidAlreadyAddedToPuzzle(puzzle, row, column);
    
    if(isThereAValueAlreadyAddedToPuzzle){
        // if there is a valid digit already at the specified cordinates, dont work on the puzzle, return it
        // console.log('there is a value already added to puzzle');
        // console.log('puzzle in solveCordinateWithPossibleValue.js 2', puzzle)

        // return puzzle;
        return {
            puzzle : puzzle,
            retainedMarkedOriginalPuzzle: retainedMarkedOriginalPuzzle,
            retainedEmptyvaluesIndexAndCordinates : retainedEmptyvaluesIndexAndCordinates
        };
    
    }else{
        // there is no digit already at the specified cordinates

        // check that no value is present more than once in a given row/column/region
        let isAnyValuePresentMoreThanOnce =  checkpuzzleForMultipleValues(puzzle);

        if(isAnyValuePresentMoreThanOnce === false){
            // there is no valid digit already at the specified cordinates, therefore work on the puzzle
            // let updatedPuzzleString;
            let possiblePuzzel;
            let newpossiblePuzzelItems;
            let conflicts = [ ];
            let newRetainedMarkedOriginalPuzzle;

            // console.log('puzzle in solveCordinateWithPossibleValue.js 4', puzzle)
            // console.log('possiblePuzzelItems before', possiblePuzzelItems);

            let invalidValue // get value not added to puzzle
            // console.log('possiblePuzzelItems before', possiblePuzzelItems);

                // set a random value to be tested
                // let value =  possiblePuzzelItems[0];
                let value =  possiblePuzzelItems[Math.floor(Math.random()*possiblePuzzelItems.length)];
                // console.log('value', value);

                // check if value is in row
                let isValueAlreadyInRow = solver.checkRowPlacement(puzzle, row, column, value);
                // console.log("isValueAlreadyInRow", isValueAlreadyInRow);
                                
                // check if value is in column
                let isValueAlreadyInColumn = solver.checkColPlacement(puzzle, row, column, value);
                // console.log('isValueAlreadyInColumn', isValueAlreadyInColumn);
                                
                // check if value is in grid
                let isValueAlreadyInGrids = solver.checkRegionPlacement(puzzle, row, column, value);
                // console.log('isValueAlreadyInGrids', isValueAlreadyInGrids);
                
                //check if value is in row/column/grid
                if(isValueAlreadyInRow === false ){
                    // if(isValueAlreadyInRow === false && isValueAlreadyInColumn === false && isValueAlreadyInGrids === false){
                    // the value is valid, try to add the value onto the puzzle

                    // check if value is not in the list of invalid values for the current cordinate
                    let isValueValid = checkIfValueIsValid(value, row, column, retainedMarkedOriginalPuzzle);
                    // console.log(value)
                    // console.log("isValueValid", isValueValid);

                    if(isValueValid === true || isValueValid === 'not applicable'){
        
                        // check if the value is valid and try to add the value onto the puzzle
                        const [updatedPuzzleString, valueAddedToPuzzle] = solveRow(puzzle, value, row,  column, retainedMarkedOriginalPuzzle)
                        // const [updatedPuzzleString, valueAddedToPuzzle, returnedRetainedMarkedOriginalPuzzle] = solveRow(puzzle, value, row,  column, retainedMarkedOriginalPuzzle)
                        // console.log('updatedPuzzleString in solveCordinateWithPossibleValue.js', updatedPuzzleString);

                        if(valueAddedToPuzzle === true){
                            // check if the value was added to puzzle;
                                        
                            // console.log('puzzle is updated');
                            possiblePuzzel = updatedPuzzleString;
                            // newRetainedMarkedOriginalPuzzle = returnedRetainedMarkedOriginalPuzzle;
                    
                        }else{
                            // value is in the list of invalid values for the current cordinate

                            // console.log(value, "is in the list of invalid values");
                    
                            // mark value as invalid in order to be removed from the list of possible values
                            invalidValue = value;
                            // console.log('invalid value 2', value)
                        }
                    }else{
                        // value is in the list of invalid values for the current cordinate
        
                        // console.log(value, "is in the list of invalid values");
                
                        // mark value as invalid in order to be removed from the list of possible values
                        invalidValue = value;
                        // console.log('invalid value 2', value)
                    };
        
                }else{
                    // value is in row/column/grid for the current cordinate

                    // mark value as invalid in order to be removed from the list of possible values
                    invalidValue = value;

                    // collect details about the value that was not added 
                    let collectedConflicts = {}
                    collectedConflicts['possibleValue']=value; 
                    collectedConflicts['cordinate']=`${row}${column}`;
                    collectedConflicts['isValueAlreadyInRow']=isValueAlreadyInRow;
                    collectedConflicts['isValueAlreadyInColumn']=isValueAlreadyInColumn;
                    collectedConflicts['isValueAlreadyInGrids']=isValueAlreadyInGrids;
                    conflicts.push(collectedConflicts);

                };
                    // console.log('collected conflicts', conflicts)
                    // console.log('collected conflicts', conflicts.length)
                        
                    // update markedPuzzle with the list of conflicts if any
                    conflicts.length > 0 ?
                    retainedMarkedOriginalPuzzle.map(item => {
                        // console.log('collect conflicts');
                        // console.log('conflicts before', item.conflicts);
                        if(item.row === row && item.column === column && item.value === '.'){
                            // look for item with matching row and column
           
                            if(item.conflicts){ // check if list of conflicts exists
                                // collect conflicts
                                // console.log('conflicts before', conflicts)
                                let collectedConflicts = [...conflicts];
                                // let collectedConflicts = [...item.conflicts, ...conflicts];
                                item.conflicts = collectedConflicts;
                                // console.log('conflicts after', item.conflicts)
                               
                            }else{
                                item['conflicts']=[]; // add list to add conflicts if it doesnt exist
                                item.conflicts = [...new Set(conflicts)]; // add list of conflicts and remove duplicates
                            };
                        };
                        // console.log('conflicts after', item.conflicts);
                    }) : 'it doesnt matter';
            
            if(possiblePuzzel){
                // check if there is a selected first puzzle in the list of possible puzzles;
 
                // console.log('puzzle after as possiblePuzzle', possiblePuzzel);
        
                // return the seleced puzzle
                // return possiblePuzzel

                return {
                    puzzle : possiblePuzzel,
                    retainedMarkedOriginalPuzzle: retainedMarkedOriginalPuzzle,
                    // retainedMarkedOriginalPuzzle: newRetainedMarkedOriginalPuzzle,
                    retainedEmptyvaluesIndexAndCordinates : retainedEmptyvaluesIndexAndCordinates
                };

            } else if(invalidValue){
                // there is no selected first puzzle in the list of possible puzzles
                // the previous value was not valid and was not added onto the puzzle
                // therefore try the next set of values

                // check if puzzle is valid i.e. if there is no value present more than once in any of the rows
                let isAnyValuePresentMoreThanOnce =  checkpuzzleForMultipleValues(puzzle);

                if(isAnyValuePresentMoreThanOnce === false){
                    // there is no value present more than once in any of the rows

                    // discard invalid value form possiblePuzzelItems and set new possible values
                    // newpossiblePuzzelItems = possiblePuzzelItems.filter(item => {return item !== value});
                    newpossiblePuzzelItems = possiblePuzzelItems.filter(item => {return item !== invalidValue});
                    // console.log('possiblePuzzelItems after', newpossiblePuzzelItems);

                    // console.log('********invalid value, check other values******')

                    if(newpossiblePuzzelItems.length > 0){
                        // the above values in the list of possible value is not valid. therefore repeat

                        // console.log('newpossiblePuzzelItems.length > 0')

                        // revise puzzle at the problematic row 
                        return solveCordinateWithPossibleValue(puzzle, row, column, newpossiblePuzzelItems,
                             retainedMarkedOriginalPuzzle,  retainedEmptyvaluesIndexAndCordinates);

                    }else{

                        // console.log('newpossiblePuzzelItems.length < 0')
                        // return puzzle;
                        return {
                            puzzle : puzzle,
                            retainedMarkedOriginalPuzzle: retainedMarkedOriginalPuzzle,
                            retainedEmptyvaluesIndexAndCordinates : retainedEmptyvaluesIndexAndCordinates
                        };
                    }
                };
            }else{
                // console.log('------newpossiblePuzzelItems.length <= 0-------');
                // console.log('puzzle after as just puzzle', puzzle)
                // return puzzle
                return {
                    puzzle : puzzle,
                    retainedMarkedOriginalPuzzle: retainedMarkedOriginalPuzzle,
                    retainedEmptyvaluesIndexAndCordinates : retainedEmptyvaluesIndexAndCordinates
                };
            };

        }else{
            console.log('there is a value present more than once')
        }
    };
};
module.exports = solveCordinateWithPossibleValue;