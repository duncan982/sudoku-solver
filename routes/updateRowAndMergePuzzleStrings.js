const updateRowAndMergePuzzleStrings = (rows, selectedRow, column, value) =>{
    
    /** update the row within the selectedRows at the column index */
    let updatedRows = '';

    // console.log('rows', rows, 'value', value)
    for(const[keys, values] of Object.entries(rows)){
        if(keys === selectedRow){  // check if key is equal to selected row
             if(!values.includes(value)){ // check if value is not already in row
                // console.log(value, ' is not already in row', selectedRow, 'at column', column);
                // console.log('values before', values);
                // if(column){
                    // console.log('values', values, 'value', value)
                    // console.log('values', values);
                    
                    // replace empty value in row and replace the row in puzzle
                    let index = Number(column-1)
                    // let newValues = values.replace(values[Number(column-1)], value); doesnt work, replaces wrong index

                    // let newValues=values.replace(values[index], value); 
                    let newValues=''
                    for(let i=0; i<values.split('').length; i++){
                        i === index ? newValues=newValues + value : newValues=newValues + values.split('')[i]
                    }
                    // console.log('values after', newValues);
                    updatedRows = updatedRows + newValues;
                // }else{
                //     // // replace empty value in row and replace the row in puzzle
                //     // let index = Number(values.indexOf('.'))
                //     // // let newValues = values.replace(values[Number(column-1)], value); doesnt work, replaces wrong index
                    
                //     // // let newValues=values.replace(values[index], value); 
                //     // let newValues=''
                //     // for(let i=0; i<values.split('').length; i++){
                //     //     i === index ? newValues=newValues + value : newValues=newValues + values.split('')[i]
                //     // }
                //     // console.log('values after', newValues);
                //     // updatedRows = updatedRows + newValues;

                //     updatedRows = updatedRows + values

                // }

            }
            // else{
            //     console.log( value, ' is already in row', selectedRow, 'at column', column);
            // }
        }else{
            // updatedRows[keys] = values
                updatedRows = updatedRows + values
            };
    };
    
    // console.log('updatedRows', updatedRows);
    
    return updatedRows

};

module.exports = updateRowAndMergePuzzleStrings;


