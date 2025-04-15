type celltype = {
  celltype: number;
  coloredsteps:string
};
const Pathcell = ({ celltype , coloredsteps }: celltype) => {
    let colored:number[]=[]
    // 4,5,7,10,13,16
    switch (coloredsteps) {
        case "bg-blue-400":colored=[1,4,7,10,12,13]
            
            break;
            case "bg-yellow-400":colored=[1,4,7,10,12,13]
            
            break;
        default: colored=[4,5,7,10,13,16]
            break;
    }  
    const shouldbecolored=colored.includes(celltype);
    

  if (shouldbecolored) {
    return (
        <div className="path-cell-container h-10 w-10">
          <div
            className={`path-cell h-10 w-10 border-b-blue-950 border border-r-0 ${coloredsteps}`}
          >{celltype}</div>
        </div>
      );
  } else {
    return (
      <div className="path-cell-container h-10 w-10">
        <div
          className={`path-cell h-10 w-10 border-b-blue-950 border border-r-0 `}
        >{celltype}</div>
      </div>
    );
  }
};

export default Pathcell;
