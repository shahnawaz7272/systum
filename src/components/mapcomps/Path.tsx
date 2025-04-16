import Pathcell from "./pathcomp/Pathcell";

// Props type definition
type orientation = {
  ori: string;     // 'vertical' or 'horizontal'
  homeof: string;  // which color this path belongs to (e.g., 'red', 'green')
};

const Path = ({ ori, homeof }: orientation) => {
  // Create an array of 18 cells to represent the steps in the path
  const pathCells = Array(18).fill(null);

  // Determine height and width based on orientation
  const isVertical = ori === "vertical";
  const heightClass = isVertical ? "h-[240px]" : "h-[120px]";
  const widthClass = isVertical ? "w-[120px]" : "w-[240px]";
  const directionClass = !isVertical ? "flex-col-reverse" : "";

  return (
    <div className="path-container">
      {/* Path wrapper with dynamic height, width, and direction */}
      <div className={`path ${heightClass} ${widthClass} flex flex-wrap ${directionClass}`}>
        {/* Render each path cell */}
        {pathCells.map((_, index) => (
          <Pathcell key={index} celltype={index} coloredsteps={homeof} />
        ))}
      </div>
    </div>
  );
};

export default Path;
