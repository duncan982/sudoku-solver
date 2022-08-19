const checkToDetectIssues = (checks) => {
  /** check to detect if there are issues with row, column, grid and puzzle */
  // console.log("checks", checks);

  let response = {}; //an object to hold response
  let conflicts = []; //array to hold unsolved issues

  for (const [key, value] of Object.entries(checks)) {
    /** iterates checks to detect issues if any */
    if (value === true) {
      // response["valid"] = false;
      if (key === "checkRowPlacement") {
        // value is present in row
        conflicts.push("row");
      } else if (key === "checkColPlacement") {
        // value is present in col
        conflicts.push("column");
      } else if (key === "checkRegionPlacement") {
        // value is present in grid
        conflicts.push("region");
      }
      if (key === "isValueIsValidButAlreadyAddedToPuzzle") {
        response["isValueIsValidButAlreadyAddedToPuzzle"] = true;
      }
      // else if (key === "validate") {
      //   // puzzle is not complete
      //   conflicts.push("puzzle");
      // }
    }
  }

  // include conflicts if any
  if (conflicts.length > 0) {
    response["valid"] = false;
    response["conflict"] = conflicts; // include list of conflicts into response
  } else {
    response["valid"] = true;
    // response["conflict"] = []; // include list of conflicts into response as none
  }

  // console.log("response in checkToDetectIssues.js", response);
  return response;
};

module.exports = checkToDetectIssues;
