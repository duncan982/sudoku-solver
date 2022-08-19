

const updatePuzzleString = require("./updatePuzzleStringV4.js");
// const updatePuzzleString = require("./updatePuzzleStringV3.js");
// const updatePuzzleString = require("./updatePuzzleString.js");
// const possiblePuzzelItems = require("./possiblePuzzelItems.js");
const checkIfThereIsAValidAlreadyAddedToPuzzle = require('./checkIfThereIsAValidAlreadyAddedToPuzzle.js');
// const checkIfvalueIsPresentMoreThanOnce = require('./checkIfvalueIsPresentMoreThanOnce.js');
// const selectBestPossiblePuzzel = require('./selectBestPossiblePuzzel.js');
const checkpuzzleForMultipleValues = require('./checkpuzzleForMultipleValues.js');
// const selectRandomPuzzle = require('./selectRandomPuzzle.js');
// const checkIfValueIsValid = require('./checkIfValueIsValid.js');
const Solver = require("../controllers/sudoku-solver.js");
const solver = new Solver();

const solveCordinateWithPossibleValue = (puzzle, row, column, possiblePuzzelItems) =>{
    /** attempt to solve cordinate with possible value */

    // check if there is a valid digit already at the specified cordinates
    let isThereAValueAlreadyAddedToPuzzle = checkIfThereIsAValidAlreadyAddedToPuzzle(puzzle, row, column);
    
    if(isThereAValueAlreadyAddedToPuzzle){
        // if there is a valid digit already at the specified cordinates, dont work on the puzzle, return it
        // console.log('there is a value already added to puzzle');
        // console.log('puzzle in solveCordinateWithPossibleValue.js 2', puzzle)

        return puzzle;
    
    }else{
        // there is no digit already at the specified cordinates

        // check that no value is present more than once in a given row/column/region
        let isAnyValuePresentMoreThanOnce =  checkpuzzleForMultipleValues(puzzle);

        if(isAnyValuePresentMoreThanOnce === false){
            // there is no valid digit already at the specified cordinates, therefore work on the puzzle
            let updatedPuzzleString;
            let possiblePuzzel;
            let newpossiblePuzzelItems;
            let conflicts = [ ];
            // let conflicts;

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
            if(isValueAlreadyInRow === false && isValueAlreadyInColumn === false && isValueAlreadyInGrids === false){
                // the value is valid, try to add the value onto the puzzle
    
                        // check if the value is valid and try to add the value onto the puzzle
                        updatedPuzzleString = updatePuzzleString(puzzle, row, column, value);
                        // console.log('updatedPuzzleString in solveCordinateWithPossibleValue.js', updatedPuzzleString);

                        if(updatedPuzzleString.valueAddedToPuzzle === true){
                            // check if the value was added to puzzle;
                            
                            // console.log('puzzle is updated');
                            possiblePuzzel = updatedPuzzleString.regeneratedPuzzle
                            // possiblePuzzels.push(updatedPuzzleString.regeneratedPuzzle);
        
                        }else{
                            // the value is not valid and was not added to puzzle 

                            // console.log('puzzle is not updated', updatedPuzzleString.conflicts);
                            
                            // collect information on the conflict  
                            // conflicts = updatedPuzzleString.conflicts;
                            conflicts.push(updatedPuzzleString.conflicts);
        
                            // mark value as invalid in order to be removed from the list of possible values
                            invalidValue = value;
                            // console.log('invalid value 1', value)
                        };
                    }
                    else{
                        // value is in the list of invalid values for the current cordinate

                        // console.log(value, "is in the list of invalid values");
        
                        // mark value as invalid in order to be removed from the list of possible values
                        invalidValue = value;
                        // console.log('invalid value 2', value)
                    };
            
            if(possiblePuzzel){
                // check if there is a selected first puzzle in the list of possible puzzles;
 
                // console.log('puzzle after as possiblePuzzle', possiblePuzzel);
        
                // return the seleced puzzle
                return possiblePuzzel

            } else if(invalidValue){
                // there is no selected first puzzle in the list of possible puzzles
                // the previous value was not valid and was not added onto the puzzle
                // therefore try the next set of values

                // check if puzzle is valid i.e. if there is no value present more than once in any of the rows
                let isAnyValuePresentMoreThanOnce =  checkpuzzleForMultipleValues(puzzle);

                if(isAnyValuePresentMoreThanOnce === false){
                    // there is no value present more than once in any of the rows

                    // discard invalid value form possiblePuzzelItems and set new possible values
                    newpossiblePuzzelItems = possiblePuzzelItems.filter(item => {return item !== invalidValue});
                    // console.log('possiblePuzzelItems after', newpossiblePuzzelItems);

                    // console.log('********invalid value, check other values******')

                    if(newpossiblePuzzelItems.length > 0){
                        // the above values in the list of possible value is not valid. therefore repeat
                        return solveCordinateWithPossibleValue(puzzle, row, column, newpossiblePuzzelItems);
                    }else{
                        return puzzle;
                    }

                };
                
            }else{
                // console.log('------newpossiblePuzzelItems.length <= 0-------');
                // console.log('puzzle after as just puzzle', puzzle)
                return puzzle
            };

        };
    };
};
module.exports = solveCordinateWithPossibleValue;