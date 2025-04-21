import Dice from "./Dice";
import Token from "./Token";
import { GameState } from "../../store/store";

// Define the props type
type color = {
  color: string; // Expects Tailwind color class like 'bg-red-400'
};

// Functional component for each player's colored house
const House = ({ color }: color) => {
  // Variable to set dice position based on the player's color
    const tokens = GameState((s) => s.Tokens);
    const tokenofHouse = tokens.filter((t)=>(t.color==color))
  let diceboardposition: string;

  // Dynamically assign dice box position based on color
  switch (color) {
    case "red":
      diceboardposition = "-left-[120px]";
      break;
    case "yellow":
      diceboardposition = "-right-[120px] top-[120px]";
      break;
    case "green":
      diceboardposition = "-right-[120px]";
      break;
    case "blue":
      diceboardposition = "-left-[120px] top-[120px]";
      break;
  }

  return (
    <div className="House-container relative">
      {/* Dice box - appears outside of the house in a specific position */}
      <div
        className={`bg-red-200 h-[120px] w-[120px] absolute ${diceboardposition} flex justify-center items-center`}
      >
        <Dice colors={color}/>
      </div>

      {/* Main square (house) with player color */}
      <div
        className={`bg-${color}-400 h-[240px] w-[240px] flex justify-center items-center`}
      >
        {/* White area inside house containing 4 gotis */}
        <div className="bg-white h-[160px] w-[160px] flex flex-wrap">
          {/* Each Goti (Token) slot - 2x2 grid */}
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="circles-container h-20 w-20 flex justify-center items-center"
            >
              {index}
              {/* Token with player color and circular shape */}
              <div className={`bg-${color}-400 h-10 w-10 rounded-4xl`}>
                {/* <Token color={color} spiningAni={color} tokenId={index}/> */}
                {tokenofHouse.map((t)=>(t.id==index && t.isOutofHome==false ? <Token color={color} spiningAni={color} tokenId={index}/>:null))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default House;
