const regeneratePuzzle = (puzzleValuesWithKeys) => {
    // console.log('puzzleValuesWithKeys in regeneratePuzzle.js', puzzleValuesWithKeys)
    let puzzel = ''

    puzzleValuesWithKeys.forEach(object => {
        for (const[key, value] of Object.entries(object)){ 
            puzzel = puzzel + value
    };
});

    return puzzel
}

module.exports = regeneratePuzzle 