// const generateValueIndexInPuzzle = require('./generateValueIndexInPuzzle.js');
const checkPuzzle = require("./checkPuzzle.js");
const checkToDetectIssues = require("./checkToDetectIssues.js");
const determineIfnextOrCurrentRowOrColumn = require('./determineIfnextOrCurrentRowOrColumn.js');
const checkIfvalueIsPresentMoreThanOnce = require('./checkIfvalueIsPresentMoreThanOnce.js');
const updatePuzzleString = require('./updatePuzzleString.js');

const selectBestPossiblePuzzel =(row, column, nextValue, possiblePuzzels)=>{
    /** select best possible puzzel 
     * whose next value would not be invalid or will contain similar digits in row/column/region*/

    // obtain the current value index
    // let currentValueIndex = generateValueIndexInPuzzle(row, column);

    // obtain next value index i.e. 
    // let nextValueIndex = currentValueIndex + 1;

    // set next value to be tested
    // let nextPossibleValue;
    // if(nextValue < 9){
    //     nextPossibleValue = nextValue + 1;
    // }else{
    //     nextPossibleValue = 1;
    // };
    
    // determine if the nextInvalidValue would be in the current row/column or the next one // if next obtain the next row or column
    let nextOrCurrentRow = determineIfnextOrCurrentRowOrColumn(row, column).row;
    let nextOrCurrentColumn = determineIfnextOrCurrentRowOrColumn(row, column).column;

    // collect possible valid puzzles
    let validPossiblePuzzles = []
    let bestValidPossiblePuzzles = []

    // iterate selected puzzles and predict among the above in which of them the next invalid value would be valid
    for(let i=0; i<possiblePuzzels.length; i++){
        // select test puzzle
        let testPuzzel = possiblePuzzels[i]; 

        //check if puzzle is solved and if value is in row/column/grid
        let checks = checkPuzzle(testPuzzel, nextOrCurrentRow, nextOrCurrentColumn, nextValue);
        // console.log("checks", checks);

        // check to detect if there are issues with row, column, grid and puzzle
        let response = checkToDetectIssues(checks);
        // console.log("response", response);

        if(response.valid){
            // value is not in row/column/grid

            // collect the testpuzzle
            validPossiblePuzzles.push(testPuzzel);

            // add next value to puzzle
            let updatedTestPuzzel = updatePuzzleString(testPuzzel, row, column, nextValue);
            // console.log('updatedTestPuzzel', updatedTestPuzzel);

            // check that it will not also be in the row/colum/region
            let isAnyValuePresentMoreThanOnce = checkIfvalueIsPresentMoreThanOnce(updatedTestPuzzel.regeneratedPuzzle);
            
            if((updatedTestPuzzel.valueAddedToPuzzle === true && isAnyValuePresentMoreThanOnce === false) || 
            (updatedTestPuzzel.valueAddedToPuzzle === false && isAnyValuePresentMoreThanOnce === false)){
                // check if testPuzzle was updated but no AnyValueIsPresentMoreThanOnce or
                // test puzzle was not updated and no AnyValueIsPresentMoreThanOnce

                // add modified puzzle to the list of possible puzzles
                bestValidPossiblePuzzles.push(testPuzzel);
            };
        };
    };

    // select the first random puzzle in the list of possible puzzles if validPossiblePuzzles is not available
    // let possiblePuzzel = possiblePuzzels[0];
    let possiblePuzzel = possiblePuzzels[Math.floor(Math.random()*possiblePuzzels.length)];
    // console.log('possiblePuzzels', possiblePuzzels);

    // select the first random puzzle in the list of possible puzzles if validPossiblePuzzles is available
    // let validPossiblePuzzle = validPossiblePuzzles[0];
    let validPossiblePuzzle = validPossiblePuzzles[Math.floor(Math.random()*validPossiblePuzzles.length)];
    // console.log('validPossiblePuzzles', validPossiblePuzzles);

    // select the first random bestValidPossiblePuzzlesin the list of possible puzzles if bestValidPossiblePuzzles is available
    // let validPossiblePuzzle = validPossiblePuzzles[0];
    let bestValidPossiblePuzzle = bestValidPossiblePuzzles[Math.floor(Math.random()*bestValidPossiblePuzzles.length)];
    console.log('bestValidPossiblePuzzles', bestValidPossiblePuzzles);

    if(bestValidPossiblePuzzle){
        // console.log('bestValidPossiblePuzzles', bestValidPossiblePuzzles)
        return bestValidPossiblePuzzle;
    }
    else if(validPossiblePuzzle){
        return validPossiblePuzzle;
    }
    // else{
    //     return possiblePuzzel
    // }

};

module.exports = selectBestPossiblePuzzel;




