import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// Define prop types: cell index & color info for the path
type celltype = {
  celltype: number; // index of the cell in the path
  coloredsteps: string; // color class like 'bg-blue-400' to decide special path
};

const Pathcell = ({ celltype, coloredsteps }: celltype) => {
  let colored: number[] = [];
  let stared: number[] = [];
  let arrowed: number[] = [];
  let starcolour: string;
  let rotation:number

  // Assign special highlighted steps based on the player color
  switch (coloredsteps) {
    case "bg-blue-400":
      colored = [1, 4, 7, 10, 12, 13];
      stared = [11];
      starcolour = "#60a5fa";
      arrowed = [16];
      rotation=270
      break;

    case "bg-yellow-400":
      colored = [1, 4, 7, 10, 12, 13];
      stared = [11];
      starcolour = "#facc15";
      arrowed = [16];
      rotation=180
      break;

    case "bg-red-400":
      colored = [4, 5, 7, 10, 13, 16];
      stared = [6];
      starcolour = "#f87171";
      arrowed = [1];
      rotation=0
      break;

    case "bg-green-400":
      colored = [4, 5, 7, 10, 13, 16];
      stared = [6];
      starcolour = "#34d399";
      arrowed = [1];
      rotation=90
      break;

    default:
      break;
  }

  // Check if current cell index is a highlighted one
  const shouldBeColored = colored.includes(celltype);

  const shouldBestared = stared.includes(celltype);

  const shouldarrowed = arrowed.includes(celltype);

  return (
    <div className="path-cell-container h-10 w-10">
      {/* If cell is in the colored list, apply color */}
      <div className={`path-cell h-10 w-10 border-b-blue-950 border border-r-0 ${shouldBeColored ? coloredsteps : ""} flex justify-center items-center`}>
        {shouldBestared ? <FontAwesomeIcon icon={faStarRegular} style={{ color: `${starcolour}` }} size="xl"></FontAwesomeIcon> : ""}
        {shouldarrowed ? <FontAwesomeIcon icon={faArrowRight} style={{ color: `${starcolour}` }} size="xl" rotation={`${rotation}`}></FontAwesomeIcon> : ""}

        {/* <FontAwesomeIcon icon={faStarRegular} style={{ color: "#FFD43B" }} size='xl'></FontAwesomeIcon>   */}
      </div>
    </div>
  );
};

export default Pathcell;
