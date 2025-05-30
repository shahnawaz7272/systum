import Pathcell from "./pathcomp/Pathcell";

type orientation = {
  ori: string;
  color: string;
};

const Path = ({ ori, color }: orientation) => {
  const pathCells = Array(18).fill(null);

  const isVertical = ori === "vertical";
  const heightClass = isVertical ? "path-vertical-height" : "path-horizontal-height";
  const widthClass = isVertical ? "path-vertical-width" : "path-horizontal-width";
  const directionClass = !isVertical ? "path-horizontal-direction" : "";

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
  }

  return (
    <div className="path-container">
      <div className={`path-base ${heightClass} ${widthClass} ${directionClass}`}>
        {pathCells.map((_, index) => (
          <Pathcell key={index} celltype={index} coloredsteps={color} specialid={cellIdArr[index]} />
        ))}
      </div>
    </div>
  );
};

export default Path;
