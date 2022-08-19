const checkIfConflictIsRowColumnOrGrid = (item) => {

     // item.conflicts ? console.log('item.conflicts', item.conflicts) : console.log('item.conflicts is not found');

    let problematicRowsColumnsAndGrids = [] // collect the conflicting row/column/grid

     if(item.value === '.' && [0] && item.conflicts[0].isValueAlreadyInRow &&
      item.conflicts[0].isValueAlreadyInColumn &&
       item.conflicts[0].isValueAlreadyInGrids){
          // check if the conflict lies on row, column and grid values, if it is collect the row, column grid and the indicated possible value // 7
          
          problematicRowsColumnsAndGrids.push({row: item.row, column: item.column, grid: item.grid, 
               invalidValue: item.conflicts[0].possibleValue, cordinate: item.conflicts[0].cordinate});
     }else if(item.value === '.' && [0] && item.conflicts[0].isValueAlreadyInRow && item.conflicts[0].isValueAlreadyInColumn){
       // check if the conflict lies on row and column values, if it is collect the row, column and the indicated possible value //4

       problematicRowsColumnsAndGrids.push({
          row: item.row, column: item.column, grid: '', invalidValue: item.conflicts[0].possibleValue, cordinate: item.conflicts[0].cordinate});
     }else if(item.value === '.' && [0] && item.conflicts[0].isValueAlreadyInRow && item.conflicts[0].isValueAlreadyInGrids){
          // check if the conflict lies on row and grid values, if it is collect the row, grid and the indicated possible value // 5

          problematicRowsColumnsAndGrids.push({
               row: item.row, column: "", grid: item.grid, invalidValue: item.conflicts[0].possibleValue, cordinate: item.conflicts[0].cordinate})

     }else if(item.value === '.' && item.conflicts[0].isValueAlreadyInColumn &&  item.conflicts[0].isValueAlreadyInGrids){
          // check if the conflict lies on column and grid values, if it is collect the column, grid and the indicated possible value // 6

          problematicRowsColumnsAndGrids.push({
               row: "", column: item.column, grid: item.grid, invalidValue: item.conflicts[0].possibleValue,
                cordinate: item.conflicts[0].cordinate}) 

     }else if(item.value === '.' && item.conflicts[0].isValueAlreadyInRow){
          // check if the conflict lies on row values, if it is collect the row and the indicated possible value //1
          problematicRowsColumnsAndGrids.push({
               row: item.row, column: '', grid: '', invalidValue: item.conflicts[0].possibleValue, cordinate: item.conflicts[0].cordinate})
     }else if(item.value === '.' && item.conflicts[0].isValueAlreadyInColumn){
          // check if the conflict lies on column values, if it is collect the column and the indicated possible value //2
          problematicRowsColumnsAndGrids.push({
               row: "", column: item.column, grid: '', invalidValue: item.conflicts[0].possibleValue, cordinate: item.conflicts[0].cordinate})
     }else if(item.value === '.' && item.conflicts[0].isValueAlreadyInGrids){
          // check if the conflict lies on grid values, if it is collect the grid and the indicated possible value //3
          problematicRowsColumnsAndGrids.push({
               row: "", column: "", grid: item.grid, invalidValue: item.conflicts[0].possibleValue, cordinate: item.conflicts[0].cordinate})
     };
         
    return problematicRowsColumnsAndGrids;
};

module.exports = checkIfConflictIsRowColumnOrGrid