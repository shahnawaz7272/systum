import { useState } from "react";

const Dice = () => {
  // State to store the dice number (1 to 6)
  const [nod, setnod] = useState(1);

  // State to control animation during dice roll
  const [isRolling, setIsRolling] = useState(false);

  // Function to handle dice roll
  const diceroll = () => {
    console.log("click");

    // Trigger animation
    setIsRolling(true);

    // Generate random dice number between 1 and 6
    let randomvalue = Math.floor(Math.random() * 6 + 1);
    setnod(randomvalue);
    console.log("new dice value:", randomvalue);

    // Stop animation after 300ms
    setTimeout(() => {
      setIsRolling(false);
    }, 300);
  };

  // Create an array equal to number of dots to render
  const dicerollarr = Array(nod).fill(null);

  return (
    // Dice box container
    <div
      className={`bg-white h-[75px] w-[75px] rounded-[8px] shadow-md 
      flex justify-center items-center flex-wrap cursor-pointer 
      transition-transform duration-300 
      ${isRolling ? "rotate-[20deg] scale-110" : ""}`}
      onClick={diceroll}
    >
      {/* Render dice dots */}
      {dicerollarr.map((_, index) => {
        // Special layout only for dice value 5
        if (nod === 5) {
          const fiveDotStyles = [
            "justify-start items-start",     // top-left
            "justify-end items-start",       // top-right
            "justify-center items-center w-[46px]",   // center
            "justify-start items-end",       // bottom-left
            "justify-end items-end",         // bottom-right
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

        // Default layout for all other numbers
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
