import { GameState } from "../../store/store";

type TokenProps = {
  color?: string;
  spiningAni?: string;
  tokenId: number;
};

const Token = ({ color, spiningAni, tokenId }: TokenProps) => {
  // Zustand store selectors
  const Turn = GameState((state) => state.Turn);
  const nextTurn = GameState((state) => state.nextTurn);
  const setHasRolled = GameState((state) => state.sethasRolled);
  const NumberOnDice = GameState((state) => state.NumberOnDice);
  const hasRolled = GameState((state) => state.hasrolled);
  const tokens = GameState((state) => state.Tokens);
  const moveOutFromHome = GameState((state) => state.moveOutFromHome);
  const moveToken = GameState((state) => state.moveToken);
  const istokenmoved = GameState((state) => state.istokenmoved);
  const setistokenmoved = GameState((state) => state.setistokenmoved);

  // Find the token object
  const token = tokens.find((t) => t.id === tokenId && t.color === color);
  const tokenPosition = token?.position;
  const shouldSpin = spiningAni === Turn;
  const isInFinishZone = tokenPosition?.includes("finish");

  const bgClass = token?.color === "blue" || token?.color === "green" ? "token-finished-container-grn-blu" : "token-finished-container";

  const tokenHandler = () => {
    if (!token || !color || Turn !== color || istokenmoved) return;

    if (!hasRolled) return;

    if (token.position === "home") {
      if (NumberOnDice === 6) {
        // Move token out of home
        moveOutFromHome(tokenId, color);
      }

      // Reset dice state whether moved or not
      setHasRolled();
      return;
    }

    if (token.isOutofHome) {
      // Move token forward on the path
      moveToken(tokenId, color);
      // Prevent multiple clicks in same turn
      setistokenmoved(true);
      if (NumberOnDice === 6) {
        // Allow another roll
        setHasRolled();
      } else {
        // Delay before switching turn
        setTimeout(() => nextTurn(), 2000);
      }
      return;
    }

    // If token is neither at home nor out, just reset roll
    setHasRolled();
  };

  return (
    <div
      onClick={tokenHandler}
      className={`token-container ${tokenPosition === "home" ? "relative token-container-relative" : "absolute token-container-absolute"} 
      ${tokenPosition === "start" ? "top-[73px] left-[110px]" : "-top-[30px] left-2"} 
      h-[62px] w-[26px] ${isInFinishZone ? `static scale-[0.6] ${bgClass}` : "absolute"} md:scale-[0.7] mp:scale-[0.4]`}
    >
      <div className="token-div relative z-10">
        <div className="token-circle-outter bg-[gray] h-[25px] w-[23px] rounded-4xl flex justify-center items-center">
          <div className={`token-circle-inner h-[18px] w-[18px] rounded-4xl bg-${color}-400 token-circle-${color} z-[1]`}></div>
        </div>
        <div className="goti-lower absolute top-[17px]"></div>
      </div>

      {/* Ring animation when it's this player's turn */}
      <div className={`circle-ring h-6 w-6 border-black border-[0.5px] rounded-4xl absolute top-[38px] ${shouldSpin ? "animate-ping" : ""}`}></div>
    </div>
  );
};

export default Token;
