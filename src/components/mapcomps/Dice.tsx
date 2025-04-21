import { useState } from "react";
import { GameState } from "../../store/store";
// import { tokenState } from "../../store/store";

type color = {
  colors: string;
};

const Dice = ({ colors }: color) => {
  const Turn = GameState((state) => state.Turn);
  const rollDice = GameState((state) => state.rollDice);
  const NumberOnDice = GameState((state) => state.NumberOnDice);
  const nextTurn = GameState((state) => state.nextTurn);
  const sethasrolled = GameState((state) => state.sethasRolled);
  const hasrolled = GameState((state) => state.hasrolled);
  // const color = tokenState((state) => state.color);
  // const setColor = tokenState((state) => state.setColor);

  const [isRolling, setIsRolling] = useState(false);

  // ⛔ Early return must come AFTER all hooks
  if (Turn !== colors) return null;

  const diceroll = () => {
    console.log("click");
    if (hasrolled) {
      console.log("tru ho gya")
       
    }
    else {
      setIsRolling(true);
      let steps = rollDice();
      console.log("new dice value:", steps);

      if (steps == 6) {
        console.log("inside 6s");
        sethasrolled();
        console.log(hasrolled ,35)
        setTimeout(() => {
          setIsRolling(false);
        }, 1000);
      } else {
        sethasrolled();
        console.log(hasrolled ,41)
        setTimeout(() => {
          setIsRolling(false);
        }, 1000);
        setTimeout(() => {
          nextTurn();
        }, 5000);
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
            <div
              key={index}
              className={`numberonthedice flex h-[25px] w-[30px] ${fiveDotStyles[index]}`}
            >
              <div className="h-3 w-3 bg-black rounded-full"></div>
            </div>
          );
        }

        return (
          <div
            key={index}
            className="numberonthedice flex justify-center items-center h-[25px] w-[30px]"
          >
            <div className="h-3 w-3 bg-black rounded-full"></div>
          </div>
        );
      })}
    </div>
  );
};

export default Dice;
