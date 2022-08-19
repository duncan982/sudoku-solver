/*generate rows*/
const generateRows = (string) => {
  // create object to hold row, colum and grid key value pairs
  // let results = {};

  let splittedString = string.match(/.{1,9}/g); // split string every 9th character
  // console.log('rows', rows);

  let rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]; // create rows for iteration
  let ranks = {}; // create an object to hold rows keys value pairs

  for (let i = 0; i < rows.length; i++) {
    let row = rows[i]; // select row

    let rowValues = splittedString[rows.indexOf(row)]; // subset splitted string based on row index
    ranks[row] = rowValues; // add row and its value to ranks objects
  }
  return ranks;
  // console.log('ranks', ranks)
};

module.exports = generateRows;
