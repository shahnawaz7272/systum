import Pathcell from "./pathcomp/Pathcell";

// Props type definition
type orientation = {
  ori: string; // 'vertical' or 'horizontal'
  color: string; // which color this path belongs to (e.g., 'red', 'green')
};

const Path = ({ ori, color }: orientation) => {
  // Create an array of 18 cells to represent the steps in the path
  const pathCells = Array(18).fill(null);

  // Determine height and width based on orientation
  const isVertical = ori === "vertical";
  const heightClass = isVertical ? "h-[240px]" : "h-[120px]";
  const widthClass = isVertical ? "w-[120px]" : "w-[240px]";
  const directionClass = !isVertical ? "flex-col-reverse" : "";

  let cellIdArr: string[] = [];

  switch (color) {
    case "blue":
      cellIdArr = ["b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "b10", "starblue", "startblue", "b13", "b14", "b15", "arrowblue", "b17"];

      break;
    case "red":
      cellIdArr = ["r0", "arrowred", "r2", "r3", "r4", "startred", "starred", "r7", "r8", "r9", "r10", "r11", "r12", "r13", "r14", "r15", "r16", "r17"];

      break;
    case "green":
      cellIdArr = ["g0", "arrowgreen", "g2", "g3", "g4", "startgreen", "stargreen", "g7", "g8", "g9", "g10", "g11", "g12", "g13", "g14", "g15", "g16", "g17"];

      break;
    case "yellow":
      cellIdArr = ["y0", "y1", "y2", "y3", "y4", "y5", "y6", "y7", "staryellow", "y9", "y10", "y11", "startyellow", "y13", "y14", "y15", "arrowyellow", "y17"];

      break;
    default:
      break;
  }

  return (
    <div className="path-container">
      {/* Path wrapper with dynamic height, width, and direction */}
      <div className={`path ${heightClass} ${widthClass} flex flex-wrap ${directionClass}`}>
        {/* Render each path cell */}
        {pathCells.map((_, index) => (
          <Pathcell key={index} celltype={index} coloredsteps={color} specialid={cellIdArr[index]} />
        ))}
      </div>
    </div>
  );
};

export default Path;
