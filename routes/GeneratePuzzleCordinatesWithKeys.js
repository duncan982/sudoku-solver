const GeneratePuzzleCordinatesWithKeys = (puzzleCordinates) => {
  /** generate puzzle coordinates and their keys */

  // create an object to hold puzzle coordinates and their keys
  let puzzleCordinatesWithKeys = [];
  for (let i = 0; i < puzzleCordinates.length; i++) {
    // iterate puzzle cordinates, assign key value and add to puzzleCordinatesWithKeys
    puzzleCordinatesWithKeys.push({ [i]: puzzleCordinates[i] });
  }

  return puzzleCordinatesWithKeys;
};

module.exports = GeneratePuzzleCordinatesWithKeys;
