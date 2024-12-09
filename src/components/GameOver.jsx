export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {/* if winner renders the paragraph */}
      {winner && <p>{winner} won!</p>}

      {/* if winner is undefined */}
      {!winner && (<p>It's a Draw!</p>)}


        <p>
          <button onClick={onRestart}>Rematch!</button>
        </p>
      
    </div>
  );
}
