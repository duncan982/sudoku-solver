const puzzleCordinates = require("./puzzleCordinates.js");
const GeneratePuzzleCordinatesWithKeys = require("./GeneratePuzzleCordinatesWithKeys.js");
const gridCordinates = require('../controllers/gridCordinates.js');
const checkIfRowOrColumnOrGridIsAmongProblematicOnes = require('./checkIfRowOrColumnOrGridIsAmongProblematicOnes.js')

const reviseProblematicRowColumnOrGrid = (markedsolvedPuzzle,  problematicRowColumnOrGrid) => {

    /** revise puzzle at the problematic row/column/grid */

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

    // console.log('problematicRowColumnOrGrid', problematicRowColumnOrGrid);

    // check if row/column/grid is among the problematic ones and that the value is valid but not original and correct as appropriate
    newMarkedsolvedPuzzle.forEach(item => {
        
        let newItem = checkIfRowOrColumnOrGridIsAmongProblematicOnes(item, problematicRowColumnOrGrid);
        // console.log('newItem', newItem)

        item = newItem;

        // regenerate puzzle
        newPuzzle = newPuzzle + item.value

    });

    // // correct row/column/region with empty values
    // newMarkedsolvedPuzzle.forEach(item =>{

    //     // iterate list of all rows, columns or grids with empty values
    //     problematicRowColumnOrGrid.forEach(cordinate =>{

    //         if((cordinate.row === item.row || cordinate.column === item.column ||
    //              cordinate.grid === item.grid || cordinate.cordinate === item.cordinate) &&
    //         // if((cordinate.row === item.row || cordinate.column === item.column) &&
    //         // if((cordinate.row === item.row) &&
    //          item.value !== '.' && item.status !== 'original'){  
    //             // check if item cordinates matches problematic ones an it not empty or a valid original digit

    //             // // if it is add the value to the list of invalid values
    //             // // console.log('item.invalidValues before', item.invalidValues) 
    //             // let itemInvalidValues = [...item.invalidValues]
    //             // itemInvalidValues.push(item.value)
    //             // // console.log('itemInvalidValues', itemInvalidValues)
    //             // item.invalidValues = [...new Set(itemInvalidValues)]
    //             // // item.invalidValues = itemInvalidValues
    //             // // console.log('item.invalidValues after', item.invalidValues) 
        
    //             // if it does, delete the invalid value that was previously added to the cordinate
    //             item.value = '.'

    //             // console.log('item after', item);
    //         };
    //     });

    //     // regenerate puzzle
    //     newPuzzle = newPuzzle + item.value

    // });

    return newPuzzle

};

module.exports = reviseProblematicRowColumnOrGrid;