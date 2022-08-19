const markPuzzle = (puzzle) => {
    // let puzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
    let splitedPuzzle = puzzle.split('');    
    let markedPuzzle = []
    // split puzzle string and iterate splited puzzle string
    for(let i=0; i < splitedPuzzle.length; i++){
        splitedPuzzle[i].match(/\d/) ? // check if value is a digit or not
        markedPuzzle.push({ // if yes, mark it as original and collect it
            value: splitedPuzzle[i],
            index: i,
            status: 'original',
            invalidValues : []
        }) 
            :  
            markedPuzzle.push({ // if not, mark it as empty and collect it
            value: splitedPuzzle[i],
            index: i,
            status: 'empty',
            invalidValues : []
        });
    };
    
    // console.log(markedPuzzle);
    return markedPuzzle;
};

module.exports = markPuzzle;    