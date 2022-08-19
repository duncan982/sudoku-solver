

const checkIfvalueIsPresentMoreThanOnce = (object) => {

  let valueIsPresentMoreThanOnce;
  let checkResults = [];

  for (const[keys, values] of Object.entries(object)) {

    let posibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let j = 0; j < posibleValues.length; j++) {
      let regex = new RegExp(`${posibleValues[j]}`, "g");
      // console.log('regex', regex)
      if ((values.match(regex) || []).length > 1) {
        checkResults.push({keys: keys, values: values, value: posibleValues[j]})
      }
    }
  }

  // console.log('checkResults', checkResults);

  if(checkResults.length > 0){
    valueIsPresentMoreThanOnce = true;
  }else{
    valueIsPresentMoreThanOnce = false
  }
  // console.log(valueIsPresentMoreThanOnce);
  return valueIsPresentMoreThanOnce;
};

module.exports = checkIfvalueIsPresentMoreThanOnce;
