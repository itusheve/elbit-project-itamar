import { useContext } from 'react';
import { GameContext } from '../../contexts/WarGameContext';
import { Player } from '../../components/Player';
import { GameStateEnum } from '../../interfaces';

const GameBoard = () => {
  const {
    player1Cards,
    player2Cards,
    player1Card,
    player2Card,
    gameLog,
    gameState,
    startGame,
    winner,
    drawCards,
  } = useContext(GameContext);

  if (gameState === GameStateEnum.notStarted) {
    return <button onClick={startGame}>Start Game</button>;
  }


  return (
    <>
     {gameState === GameStateEnum.finished && (<div><h2 className='game-over'>Game Over!</h2> <br/> <button onClick={startGame}>Restart Game</button></div>)}
     
    <div className='decks-container'>
      <div className='deck'>
        <h2>{player1Cards.length} cards</h2>
        {player1Card && (
          <div>
            <Player name='Player 1' card={player1Card} winner={winner=='player1'}/>
          </div>
        )}
      </div>
      <div className='deck'>
        <h2>{player2Cards.length} cards</h2>
        {player2Card && (
           <div>
           <Player name='Player 2' card={player2Card} winner={winner=='player2'}/>
         </div>
        )}
      </div>
      <button onClick={drawCards} disabled={gameState!==GameStateEnum.inProgress}>Draw Cards</button>
      <div className='game-log'>
        <h2>Game Log</h2>
        <ul>
          {gameLog.map((log:string, index:number) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
     

    </div>
    </>
  );
};

export default GameBoard;
