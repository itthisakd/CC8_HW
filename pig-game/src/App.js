import './App.css';
import Player from "./Player.js"
import Center from "./Center.js"

function App() {
  
  return (
    <div className="app">
      <Player id="player1" />
      <Center />
      <Player id="player2" />
    </div>
  );
}

export default App;
