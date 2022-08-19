const checkIfValueIsValid = (value, row, column, markedPuzzle) => {
    /** check if value is not in the list of invalid values for the curret cordinate */
    // console.log(markedPuzzle)

    let testCordinate

    markedPuzzle.map(cordinate => {
        // select cordinate matching current row and column
        cordinate.row === row && cordinate.column === column ? testCordinate = cordinate : 'it doesnt matter';
    });

    // console.log(testCordinate);

    let isValueValid

    if(testCordinate && testCordinate.invalidValues.length > 0){
        // check if there is a matching cordinate and if it has list of invalid values

        // console.log(testCordinate);

        // check if value is among the invalid values
        testCordinate.invalidValues.includes(`${value}`) ? isValueValid = false : isValueValid = true;

    }else{
        // there is no matching cordinate or if it there is, it does not have a list of invalid values
        isValueValid = 'not applicable';
    }

    // console.log('isValueValid', isValueValid);
    return isValueValid
}

module.exports = checkIfValueIsValid