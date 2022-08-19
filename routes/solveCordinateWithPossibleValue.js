const updatePuzzleString = require("./updatePuzzleStringV4.js");
// const updatePuzzleString = require("./updatePuzzleStringV3.js");
// const updatePuzzleString = require("./updatePuzzleString.js");
// const possiblePuzzelItems = require("./possiblePuzzelItems.js");
const checkIfThereIsAValidAlreadyAddedToPuzzle = require('./checkIfThereIsAValidAlreadyAddedToPuzzle.js');
// const checkIfvalueIsPresentMoreThanOnce = require('./checkIfvalueIsPresentMoreThanOnce.js');
// const selectBestPossiblePuzzel = require('./selectBestPossiblePuzzel.js');
const checkpuzzleForMultipleValues = require('./checkpuzzleForMultipleValues.js');
const selectRandomPuzzle = require('./selectRandomPuzzle.js');
const Solver = require("../controllers/sudoku-solver.js");
const solver = new Solver();

const solveCordinateWithPossibleValue = (puzzle, row, column, possiblePuzzelItems) =>{
    // console.log('puzzle before', puzzle);

    // check if there is a valid digit already at the specified cordinates
    let isThereAValueAlreadyAddedToPuzzle = checkIfThereIsAValidAlreadyAddedToPuzzle(puzzle, row, column);
    
    if(isThereAValueAlreadyAddedToPuzzle){
        // if there is a valid digit already at the specified cordinates, dont work on the puzzle, return it
        // console.log('there is a value already added to puzzle');

        return puzzle;
    }else{

        // check that no value is present more than once in a given row/column/region
        let isAnyValuePresentMoreThanOnce =  checkpuzzleForMultipleValues(puzzle);

        if(isAnyValuePresentMoreThanOnce === false){
            // there is no valid digit already at the specified cordinates, therefore work on the puzzle
        let updatedPuzzleString;
        let possiblePuzzels = [];
        let possiblePuzzel;
        let newpossiblePuzzelItems;
        let nextValue;

        // console.log('possiblePuzzelItems before', possiblePuzzelItems);

        let invalidValue // get value not added to array

        // for(let i=0; i < possiblePuzzelItems.length; i++){
            // check among digits 1-9 which one can be added

            // set the value to be tested
            let value = possiblePuzzelItems[Math.floor(Math.random()*possiblePuzzelItems.length)];
            // let value = possiblePuzzelItems[i];
            console.log('value', value);

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

                updatedPuzzleString = updatePuzzleString(puzzle, row, column, value);

                if(updatedPuzzleString.valueAddedToPuzzle === true){
                    // check if the value was added to puzzle 

                    // add modified puzzle to the list of possible puzzles
                    possiblePuzzel = updatedPuzzleString.regeneratedPuzzle;
                    // possiblePuzzels.push(updatedPuzzleString.regeneratedPuzzle);
                    // console.log('updatedPuzzleString', updatedPuzzleString)

                }else{
                    // the value is not valid and was not added to puzzle  

                    // mark value as invalid in order to be removed from the list of possible values
                    invalidValue = value;
                    // console.log('invalid value 1', value)
                };
            }else {
                // the value is not valid. Do not add to puzzle  

                // mark value as invalid in order to be removed from the list of possible values
                invalidValue = value;
                
            };
        // };

        if(possiblePuzzels){
            // if(possiblePuzzels.length > 0){
            // if(possiblePuzzel){
            // check if there is a selected first puzzle in the list of possible puzzles;

            // select the first puzzle in the list of possible puzzles
            // possiblePuzzel = possiblePuzzels[1] // yields > 7 empty fields
            // possiblePuzzel = possiblePuzzels[0] // yields 7 empty fields
            // console.log('possiblePuzzel', possiblePuzzel);

            // select random puzzle in the list of possible puzzles
            // possiblePuzzel = possiblePuzzels[Math.floor(Math.random()*possiblePuzzels.length)] // yields > 7 empty fields;
            // console.log('possiblePuzzel', possiblePuzzel);

            // select possible valid puzzle whose next value to be added will be valid
            // possiblePuzzel = selectBestPossiblePuzzel(row, column, nextValue, possiblePuzzels) // yields > 10 empty fields;
            // console.log('possiblePuzzel', possiblePuzzel);

            // select random puzzle with the least number of empty values
            // possiblePuzzel =  selectRandomPuzzle(possiblePuzzels); // yields 12 empty fields

            // console.log('puzzle after', possiblePuzzel);
    
            // return the seleced puzzle
            return possiblePuzzel;

        } else if(invalidValue){
            // there is no selected first puzzle in the list of possible puzzles
            // the previous value was not valid and was not added onto the puzzle
            // therefore try the next set of values

            // discard invalid value form possiblePuzzelItems and set new possible values
            newpossiblePuzzelItems = possiblePuzzelItems.filter(item => {
                return item !== invalidValue;
            });
            // console.log('possiblePuzzelItems after', newpossiblePuzzelItems);

            // check if puzzle is valid i.e. if there is no value present more than once in any of the rows
            let isAnyValuePresentMoreThanOnce =  checkpuzzleForMultipleValues(puzzle);

            if(isAnyValuePresentMoreThanOnce === false && newpossiblePuzzelItems.length > 0){
                // there is no value present more than once in any of the rows

                // console.log('********invalid value, check other values******')

                // the above values in the list of possible value is not valid. therefore repeat
                return solveCordinateWithPossibleValue(puzzle, row, column, newpossiblePuzzelItems);
            }else{
                return puzzle;
            };
            
        }else{
            // console.log('------newpossiblePuzzelItems.length <= 0-------');
            return puzzle;
        };

        }else{
            console.log('there is a value present more than once')
        }
    };
};
module.exports = solveCordinateWithPossibleValue;