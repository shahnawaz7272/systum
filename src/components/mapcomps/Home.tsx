import Dice from "./Dice";
import Token from "./Token";
import { GameState } from "../../store/store";

type color = {
  color: string;
};

const Home = ({ color }: color) => {
  const tokens = GameState((s) => s.Tokens);
  const tokenofHouse = tokens.filter((t) => t.color === color);

  let diceboardposition: string;

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
      <div
        className={`bg-red-200 h-[120px] w-[120px] absolute ${diceboardposition} flex justify-center items-center`}
      >
        <Dice color={color} />
      </div>

      <div className={`bg-${color}-400 h-[240px] w-[240px] flex justify-center items-center`}>
        <div className="bg-white h-[160px] w-[160px] flex flex-wrap">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="circles-container h-20 w-20 flex justify-center items-center">
              <div className={`bg-${color}-400 h-10 w-10 rounded-4xl`}>
                {tokenofHouse.map((t) =>
                  t.id === index && !t.isOutofHome ? (
                    <Token color={color} spiningAni={color} tokenId={index} />
                  ) : null
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
