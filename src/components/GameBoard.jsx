export default function GameBoard({ onSelectSquare, board }) {

  // const [ gameBoard, setGameBoard ] = useState(initialGameBoard);

  // function handleSelectSquare(rowIndex, colIndex){
  //     setGameBoard((prevGameBoard) => { //prevGameBoard is set automatically by React with the set state function. Is set to the current value of the state, in this case will be initialGameBoard (a 2 dimensional array)

  //         //If the state we are working with is an object or an array, React recommends to create a copy of it instead of making changes directly to the object or array.
  //         //make a copy of the previousGameBoard, use map to also create a copy of the nested arrays
  //         let updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
  //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
  //         return updatedBoard;
  //     })

  //     onSelectSquare();
  // };

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map(
              (
                playerSymbol,
                colIndex //playerSymbol is the column in fact. which its value is null or X or O.
              ) => (
                <li key={colIndex}>
                  <button
                    onClick={() => onSelectSquare(rowIndex, colIndex)}
                    disabled={playerSymbol !== null}
                  >
                    {playerSymbol}
                  </button>
                </li>
              )
            )}
          </ol>
        </li>
      ))}
    </ol>
  );
}
