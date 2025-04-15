import Dice from "./Dice";
import Token from "./Token";


type color = {
  color: string;
};

const House = ({ color }: color) => {
  let diceboardposition:string
  switch (color) {
    case "bg-red-400":diceboardposition="-left-[120px]"
      
      break;
      case "bg-yellow-400":diceboardposition="-right-[120px] top-[120px]"
      
      break;case "bg-green-400":diceboardposition="-right-[120px] "
      
      break;case "bg-blue-400":diceboardposition="-left-[120px] top-[120px]"
      
      break;  
  
  
  }
  return (
    <div className="House-container relative">
      <div className={`bg-red-200 h-[120px] w-[120px] absolute ${diceboardposition} flex justify-center items-center`}>
        <Dice/>
      </div>
      <div
        className={`${color} h-[240px] w-[240px] flex justify-center items-center`}
      >
        <div className="bg-white h-[160px] w-[160px] flex flex-wrap">
          <div className="circles-container h-20 w-20 flex justify-center items-center">
            <div className={`${color} h-10 w-10 rounded-4xl`}><Token color={color}/></div>
          </div>
          <div className="circles-container h-20 w-20 flex justify-center items-center">
            <div className={`${color} h-10 w-10 rounded-4xl`}><Token color={color}/></div>
          </div>
          <div className="circles-container h-20 w-20 flex justify-center items-center">
            <div className={`${color} h-10 w-10 rounded-4xl`}><Token color={color}/></div>
          </div>
          <div className="circles-container h-20 w-20 flex justify-center items-center">
            <div className={`${color} h-10 w-10 rounded-4xl`}><Token color={color}/></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default House;
