const generateValueIndexInPuzzle = require('./generateValueIndexInPuzzle.js')

const generateEmptyCordinates = (selectedRow, row, column) => {
  /** generate empty cordinates from selected row */
  
  let emptyCordinates = []; // create a list to hold empty corrdiantes

   // generate index of value in puzzle row, column,
   let valueIndex = generateValueIndexInPuzzle(row, column)
  //  console.log('valueIndex', valueIndex)

  selectedRow.forEach((cordinate) => {

    // iterate cordinae key value pair
    for (const [keys, values] of Object.entries(cordinate)) {

      // console.log('cordinate', cordinate);

          if (values === ".") {
            // check if value at the specified cordinate is empty
            // console.log('emptyCordinate is', values);

            //confirm if key of empty cordinate is the target valueIndex 
            if(keys === `${valueIndex}`){
              // console.log('keys', keys)
              // console.log('cordinate', cordinate);
              emptyCordinates.push(cordinate);
              // console.log('emptyCordinate is', emptyCordinate)
              }
        }

    }
  });

  return emptyCordinates;
};

module.exports = generateEmptyCordinates;
