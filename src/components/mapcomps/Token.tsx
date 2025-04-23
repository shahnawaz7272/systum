import { GameState } from "../../store/store";

type TokenProps = {
  color?: string;
  spiningAni?: string;
  tokenId?: number;
};

const Token = ({ color, spiningAni, tokenId }: TokenProps) => {
  const Turn = GameState((state) => state.Turn);
  const nextTurn = GameState((state) => state.nextTurn);
  const setHasRolled = GameState((state) => state.sethasRolled);
  const NumberOnDice = GameState((state) => state.NumberOnDice);
  const hasRolled = GameState((state) => state.hasrolled);
  const tokens = GameState((state) => state.Tokens);
  const moveOutFromHome = GameState((state) => state.moveOutFromHome);
  const moveToken = GameState((state) => state.moveToken);

  const token = tokens.find((t) => t.id === tokenId && t.color === color);
  const tokenPosition = token?.position;
  const shouldSpin = spiningAni === Turn;
  const FinishingClass = tokenPosition?.includes("finish");

  const tokenHandler = () => {
    if (token?.color == color && Turn == color) {
      if (hasRolled) {
        if (token?.position === "home" && NumberOnDice === 6) {
          moveOutFromHome(tokenId, spiningAni);
          setHasRolled();
        } else if (token?.isOutofHome) {
          moveToken(tokenId, color);
          setTimeout(() => {
            nextTurn();
          }, 2000);
        } else {
          setHasRolled();
        }
      }
    }
  };

  return (
    <div
      onClick={tokenHandler}
      className={`token-container ${tokenPosition == "home" ? "relative" : "absolute"} 
        ${tokenPosition === "start" ? "top-[73px] left-[110px]" : "-top-[30px] left-2"} 
        h-[62px] w-[26px] ${FinishingClass ? "static scale-[0.6]" : "absolute"}`}
    >
      <div className="token relative z-10">
        <div className="bg-[gray] h-[25px] w-[23px] rounded-4xl flex justify-center items-center">
          <div className={`h-[18px] w-[18px] rounded-4xl bg-${color}-400 z-[1]`}></div>
        </div>
        <div className="goti-lower absolute top-[17px]"></div>
      </div>
      <div
        className={`circle h-6 w-6 border-black border-[0.5px] rounded-4xl absolute top-[38px] 
        ${shouldSpin ? "animate-ping" : ""}`}
      ></div>
    </div>
  );
};

export default Token;
