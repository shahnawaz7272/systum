import { GameState } from "../../../store/store";
import Token from "../Token";

type color = {
  color: string;
  specialid: string;
};

const Safearea = ({ color, specialid }: color) => {
  const tokens = GameState((s) => s.Tokens);
  const tokensHere = tokens.filter((t) => t.position === specialid);

  return (
    <div className={`safezone-${color}`}>
      {tokensHere.map((item) => (
        <Token
          key={item?.id}
          color={item?.color}
          spiningAni={item?.color}
          tokenId={item?.id}
        />
      ))}
    </div>
  );
};

export default Safearea;
