const rowsIndex = require('./rowsIndex.js');

const determineIfnextOrCurrentRowOrColumn = (row, column) =>{
/** determine if the nextInvalidValue would be in the current row/column or the next one */

    // create an object to hold row and column value
    let nextOrCurrentRowOrColumn = {};

    // obtain value index of row
    let rowsIndexValue = rowsIndex[row];

    if(row !== 'I'){
    // check if row is not I

        if(`${column}` < 9){
            // check if value of column is less than 9

            // if less, rowsIndexValue remains the same i.e nextInvalidValue would still be in the same row
            // but column will increment by 1
            nextOrCurrentRowOrColumn['row']=row;
            let incrementColumnByOne = Number(column) + 1
            nextOrCurrentRowOrColumn['column']=`${incrementColumnByOne}`;
        }else{
            // nextInvalidValue will be in the next row/column

            // set next row
            let nextRowValueIndex = rowsIndexValue + 9;
           
            // iterate row indexex and determine nextRow based on nextRowValueIndex 
            let nextRow
            for(const[keys, values]of Object.entries(rowsIndex)){
                if(values === nextRowValueIndex){
                    nextRow = keys
                }
            };

            nextOrCurrentRowOrColumn['row']=nextRow;

            // set next column 
            nextOrCurrentRowOrColumn['column']='1';
        };
        
    }else{
        // row is I

        if(`${column}` < 9){
            // check if value of column is less than 9

            // if less, rowsIndexValue remains the same i.e nextInvalidValue would still be in the same row
            // but column will increment by 1
            nextOrCurrentRowOrColumn['row']=row;
            let incrementColumnByOne = Number(column) + 1;
            nextOrCurrentRowOrColumn['column']=`${incrementColumnByOne}`;
        }else{
            // next row or column will be invalid
            nextOrCurrentRowOrColumn['row'] = 'invalid';
            nextOrCurrentRowOrColumn['column'] = 'invalid';
        };
    };

    return nextOrCurrentRowOrColumn;
};

module.exports = determineIfnextOrCurrentRowOrColumn;