import { useState } from "react";
import { GameState } from "../../store/store";
// import { tokenState } from "../../store/store";

type color = {
  color: string;
};

const Dice = ({ color }: color) => {
  const Turn = GameState((state) => state.Turn);
  const rollDice = GameState((state) => state.rollDice);
  const NumberOnDice = GameState((state) => state.NumberOnDice);
  const nextTurn = GameState((state) => state.nextTurn);
  const sethasrolled = GameState((state) => state.sethasRolled);
  const hasrolled = GameState((state) => state.hasrolled);
  const Tokens = GameState((state) => state.Tokens);

  const TokensOfThisColor = Tokens.filter((t) => t.color == Turn);
  const IsAllTokensinHome = TokensOfThisColor.filter((t) => t.position === 'home');

  // const color = tokenState((state) => state.color);
  // const setColor = tokenState((state) => state.setColor);
  const [isRolling, setIsRolling] = useState(false);
  console.log(Tokens)
  // Early return must come AFTER all hooks
  if (Turn !== color) return null;
  console.log(Turn)
  const diceroll = () => {
    console.log("click");
    if (hasrolled) return; // block from double clicking dice
    // here how dice works
    setIsRolling(true); // this is dice roll Animation
    let steps = rollDice();
    console.log("new dice value:", steps);

    if (steps == 6) {
      sethasrolled();
      setTimeout(() => {
        setIsRolling(false);
      }, 1000);
    } else {
      if (IsAllTokensinHome.length === 4) {
        // if all tokens in house pass turn if no 6
        setTimeout(() => {
          setIsRolling(false);
          nextTurn();
        }, 1000);
      } else {
        console.log(IsAllTokensinHome);
        sethasrolled();
        setTimeout(() => {
          setIsRolling(false);
        }, 1000);
      }
    }
  };
  const delayingnum = NumberOnDice;
  const dicerollarr = Array(delayingnum).fill(null);

  return (
    <div
      className={`bg-white h-[75px] w-[75px] rounded-[8px] shadow-md 
        flex justify-center items-center flex-wrap cursor-pointer 
        transition-transform duration-300 
        ${isRolling ? "rotate-[20deg] scale-110" : ""}`}
      onClick={diceroll}
    >
      {dicerollarr.map((_, index) => {
        if (NumberOnDice === 5) {
          const fiveDotStyles = [
            "justify-start items-start", // top-left
            "justify-end items-start", // top-right
            "justify-center items-center w-[46px]", // center
            "justify-start items-end", // bottom-left
            "justify-end items-end", // bottom-right
          ];

          return (
            <div key={index} className={`numberonthedice flex h-[25px] w-[30px] ${fiveDotStyles[index]}`}>
              <div className="h-3 w-3 bg-black rounded-full"></div>
            </div>
          );
        }

        return (
          <div key={index} className="numberonthedice flex justify-center items-center h-[25px] w-[30px]">
            <div className="h-3 w-3 bg-black rounded-full"></div>
          </div>
        );
      })}
    </div>
  );
};

export default Dice;
