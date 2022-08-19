const checkPuzzle = require("./checkPuzzle.js");
const solveCordinate = require("./solveCordinate V2.js");
const marksolvedPuzzle = require("./markSolvedPuzzle.js");
const reviseProblematicCordinates = require("./reviseProblematicCordinates V2.js");

const solvePuzzle = (puzzle, emptyValuesCordinates, markedOriginalPuzzle) => {
  /** solve provided puzzle */

  // add a possible digit betwee 1-9 at the selected
  const [solvedPuzzle, retainedMarkedPuzzle] = solveCordinate(
    puzzle,
    markedOriginalPuzzle,
    emptyValuesCordinates
  );
  // console.log("puzzle to be solved is", solvedPuzzle.match(/.{1,9}/g));
  // console.log("puzzle to be solved is", solvedPuzzle);
  // console.log('retainedMarkedPuzzle', retainedMarkedPuzzle)

  // check if puzzle is solved at the selected cordinate
  let isPuzzleSolved = checkPuzzle(solvedPuzzle);
  // console.log('isPuzzleSolved in solvePuzzle.js', isPuzzleSolved)
  if (isPuzzleSolved.validate === false) {
    // if it is not solved and there are still cordiantes available work on it to solve it

    // console.log("puzzle is not solved", solvedPuzzle);
    // console.log("puzzle is not solved", solvedPuzzle.match(/.{1,9}/g));

    // mark valid items that are already there in the puzzle
    let markedsolvedPuzzle = marksolvedPuzzle(
      solvedPuzzle,
      retainedMarkedPuzzle
    );
    // console.log(markedsolvedPuzzle);

    // revise problematic cordinates

    const [
      newPuzzle,
      newEmptyValuesCordinates,
      newMarkedsolvedPuzzle
    ] = reviseProblematicCordinates(markedsolvedPuzzle, solvedPuzzle);
    // const [newPuzzle, newEmptyValuesCordinates, newMarkedsolvedPuzzle] = regeneratePuzzleAndEmptyCordinates(markedsolvedPuzzle)
    // console.log('newPuzzle', newPuzzle)
    // console.log('newEmptyValuesCordinates', newEmptyValuesCordinates)
    // console.log('newMarkedsolvedPuzzle', newMarkedsolvedPuzzle[0])

    return solvePuzzle(
      newPuzzle,
      newEmptyValuesCordinates,
      newMarkedsolvedPuzzle
    );
  } else if (isPuzzleSolved.validate) {
    // if it is solved return it and exit

    console.log("puzzle is solved", solvedPuzzle);
    // console.log("puzzle is solved", solvedPuzzle.match(/.{1,9}/g));
    return solvedPuzzle;
  }
};

module.exports = solvePuzzle;
