const generateRows = require('../controllers/generateRows.js');
const generateGrids = require('../controllers/generateGrids.js');
const generateColumns = require('../controllers/generateColumns.js');

const generateRowsColumnsAndGrids = (puzzle) =>{
    // generate rows
    let rows = generateRows(puzzle);
    // console.log(rows);
      
    // generate columns
    let columns = generateColumns(rows);
    // console.log('columns', columns);
      
    // generate grids
    let grids = generateGrids(rows);
    // console.log('grids', grids);
    return [rows, columns, grids];
};

module.exports = generateRowsColumnsAndGrids;