import { GameState } from "../../store/store";

// Props type definition for Token component
type TokenProps = {
  color?: string;          // Tailwind color class (e.g., 'bg-red-400')
  spiningAni?: string;     // Indicates which player's turn it is (used for animation)
  tokenId?: number;        // Unique identifier for the token
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
  const moveToken =GameState((state)=>state.moveToken)

  // Find the token based on its ID and color
  const token = tokens.find(
    (t) => t.id === tokenId && t.color === color
  );

  const tokenPosition = token?.position;
  const shouldSpin = spiningAni === Turn;

  // Handle token click
  const tokenHandler = () => {
    if (token?.color==color && Turn==color) {
      console.log({ hasRolled, token, Turn, color });

      if (hasRolled) {
        // If token is at home, it's the current player's turn, and dice shows 6
        if (token?.position === "home" && Turn === color && NumberOnDice === 6) {
          console.log("Token moved out of home");
          moveOutFromHome(tokenId, spiningAni);
          setHasRolled();
        console.log(hasRolled ,"40 tt")
        } 
        else if(Turn===color && token?.isOutofHome===true){
            console.log("moving")
            moveToken(tokenId,color)
          setHasRolled();
        console.log(hasRolled ,"46 tt")
  
        }
        else {
          console.log("Not allowed to move, passing turn");
          setHasRolled();
        console.log(hasRolled ,"52 tt")

        }
      }
    } else {
      console.log("bas kar gandu")
    }
  
  };

  return (
    <div
      onClick={tokenHandler}
      className={`token-container ${tokenPosition=="home"?"relative":"absolute"} 
        ${tokenPosition === "start" ? "top-[73px] left-[110px]" : "-top-[30px] left-2"} 
        h-[62px] w-[26px]`}
    >
      {/* Token body */}
      <div className="token relative z-10">
        {/* Outer gray ring of the token */}
        <div className="bg-[gray] h-[25px] w-[23px] rounded-4xl flex justify-center items-center">
          {/* Inner colored circle */}
          <div className={`h-[18px] w-[18px] rounded-4xl bg-${color}-400 z-[1]`}></div>
        </div>

        {/* Lower 3D base of the token */}
        <div className="goti-lower absolute top-[17px]"></div>
      </div>

      {/* Animated glowing circle (shown only when it's the player's turn) */}
      <div
        className={`circle h-6 w-6 border-black border-[0.5px] rounded-4xl absolute top-[38px] 
        ${shouldSpin ? "animate-ping" : ""}`}
      ></div>
    </div>
  );
};

export default Token;
