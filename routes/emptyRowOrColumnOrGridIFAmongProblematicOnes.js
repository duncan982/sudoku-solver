
const emptyRowOrColumnOrGridIFAmongProblematicOnes = (item, problematicRowColumnOrGrid)=>{
    /** empty row/column/grid if among the problematic ones and that the value is valid but not original */

    // iterate items in problematicRowsColumnsAndGrids
    problematicRowColumnOrGrid.forEach(cordinate => {

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

                            // console.log('item before', item);
                            // console.log('item', item.index);
                            // console.log('item', item.index, 'matches above criteria')

                            // delete the invalid value that was previously added to the cordinate
                            item.value = '.'

                            // console.log('item after', item);

                          
            }else{
                // cordinate dosent match above criteria, therefore leave it as it is
                // console.log('item', item.index, 'cordinate dosent match above criteria')
                item.value = item.value
            };

        });

        return item
};

module.exports =  emptyRowOrColumnOrGridIFAmongProblematicOnes;