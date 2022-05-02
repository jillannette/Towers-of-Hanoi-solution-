let gameBoard = {
  pegs: [[5, 4, 3, 2, 1], [], [],],
  plays: 0,
  originalPegs: null,
  moveDisc (fromPeg, toPeg) {
    if (this.plays === 0) {
      this.originalPegs = this.createOriginalPegs();
    }


    const fromPegArray = this.pegs[fromPeg];
    const toPegArray = this.pegs[toPeg];

    const fromPegDisc = fromPegArray[fromPegArray.length - 1];
    const toPegDisc = toPegArray[toPegArray.length - 1];

     if (fromPegDisc > toPegDisc || fromPegDisc === undefined) {
      console.log("Move denied. Try again.");
    } else {
      fromPegArray.splice(fromPegArray.length-1, 1);
      toPegArray.push(fromPegDisc);
    }

    this.plays += 1;
    this.printPlays();
    this.printBoard();
    this.checkWinner();
    },

    checkWinner () {
      const originalPegsFirstPegLength = this.originalPegs[0].length;
      const currentPegsLastPegLength = this.pegs[this.pegs.length-1].length;

      if (originalPegsFirstPegLength === currentPegsLastPegLength) {
        console.log(`You won and it only took you ${this.plays} plays!`);
          this.resetBoard();
        }
      },
     createOriginalPegs () {
       return this.pegs.map(function (peg) {
         return peg.map(function (disc) {
           return disc;
         });
       });
     },
     resetBoard () {
       this.pegs = [...this.originalPegs];
       this.plays = 0;
     },
    printBoard() {
      const printedBoard = this.pegs.map(function (peg) {
        return `---${peg.map(function (disc) {
          return ` ${disc}`;
        })}`;
      });

      const loggedBoard = printedBoard.reduce(function (acc, arr) {
        let str = acc;
        return (str += `${arr}\n`);
      }, '');

      console.log(loggedBoard);
      },
      printPlays() {
        console.log(`This is play number ${this.plays}`);
      },
    };
    gameBoard.moveDisc(0, 1);
