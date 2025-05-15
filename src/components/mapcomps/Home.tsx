import Dice from "./Dice";
import Token from "./Token";
import { GameState } from "../../store/store";

type color = {
  color: string;
};

const Home = ({ color }: color) => {
  const tokens = GameState((s) => s.Tokens);
  const tokenofHouse = tokens.filter((t) => t.color === color);
  const Rankings = GameState((s) => s.Rankings);
  const hasCompleted = Rankings.includes(color);
  const playerRank = Rankings.findIndex((r) => r === color) + 1;
  

  console.log(Rankings)
  const diceboardposition =
    color === "red"
      ? "dice-red"
      : color === "yellow"
      ? "dice-yellow"
      : color === "green"
      ? "dice-green"
      : "dice-blue";

  return (
    <div className="House-container relative ">
      <div className={`dice-box ${diceboardposition} absolute`}>
        <Dice color={color} />
      </div>

      {hasCompleted ? (
        <div className="house-after-win inset-0 flex justify-center items-center ">
          <div
            className={`bg-${color}-500 text-white p-2 rounded-xl text-xl font-bold`}
          >
            Rank {playerRank}
          </div>
        </div>
      ) : (
        <div className={`home-box home-${color} mp:bg-black`}>
          <div className="home-inner-box">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="circle-wrapper">
                <div className={`circle-base circle-${color}`}>
                  {tokenofHouse.map((t) =>
                    t.id === index && !t.isOutofHome ? (
                      <Token
                        key={t.id}
                        color={color}
                        spiningAni={color}
                        tokenId={index}
                      />
                    ) : null
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
