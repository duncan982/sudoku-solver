const generateValueIndexInPuzzle = require('./generateValueIndexInPuzzle.js')


const updatePuzzleString = (puzzle, row, column, value) => {

    // generate index of value in puzzle row, column,
    let valueIndex = generateValueIndexInPuzzle(row, column)
    //  console.log('valueIndex', valueIndex)

    let splittedPuzzle = puzzle.split('');
    // console.log('splittedPuzzle', splittedPuzzle);

    let newPuzzle =''
    
    for(let i=0; i<splittedPuzzle.length; i++){
        if(i===Number(valueIndex)){
            newPuzzle = newPuzzle + value;
        }else{
            newPuzzle = newPuzzle + splittedPuzzle[i];
        }
    };

    // console.log('newPuzzle', newPuzzle);

    return newPuzzle

};

module.exports = updatePuzzleString;
