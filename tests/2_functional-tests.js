const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");
const Solver = require("../controllers/sudoku-solver");
const solver = new Solver();

chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout("120s");
  suite("Integration tests with chai-http", () => {
    test("#1 Solve a puzzle with valid puzzle string: POST request to /api/solve", (done) => {
      let inCompleteValidVPuzzle =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: inCompleteValidVPuzzle })
        .end(function (err, res) {
          const { solution } = res.body;
          // console.log(res.body);
          // console.log(solution);
          assert.equal(res.status, 200);
          assert.isTrue(solver.validate(solution));
          done();
        });
    });

    test("#2 Solve a puzzle with missing puzzle string: POST request to /api/solve", (done) => {
      let puzzle;
      chai
        .request(server)
        .post("/api/solve")
        .send({ notPuzzle: puzzle })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepInclude(res.text, "Required field missing");
          // assert.deepEqual(res.text, { error: "Required field missing" });
          done();
        });
    });

    test("#3 Solve a puzzle with invalid characters: POST request to /api/solve", (done) => {
      let inValidPuzzle =
        "AA9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: inValidPuzzle })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepInclude(res.text, "Invalid characters in puzzle");
          done();
        });
    });

    test("#4 Solve a puzzle with incorrect length: POST request to /api/solve", (done) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({
          puzzle:
            "..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepInclude(
            res.text,
            "Expected puzzle to be 81 characters long"
          );
          done();
        });
    });

    test("#5 Solve a puzzle that cannot be solved: POST request to /api/solve", (done) => {
      let unsolveAblePuzzle = ""; // needs work
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: unsolveAblePuzzle })
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });

    test("#6 Check a puzzle placement with all fields: POST request to /api/check", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle:
            "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          coordinate: "A1",
          value: "7"
        })
        .end((err, res) => {
          // console.log(res.body);
          assert.equal(res.status, 200);
          assert.deepInclude(res.text, true);
          done();
        });
    });

    test("#7 Check a puzzle placement with single placement conflict: POST request to /api/check", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle:
            "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          coordinate: "A1",
          value: "4"
        })
        .end((err, res) => {
          // console.log(res.body);
          assert.equal(res.status, 200);
          assert.isFalse(res.body.valid);
          done();
        });
    });

    test("#8 Check a puzzle placement with multiple placement conflicts: POST request to /api/check", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle:
            "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          coordinate: "B1",
          value: "5"
        })
        .end((err, res) => {
          // console.log(res.body);
          assert.equal(res.status, 200);
          assert.isFalse(res.body.valid);
          done();
        });
    });

    test("#9 Check a puzzle placement with all placement conflicts: POST request to /api/check", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle:
            "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          coordinate: "B1",
          value: "5"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isFalse(res.body.valid);
          done();
        });
    });

    test("#10 Check a puzzle placement with missing required fields: POST request to /api/check", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepInclude(res.text, "Required field(s) missing");
          done();
        });
    });

    test("#11 Check a puzzle placement with invalid characters: POST request to /api/check", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle:
            "AB9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          coordinate: "A3",
          value: "9"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepInclude(res.text, "Invalid characters in puzzle");
          done();
        });
    });

    test("#12 Check a puzzle placement with incorrect length: POST request to /api/check", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle:
            "..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          coordinate: "A3",
          value: "9"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepInclude(
            res.text,
            "Expected puzzle to be 81 characters long"
          );
          done();
        });
    });

    test("#13 Check a puzzle placement with invalid placement coordinate: POST request to /api/check", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle:
            ".....5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          coordinate: "M3",
          value: "9"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepInclude(res.text, "Invalid coordinate");
          done();
        });
    });

    test("#14 Check a puzzle placement with invalid placement value: POST request to /api/check", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle:
            ".....5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          coordinate: "B3",
          value: "0"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.deepInclude(res.text, "Invalid value");
          done();
        });
    });

    test("#15 Attempt to solve an invalid puzzle", (done) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({
          puzzle:
            "9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.."
        })
        .end((err, res) => {
          // console.log(res.body);
          // assert.equal(res.status, 500);
          assert.equal(res.status, 200);
          assert.deepInclude(res.text, "Puzzle cannot be solved");
          done();
        });
    });

    test("#16 If value submitted to /api/check is already placed in puzzle on that coordinate", (done) => {
      chai
        .request(server)
        .post("/api/check")
        .send({
          puzzle:
            "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
          coordinate: "C3",
          value: "2"
        })
        .end((err, res) => {
          // console.log(res.body);
          assert.equal(res.status, 200);
          assert.isTrue(res.body.valid);
          done();
        });
    });
  });
});
