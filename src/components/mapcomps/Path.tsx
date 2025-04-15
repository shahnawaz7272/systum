import Pathcell from "./pathcomp/Pathcell";

type orientetion = {
  ori: string;
  homeof:string;
};
const Path = ({ ori , homeof }: orientetion) => {
  const pathCells = Array(18).fill(null);
  return (
    <div className="path-container">
      <div
        className={`path h-[${ori == "vertical" ? 240 : 120}px] w-[${
          ori == "vertical" ? 120 : 240
        }px] flex flex-wrap ${ori!="vertical"?"flex-col-reverse":""}`}
      >
        {pathCells.map((_, index) => (
          <Pathcell celltype={index} coloredsteps={homeof}/>
        ))}
      </div>
    </div>
  );
};

export default Path;
