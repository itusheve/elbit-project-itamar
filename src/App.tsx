import { GameProvider } from './contexts/WarGameContext';
import GameBoard from './games/wargame/GameBoard';
import './App.css'

 const App = () => {
  return (
    <GameProvider>
      <div className="App">
        <h1>War Card Game</h1>
        <GameBoard />
      </div>
    </GameProvider>
  );
};
export default App;
 
