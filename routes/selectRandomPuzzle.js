const selectRandomPuzzle = (updatedPuzzleStrings) =>{

    let numberOfEmptyValues = [];
    
    // console.log(updatedPuzzleStrings)
    // iterate updatedPuzzleStrings
    updatedPuzzleStrings.forEach(element => {
        // count empty strings // collect the puzzle and its empty strings to another list
        // console.log({puzzle: element, emptyValues: element.match(/\./g).length}); 
        numberOfEmptyValues.push({puzzle: element, emptyValues: element.match(/\./g).length})
    });

    // console.log('numberOfEmptyValues', numberOfEmptyValues);

    // select the least number empty value
    let leastNumberOfEmptyValue = numberOfEmptyValues.map(item => {
         return item['emptyValues'] } 
         ).reduce((a,b) => (a,b))
    // console.log('leastNumberOfEmptyValue', leastNumberOfEmptyValue);

    // iterate the list and select the one with least number of empty strings
    let selectedPuzzles = []
    numberOfEmptyValues.filter(puzzle =>{
        if(puzzle.emptyValues === leastNumberOfEmptyValue){
            selectedPuzzles.push(puzzle["puzzle"])
            // return puzzle["puzzle"];
        };
    });
    // console.log('selectedPuzzles', selectedPuzzles);

    if(selectedPuzzles.length > 1){
        // select one random puzzle
        return selectedPuzzles[Math.floor(Math.random()*selectedPuzzles.length)]
    }else{
        return selectedPuzzles[0];
    }
};

module.exports = selectRandomPuzzle;