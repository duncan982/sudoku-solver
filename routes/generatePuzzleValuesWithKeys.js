const generatePuzzleValuesWithKeys = (puzzle) => {
  // create an array of puzzle string values
  let puzzleValues;
  let puzzleValuesWithKeys = [];
  // if(typeof(puzzle)==="string"){
  puzzleValues = puzzle.split("");
  // create an object to hold puzzle values and their keys
  puzzleValuesWithKeys = [];
  for (let i = 0; i < puzzleValues.length; i++) {
    // iterate puzzle Values, assign key value and add to puzzleValuesWithKeys
    puzzleValuesWithKeys.push({ [i]: puzzleValues[i] });
  }

  return puzzleValuesWithKeys;
};
module.exports = generatePuzzleValuesWithKeys;
