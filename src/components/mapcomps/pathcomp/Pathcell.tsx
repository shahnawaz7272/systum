import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { GameState } from "../../../store/store";
import Token from "../Token";

// Props type for the Pathcell component
type CellType = {
  celltype: number; // Cell index within the path array
  coloredsteps: string; // Tailwind color class to indicate player path (e.g., 'bg-blue-400')
  specialid: string; // Unique identifier used to match token positions
};

const Pathcell = ({ celltype, coloredsteps, specialid }: CellType) => {
  const tokens = GameState((s) => s.Tokens);
  const tokenTobeRendered = tokens.filter((t) => t.position === specialid);

  // Path visuals config based on color
  let colored: number[] = [];
  let starred: number[] = [];
  let arrowed: number[] = [];
  let starColor: string = "";
  let arrowRotation: number = 0;

  // Set path styling rules based on player's color path
  switch (coloredsteps) {
    case "blue":
      colored = [1, 4, 7, 10, 12, 13];
      starred = [11];
      arrowed = [16];
      starColor = "#60a5fa";
      arrowRotation = 270;
      break;

    case "yellow":
      colored = [1, 4, 7, 10, 12, 13];
      starred = [11];
      arrowed = [16];
      starColor = "#facc15";
      arrowRotation = 180;
      break;

    case "red":
      colored = [4, 5, 7, 10, 13, 16];
      starred = [6];
      arrowed = [1];
      starColor = "#f87171";
      arrowRotation = 0;
      break;

    case "green":
      colored = [4, 5, 7, 10, 13, 16];
      starred = [6];
      arrowed = [1];
      starColor = "#34d399";
      arrowRotation = 90;
      break;

    default:
      break;
  }

  // Flags to decide what this cell should show
  const isColoredCell = colored.includes(celltype);
  const isStarCell = starred.includes(celltype);
  const isArrowCell = arrowed.includes(celltype);

  return (
    <div className="path-cell-container h-10 w-10">
      <div
        className={`path-cell h-10 w-10 border-b-blue-950 border border-r-0 
        ${isColoredCell ? `bg-${coloredsteps}-400` : ""} 
        flex justify-center items-center relative`}
      >
        {/* Show star icon on special cells */}
        {isStarCell && <FontAwesomeIcon icon={faStarRegular} style={{ color: starColor }} size="xl" />}

        {/* Show arrow icon on directional cells */}
        {isArrowCell && <FontAwesomeIcon icon={faArrowRight} style={{ color: starColor }} size="xl" rotation={arrowRotation} />}

        {/* Render token if one is positioned here */}
        {tokenTobeRendered.map((item) => (
          <Token key={item.id} color={item.color} spiningAni={item.color} tokenId={item.id} />
        ))}
        
        {/* {specialid} */}
        {/* Optional: show special ID for debugging */}
        {/* <div className="absolute bottom-0 right-0 text-[10px]">{specialid}</div> */}
      </div>
    </div>
  );
};

export default Pathcell;
