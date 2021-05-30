import { useState } from "react";

function Player(props) {
  // const [playerScore, setPlayerScore] = useState(0)
  // const [current, setCurrent] = useState(0)

  return (
    <div className="player-box container" id={props.id}>
      <div className="player-container block">
        <div className="player-label subblock">PLAYER 1</div>
        <div className="player-score subblock">0</div>
      </div>
      <div className="current-container block">
        <div className="current-label subblock">CURRENT</div>
        <div className="current subblock">0</div>
      </div>
    </div>
  );
}

export default Player;
