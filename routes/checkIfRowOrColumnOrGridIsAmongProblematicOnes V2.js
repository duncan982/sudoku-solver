
const checkIfRowOrColumnOrGridIsAmongProblematicOnes = (item, problematicRowsColumnsAndGrids)=>{
    /** correct specific problematic cordinates in row/column/region that matches item with invalid values */

    // console.log(item)

    // check if there is a list to hold invalid values with respect to current cordinates, if not add one
    // item.invalidValues ? 'it doesnt matter' : item['invalidValues'] = [];

    let correctItem; // a variable to be set to collect information on whether to delete item's valid digit or not
    // let problematicRowColumnOrGrid = [] // create a list to collect row/column/region to be deleted

    // iterate items in problematicRowsColumnsAndGrids
    problematicRowsColumnsAndGrids.forEach(cordinate => {

            if(item.status !== 'original' &&  item.value !== '.'){
                // // check if value is a digit 1-9 and if value is not original
                
                // if(cordinate.row === item.row && cordinate.column === item.column && cordinate.grid === item.grid){
                //     //check if row, column and grid is among the problematic ones
                //     correctItem = true;
                //     // problematicRowColumnOrGrid.push({row: item.row, column: item.column, grid: item.grid, index: item.index});
                // }else 
                
                if(cordinate.row === item.row && cordinate.column === item.column){
                    // check if row and column is among the problematic ones
                    correctItem = true;
                    // problematicRowColumnOrGrid.push({row: item.row, column: item.column, grid: '', index: item.index});
                }else if(cordinate.row === item.row && cordinate.grid === item.grid){
                    //check if row and grid is among the problematic ones
                    correctItem = true;
                    // problematicRowColumnOrGrid.push({row: item.row, column: '', grid: item.grid, index: item.index});
                    
                }else if(cordinate.column === item.column && cordinate.grid === item.grid){
                    //check if column and grid is among the problematic ones
                    correctItem = true;
                    // problematicRowColumnOrGrid.push({row: '', column: item.column, grid: item.grid, index: item.index});
                    
                }else if(cordinate.row === item.row){
                    //check if row is among the problematic ones
                    correctItem = true;
                    // problematicRowColumnOrGrid.push({row: item.row, column: '', grid: '', index: item.index});
                    
                }else if(cordinate.column === item.column){
                    //check if column is among the problematic ones
                    correctItem = true;
                    // problematicRowColumnOrGrid.push({row: '', column: item.column, grid: '', index: item.index});

                }else if(cordinate.grid === item.grid){
                    //check if grid is among the problematic ones 
                    correctItem = true;
                    // problematicRowColumnOrGrid.push({row: '', column: '', grid: item.grid, index: item.index});
                };
            };
        });

        if(correctItem){
            // check if item is to be corrected

            // console.log('checkIfRowOrColumnOrGridIsAmongProblematicOnes V2.js: item is to be corrected');

            // console.log('item before', item);
            // console.log('item', item.index);

            // if it is add the value to the list of invalid values
            // console.log('item.invalidValues before', item.invalidValues) 
            let itemInvalidValues = [...item.invalidValues]
            itemInvalidValues.push(item.value)
            // console.log('itemInvalidValues', itemInvalidValues)
            item.invalidValues = itemInvalidValues
            // console.log('item.invalidValues after', item.invalidValues)  

            // delete the invalid value that was previously added to the cordinate
            item.value = '.'

            // console.log('item after', item);

        }else{
            // cordinate doesnt match any of the above criteria, therefore leave it as it is
            // console.log('item is not to be corrected');

            item.value = item.value
            item.invalidValues = item.invalidValues;
        };

        // remove duplicates 
        item.invalidValues = [...new Set(item.invalidValues)];
        // return [item, problematicRowColumnOrGrid]
        return item
};

module.exports = checkIfRowOrColumnOrGridIsAmongProblematicOnes;