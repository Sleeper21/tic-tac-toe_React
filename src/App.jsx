import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayerSymbol = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayerSymbol = "O";
  }
  return currentPlayerSymbol;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  //const [activePlayer, setActivePlayer] = useState("X");

  const activePlayerSymbol = deriveActivePlayer(gameTurns);
  // Below we need to create a copy of the initial gameboard. for that to copy everything we need to map so it copies also the inner arrays in the array. (cols and rows). This is needed so we have always an empty board scheme that we can use to restart game and set the gameboard back to empty.
  let gameBoard = [...initialGameBoard.map(innerArray => [...innerArray])];
  let winner;

  
  for (const turn of gameTurns) {
    //With this if gameTurns is an empty array (no turns yet were played) this loop does not run. because we set the initial useState to empty. Which is good.
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  //Check if there is a win
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = firstSquareSymbol;
    }
  }

  //Check if draw
  const hasDraw = gameTurns.length === 9 && !winner;

  //Alternative way to check if there is a win

  // for (let combination of WINNING_COMBINATIONS) {
  //   let squareSymbols = [null, null, null];
  //   for (let i = 0; i < squareSymbols.length; i++) {
  //     squareSymbols[i] = gameBoard[combination[i].row][combination[i].column];
  //   }
  //   let joinedLine = squareSymbols.join("");
  //   if (joinedLine === "XXX") {
  //     winner = "X";
  //   } else if (joinedLine === "OOO") {
  //     winner = "O";
  //   }
  // }

  function handleSelectedSquare(rowIndex, colIndex) {
    //setActivePlayer((currentPlayer) => (currentPlayer === "X" ? "O" : "X"));

    setGameTurns((prevTurns) => {
      const currentPlayerSymbol = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayerSymbol,
        },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

   //Rematch button function
   function handleRestart(){
    setGameTurns([]);
   }


  return (
    <main>
      <div id="game-container">
        {/* Players name fields */}
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player1"
            symbol="X"
            isActive={activePlayerSymbol === "X"}
          />
          <Player
            initialName="Player2"
            symbol="O"
            isActive={activePlayerSymbol === "O"}
          />
        </ol>
        {/* Game Board */}

        {/* Bellow reads: if there is winner or hasDrawn is true, execute the component */}
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        
        <GameBoard
          onSelectSquare={handleSelectedSquare}
          activePlayerSymbol={activePlayerSymbol}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} player={activePlayerSymbol} />
    </main>
  );
}

export default App;
