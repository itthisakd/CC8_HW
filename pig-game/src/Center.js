import { useState } from "react";

function Center() {
    const [diceValue, setDiceValue] = useState(1)

    function handleNewGame() {
        console.log("new game")
    }

    function handleRollDice() {
        setDiceValue(Math.floor(Math.random() * 6) + 1)
        console.log("roll")
    }

    function handleHold() {
        console.log("hold")
    }

    return (
      <div className="center-box container">
        <div className="button-container block">
          <button className="new-game block subblock" onClick={handleNewGame()}>NEW GAME</button>
        </div>
        <div className="dice-holder block">O</div>
        <div className="button-container block">
          <button class="roll-dice subblock" onClick={handleRollDice()}>ROLL DICE</button>
          <button class="hold subblock"onClick={handleHold()}>HOLD</button>
        </div>
      </div>
    );
}

export default Center