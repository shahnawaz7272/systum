import Dice from "./Dice";
import Token from "./Token";

// Define the props type
type color = {
  color: string; // Expects Tailwind color class like 'bg-red-400'
};

// Functional component for each player's colored house
const House = ({ color }: color) => {
  // Variable to set dice position based on the player's color
  let diceboardposition: string;
  let colorfordice:string

  // Dynamically assign dice box position based on color
  switch (color) {
    case "bg-red-400":
      diceboardposition = "-left-[120px]";
      colorfordice="red"
      break;
    case "bg-yellow-400":
      diceboardposition = "-right-[120px] top-[120px]";
      colorfordice="yellow"
      break;
    case "bg-green-400":
      diceboardposition = "-right-[120px]";
      colorfordice="green"
      break;
    case "bg-blue-400":
      diceboardposition = "-left-[120px] top-[120px]";
      colorfordice="blue"
      break;
  }

  return (
    <div className="House-container relative">
      {/* Dice box - appears outside of the house in a specific position */}
      <div
        className={`bg-red-200 h-[120px] w-[120px] absolute ${diceboardposition} flex justify-center items-center`}
      >
        <Dice colors={colorfordice}/>
      </div>

      {/* Main square (house) with player color */}
      <div
        className={`${color} h-[240px] w-[240px] flex justify-center items-center`}
      >
        {/* White area inside house containing 4 gotis */}
        <div className="bg-white h-[160px] w-[160px] flex flex-wrap">
          {/* Each Goti (Token) slot - 2x2 grid */}
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="circles-container h-20 w-20 flex justify-center items-center"
            >
              {/* Token with player color and circular shape */}
              <div className={`${color} h-10 w-10 rounded-4xl`}>
                <Token color={color} spiningAni={colorfordice} tokenId={index}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default House;
