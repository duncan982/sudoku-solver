/** iterate puzzleValuesWithKeys and separate items into respective rows */

const splitPuzzleValuesWithKeys = (puzzleValuesWithKeys) => {
  //   console.log("puzzleValuesWithKeys", puzzleValuesWithKeys);
  let puzzleValuesWithKeysAsRows = {
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
    G: [],
    H: [],
    I: []
  };
  let keyIndex;
  puzzleValuesWithKeys.forEach((indexValue) => {
    for (const [key, value] of Object.entries(indexValue)) {
      // console.log(key);
      if (key >= 0 && key <= 8) {
        // console.log(indexValue)
        puzzleValuesWithKeysAsRows.A.push(indexValue);
      } else if (key >= 9 && key <= 17) {
        // console.log(indexValue)
        puzzleValuesWithKeysAsRows.B.push(indexValue);
      } else if (key >= 18 && key <= 26) {
        // console.log(indexValue)
        puzzleValuesWithKeysAsRows.C.push(indexValue);
      } else if (key >= 27 && key <= 35) {
        // console.log(indexValue)
        puzzleValuesWithKeysAsRows.D.push(indexValue);
      } else if (key >= 36 && key <= 44) {
        // console.log(indexValue)
        puzzleValuesWithKeysAsRows.E.push(indexValue);
      } else if (key >= 45 && key <= 53) {
        // console.log(indexValue)
        puzzleValuesWithKeysAsRows.F.push(indexValue);
      } else if (key >= 54 && key <= 62) {
        // console.log(indexValue)
        puzzleValuesWithKeysAsRows.G.push(indexValue);
      } else if (key >= 63 && key <= 71) {
        // console.log(indexValue)
        puzzleValuesWithKeysAsRows.H.push(indexValue);
      } else if (key >= 72 && key <= 80) {
        // console.log(indexValue)
        puzzleValuesWithKeysAsRows.I.push(indexValue);
      }
    }
  });

  //   console.log("puzzleValuesWithKeysAsRows", puzzleValuesWithKeysAsRows);
  return puzzleValuesWithKeysAsRows;
};

module.exports = splitPuzzleValuesWithKeys;
