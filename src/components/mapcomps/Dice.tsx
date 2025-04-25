import { useState } from "react";
import { GameState } from "../../store/store";

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

  const TokensOfThisColor = Tokens.filter((t) => t.color === Turn);
  const IsAllTokensinHome = TokensOfThisColor.filter(
    (t) => t.position.includes(`home`) || t.position.includes(`finish${Turn.charAt(0)}`)
  );

  const [isRolling, setIsRolling] = useState(false);

  if (Turn !== color) return null;
  console.log(IsAllTokensinHome)
  const diceroll = () => {
    if (hasrolled) return;
    setIsRolling(true);
    const steps = rollDice();

    if (steps === 6) {
      sethasrolled();
      setTimeout(() => setIsRolling(false), 1000);
    } else {
      if (IsAllTokensinHome.length === 4) {
        nextTurn();
        setTimeout(() => {
          setIsRolling(false);
        }, 1000);
      } else {
        sethasrolled();
        setTimeout(() => setIsRolling(false), 1000);
      }
      
    }
  };

  const dicerollarr = Array(NumberOnDice).fill(null);

  return (
    <div
      className={`bg-white h-[75px] w-[75px] rounded-[8px] md:h-[55px] md:w-[55px] mp:w-[25px] mp:h-[25px] dice shadow-md flex justify-center items-center flex-wrap cursor-pointer transition-transform duration-300 ${
        isRolling ? "rotate-[20deg] scale-110" : ""
      }`}
      onClick={diceroll}
    >
      {dicerollarr.map((_, index) => {
        if (NumberOnDice === 5) {
          const fiveDotStyles = [
            "justify-start items-start",
            "justify-end items-start",
            "justify-center items-center w-[46px] dicedot5",
            "justify-start items-end",
            "justify-end items-end",
          ];
          return (
            <div key={index} className={`numberonthedice flex h-[25px] w-[30px] md:w-[15px] md:-h-[17px] mp:w-[5px] mp:h-[7px] ${fiveDotStyles[index]}`}>
              <div className="dicedot h-3 w-3 bg-black rounded-full"></div>
            </div>
          );
        }
        return (
          <div key={index} className="numberonthedice flex justify-center items-center h-[25px] w-[30px]">
            <div className=" dicedot h-3 w-3 bg-black rounded-full"></div>
          </div>
        );
      })}
    </div>
  );
};

export default Dice;
