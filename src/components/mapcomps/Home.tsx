import Dice from "./Dice";
import Token from "./Token";
import { GameState } from "../../store/store";

type color = {
  color: string;
};

const Home = ({ color }: color) => {
  const tokens = GameState((s) => s.Tokens);
  const tokenofHouse = tokens.filter((t) => t.color === color);

  let diceboardposition: any;

  switch (color) {
    case "red":
      diceboardposition = "dice-red";
      break;
    case "yellow":
      diceboardposition = "dice-yellow";
      break;
    case "green":
      diceboardposition = "dice-green";
      break;
    case "blue":
      diceboardposition = "dice-blue";
      break;
  }

  return (
    <div className="House-container relative">
      <div className={`dice-box ${diceboardposition} absolute`}>
        <Dice color={color} />
      </div>

      <div className={`home-box home-${color}`}>
        <div className="home-inner-box">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="circle-wrapper">
              <div className={`circle-base circle-${color}`}>
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
