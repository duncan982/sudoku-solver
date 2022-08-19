/*generate Columns*/

const generateColumns = (ranks) => {
  // let stack

  const generateStacks = (stack, ranks) => {
    let index = stack - 1;
    let desiredStack = ""; // create an empty string to hold stack values
    for (const [key, value] of Object.entries(ranks)) {
      // iterate object containing rows
      let stackValue = ranks[key][index]; // subet rows based on column index
      desiredStack = desiredStack + stackValue; // add values to string of stack values
    }

    return desiredStack; // return array of stack values
  };

  let columns = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // create columns to iterate

  let stacks = {}; // create an object to hold columns keys and values

  for (let i = 0; i < columns.length; i++) {
    // iterate rows based on columns
    let column = columns[i]; // select colon to iterate
    // console.log('column', column)
    let generatedStack = generateStacks(column, ranks); // generate value of column at nth row
    // console.log('generatedStack', generatedStack)
    stacks[column] = generatedStack; // add column and its value to columns object
  }
  // console.log('stacks', stacks)

  return stacks;
};

module.exports = generateColumns;
