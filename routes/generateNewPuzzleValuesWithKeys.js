const generateNewPuzzleValuesWithKeys = (splitedPuzzleValuesWithKeys) => {
  console.log("splitedPuzzleValuesWithKeys", splitedPuzzleValuesWithKeys["A"]);

  // rejoin the various rows into puzzleValuesWithKeys
  let newPuzzleValuesWithKeys = [];
  for (const [keys, values] of Object.entries(splitedPuzzleValuesWithKeys)) {
    // console.log(values)
    values.forEach((item) => {
      newPuzzleValuesWithKeys.push(item);
    });
  }
  // console.log("newPuzzleValuesWithKeys", newPuzzleValuesWithKeys);
  return newPuzzleValuesWithKeys;
};

module.exports = generateNewPuzzleValuesWithKeys;
