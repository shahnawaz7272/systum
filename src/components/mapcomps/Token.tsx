import { GameState } from "../../store/store";

// Type for the props: expects a Tailwind color class like 'bg-red-400'
type color = {
  color: string;
  spiningAni: string;
  tokenId:number;
};

const Token = ({ color, spiningAni ,tokenId }: color) => {
  const Turn = GameState((state) => state.Turn);
  let shouldSpin = spiningAni == Turn;
  const nextTurn = GameState((state) => state.nextTurn);
  const sethasrolled = GameState((state) => state.sethasRolled);
  const NumberOnDice = GameState((state) => state.NumberOnDice);
  const hasrolled = GameState((state) => state.hasrolled);
  const tokens = GameState((state) => state.Tokens);
  const token=tokens.find((t)=>(t.id==tokenId&&t.color==spiningAni))
  const moveOutfromHome = GameState((state) => state.moveOutFromHome);
  let tokePosition=token?.position

  const tokenHandler = () => {
    console.log(hasrolled)
    console.log(tokens)
    console.log(token)
    console.log(Turn)
    console.log(color)
    if (hasrolled == true) {
      if (token?.position === "home" && Turn === spiningAni && NumberOnDice === 6) {
        console.log("goti chali");
        console.log(token)
        moveOutfromHome(tokenId,spiningAni)
        sethasrolled();
      } else {
        console.log("bhaga")
        nextTurn();
        sethasrolled();
      }
    }
  };

  return (
    <div className={`token-container relative ${tokePosition=="start"?"top-[73px]":"-top-[30px]"} ${tokePosition=="start"?"left-[110px]":"left-2"} h-[62px] w-[26px]`} onClick={tokenHandler}>
      {/* Main token wrapper */}
      <div className="token relative z-10">
        {/* Outer gray part of the token */}
        <div className="bg-[gray] h-[25px] w-[23px] rounded-4xl flex justify-center items-center">
          {/* Inner colored part - changes based on player color */}
          <div className={`h-[18px] w-[18px] rounded-4xl ${color} z-[1]`}></div>
        </div>

        {/* Lower shadow/3D effect of token */}
        <div className="goti-lower absolute top-[17px] "></div>
      </div>

      {/* Circle effect behind goti (glow or border) */}
      <div className={`circle h-6 w-6 border-black border-[0.5px] rounded-4xl absolute top-[38px] ${shouldSpin ? "animate-ping" : ""}`}></div>
    </div>
  );
};

export default Token;
