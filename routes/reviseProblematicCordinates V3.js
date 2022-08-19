const puzzleCordinates = require("./puzzleCordinates.js");
const GeneratePuzzleCordinatesWithKeys = require("./GeneratePuzzleCordinatesWithKeys.js");
const gridCordinates = require('../controllers/gridCordinates.js');
const emptyRowOrColumnOrGridIFAmongProblematicOnes = require('./emptyRowOrColumnOrGridIFAmongProblematicOnes.js');

const reviseProblematicCordinates = (markedsolvedPuzzle) => {

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

    let problematicRowColumnOrGrid = []; // collect row/column/grid with atleast one empty values
    let newPuzzle = '' // create new puzzle
    let emptyvaluesIndexAndCordinates = [] // collect empty values index and cordinates

    // iterate each item in markedsolvedPuzzle
    let newMarkedsolvedPuzzle = [...markedsolvedPuzzle]
    newMarkedsolvedPuzzle.forEach(item => {

        // add rows/columns/grids ids to each item based on index in puzzle and markedsolvedPuzzle
        let similarItem 
        puzzleCordinatesWithKeys.map(element => {element.index === item.index ? 
            similarItem = element :
             'it doesnt matter'});

        item['cordinate']=similarItem.cordinate;
        item['row'] = similarItem.row;
        item['column'] = similarItem.column;
        item['grid'] = similarItem.grid;
        // if(item.invalidValues && item.invalidValues.length > 0 ){console.log('item.index', item.index, 'item.invalidValues', item.invalidValues)}
    });

    // collect row/column/region with empty values
    newMarkedsolvedPuzzle.forEach(item =>{

        // check if item value is empty and item status is not original then collect its cordinates
        item.value === '.' ? problematicRowColumnOrGrid.push({row: item.row, column: item.column, grid: item.grid}) : 'it doesnt matter';

    });

    // console.log('problematicRowColumnOrGrid', problematicRowColumnOrGrid);

    // correct row/column/region with empty values
    newMarkedsolvedPuzzle.forEach(item =>{

        let newItem =  emptyRowOrColumnOrGridIFAmongProblematicOnes(item, problematicRowColumnOrGrid);

        // regenerate puzzle
        newPuzzle = newPuzzle + newItem.value

        // collect empty values index and cordinates
        item.value === '.' ? emptyvaluesIndexAndCordinates.push(item.cordinate) : 'it doesnt matter';

    });

    return [newPuzzle, emptyvaluesIndexAndCordinates, newMarkedsolvedPuzzle]

};

module.exports = reviseProblematicCordinates;