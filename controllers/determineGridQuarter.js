const gridCordinates = require("./gridCordinates.js");
const gridKeys = require("./gridKeys.js");

const determineGridQuarter = (coordinate) => {
  // determine which grid quarter the coordinate belongs to
  let detectedGridQuarter;

  for (let i = 0; i < gridCordinates.length; i++) {
    if (gridCordinates[i].split(",").includes(coordinate)) {
      let detectedGridIndex = gridCordinates.indexOf(gridCordinates[i]);
      //  console.log('detectedGridIndex', detectedGridIndex);
      detectedGridQuarter = gridKeys[detectedGridIndex];
      //  console.log(
      //    "grid keys and values",
      //    detectedGridQuarter,
      //    gridsInPuzzle[detectedGridQuarter]
      //  );
    }
  }
  return detectedGridQuarter;
};

module.exports = determineGridQuarter;
