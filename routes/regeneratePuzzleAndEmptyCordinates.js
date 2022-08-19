const puzzleCordinates = require("./puzzleCordinates.js");
const GeneratePuzzleCordinatesWithKeys = require("./GeneratePuzzleCordinatesWithKeys.js");
const gridCordinates = require('../controllers/gridCordinates.js');

const regeneratePuzzleAndEmptyCordinates = (markedsolvedPuzzle) => {

    // generate puzzle cordinates with keys
    let puzzleCordinatesWithKeys = GeneratePuzzleCordinatesWithKeys(puzzleCordinates);
    // console.log("puzzleCordinatesWithKeys", puzzleCordinatesWithKeys);

    // determine row/column/grid
    puzzleCordinatesWithKeys.forEach(item => {
        for(const[keys, values] of Object.entries(item)){
            item['index'] = Number(keys); // add index value
            item['cordinate']=values;
            item['row'] = values[0]; // add row
            item['column'] = values[1]; // add column

            // determine grid
            let grid
            for(let i=0; i < gridCordinates.length; i++){
                if(gridCordinates[i].indexOf(values) !== -1){
                    grid = gridCordinates.indexOf(gridCordinates[i])
                };
            };
            item['grid']=`${grid+1}` // add grid
        };
    });

    // console.log("puzzleCordinatesWithKeys", puzzleCordinatesWithKeys);

    let newPuzzle = '' // create new puzzle
    let emptyvaluesIndexAndCordinates = [] // collect empty values index and cordinates

    // add rows/columns/grids ids to each item based on index in puzzle and markedsolvedPuzzle
    let newMarkedsolvedPuzzle = [...markedsolvedPuzzle]
    newMarkedsolvedPuzzle.forEach(item => {

        let similarItem 
        puzzleCordinatesWithKeys.map(element => {element.index === item.index ? 
            similarItem = element :
             'it doesnt matter'});
        item['cordinate']=similarItem.cordinate;
        item['row'] = similarItem.row;
        item['column'] = similarItem.column;
        item['grid'] = similarItem.grid;

    });

    // regenerate puzzle and collect empty values index and cordinates
    newMarkedsolvedPuzzle.forEach(item =>{

        // regenerate puzzle
        newPuzzle = newPuzzle + item.value

        // collect empty values index and cordinates
        item.value === '.' ? emptyvaluesIndexAndCordinates.push(item.cordinate) : 'it doesnt matter';

    });

    return [newPuzzle, emptyvaluesIndexAndCordinates, newMarkedsolvedPuzzle]

};

module.exports = regeneratePuzzleAndEmptyCordinates;