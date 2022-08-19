
const checkIfRowOrColumnOrGridIsAmongProblematicOnes = (item, problematicRowsColumnsAndGrids)=>{
    /** check if row/column/grid is among the problematic ones and that the value is valid but not original or if the value is empty */

    // check if there is a list to hold invalid values with respect to current cordinates, if not add one
    // item.invalidValues ? console.log('item.index', item.index, 'item.invalidValues', item.invalidValues) : console.log('item.index', item.index, 'item.invalidValues doesnt exist')
    // item.invalidValues ? console.log('item.index', item.index) : console.log('item.index', item.index, 'item.invalidValues doesnt exist');
    // item.status !== 'original' && item.invalidValues ?
    // console.log('item.index', item.index, 'item.invalidValues doesnt exist') : item['invalidValues'] = [];
    // item.invalidValues ? console.log('item.index', item.index) : console.log('item.index', item.index, 'item.invalidValues doesnt exist');

    let isCordinateAmongProblematicOnes

    // iterate items in problematicRowsColumnsAndGrids
    problematicRowsColumnsAndGrids.forEach(cordinate => {

            if(((cordinate.row === item.row && cordinate.column === item.column && cordinate.grid === item.grid) || 
                //check if row, column and grid is among the problematic ones
                 (cordinate.row === item.row && cordinate.column === item.column) || 
                  // check if row and column is among the problematic ones
                  (cordinate.row === item.row && cordinate.grid === item.grid) ||
                   //check if row and grid is among the problematic ones
                   (cordinate.column === item.column && cordinate.grid === item.grid) ||
                    //check if column and grid is among the problematic ones
                    (cordinate.row === item.row) ||
                    //check if row is among the problematic ones
                     (cordinate.column === item.column) ||
                     //check if column is among the problematic ones
                      (cordinate.grid === item.grid)) &&
                      //check if grid is among the problematic ones
                       (item.status !== 'original')  &&
                       //check if value is not original 
                        ( item.value !== '.')){
                        // check if value is a digit 1-9

                            // // console.log('item before', item);
                            // // console.log('item', item.index);
                            // console.log('item', item.index, 'matches above criteria')

                            // // // if it is add the value to the list of invalid values
                            // // // console.log('item.invalidValues before', item.invalidValues) 
                            // // let itemInvalidValues = [...item.invalidValues]
                            // // itemInvalidValues.push(item.value)
                            // // // console.log('itemInvalidValues', itemInvalidValues)
                            // // item.invalidValues = itemInvalidValues
                            // // // console.log('item.invalidValues after', item.invalidValues)  

                            // // // delete the invalid value that was previously added to the cordinate
                            // // item.value = '.'

                            // // console.log('item after', item);

                            // indicate item is problematic
                            isCordinateAmongProblematicOnes = true;
            }else{
                // cordinate dosent match above criteria, therefore leave it as it is
                // console.log('item', item.index, 'cordinate dosent match above criteria')
                // item.value = item.value
                // item.invalidValues = item.invalidValues;

                // indicate item is problematic
                isCordinateAmongProblematicOnes = false;
            };

        });

        // remove duplicates 
        // item.invalidValues = [...new Set(item.invalidValues)];
        // item.status !== 'original' && item.invalidValues.length > 0 ? console.log('item.index', item.index, 'item.invalidValues', item.invalidValues) : 'it doesnt matter'
        // item.invalidValues ? console.log('item.index', item.index) : console.log('item.index', item.index, 'item.invalidValues doesnt exist');
        console.log('isCordinateAmongProblematicOnes', isCordinateAmongProblematicOnes)
        return isCordinateAmongProblematicOnes
        // return item
};

module.exports = checkIfRowOrColumnOrGridIsAmongProblematicOnes;