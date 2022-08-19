const puzzleCordinates = require('./puzzleCordinates.js');

const generateCordinatesOfEmptyValues = (puzzle) => {
  /** collect cordinates of empty values */

  let emptyValuesCordinates = [];

  for(let i=0; i < puzzle.split('').length; i++){ // split puzzle into individual strings
    // if value at index of puzzle string is empty, collect cordinate with similar index from puzzleCordinates
    puzzle.split('')[i] === '.' ? emptyValuesCordinates.push(puzzleCordinates[i]) : 'it doesnt matter'; 
    };

    return emptyValuesCordinates

};

module.exports = generateCordinatesOfEmptyValues;