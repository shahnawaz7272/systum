import { GameState } from "../../../store/store";
import Token from "../Token";


type color = {
  color: string;
  specialid: string;
};

const Safearea = ({ color, specialid }: color) => {
  const tokens = GameState((s) => s.Tokens);
  const tokensHere = tokens.filter((t) => t.position === specialid);

  let classes: string;
  switch (color) {
    case "blue":
      classes = "safezone-blue bg-blue-400 relative -top-[120px] justify-center items-center";

      break;
    case "red":
      classes = "safezone-red bg-red-400 relative -top-[60px] justify-center items-center flex-col";

      break;
    case "green":
      classes = "safezone-green bg-green-400 relative flex justify-center items-center";

      break;
    case "yellow":
      classes = "safezone-yellow bg-yellow-400 relative -top-[240px] -right-[60px] justify-center items-center flex-col";

      break;

    default:
      break;
  }
  return (
    <div>
      <div className={`${classes}`}>
        {tokensHere.map((item) => (
          <Token key={item?.id} color={item?.color} spiningAni={item?.color} tokenId={item?.id} />
        ))}
      </div>
    </div>
  );
};

export default Safearea;
