const marksolvedPuzzle = (solvedPuzzle, markedOriginalPuzzle) => {
  
    // split puzzle string 
    let splitedPuzzle = solvedPuzzle.split('');  

    // iterate splited puzzle string
    let markedsolvedPuzzle = [];
    for(let i=0; i < splitedPuzzle.length; i++){
        // mark solvedPuzzle string based on original puzzle
        markedsolvedPuzzle.push({ 
            value: splitedPuzzle[i],
            index: i,
            status: markedOriginalPuzzle[i].status,
            conflicts: markedOriginalPuzzle[i].conflicts,
            invalidValues : [...markedOriginalPuzzle[i].invalidValues]
            // invalidValues : markedOriginalPuzzle[i].status === 'empty' ? [...markedOriginalPuzzle[i].invalidValues] : 'it doesnt matter'
        })
    };
    
    // console.log(markedsolvedPuzzle);
    return markedsolvedPuzzle;
};

module.exports = marksolvedPuzzle; 