import Safearea from "./safezonecomponents/Safearea";

const Safezone = () => {
  return (
    <div className="safezone-container">
      <div className="safezone-box">
        <Safearea color="green" specialid="finishg" />
        <Safearea color="red" specialid="finishr" />
        <Safearea color="blue" specialid="finishb" />
        <Safearea color="yellow" specialid="finishy" />
      </div>
    </div>
  );
};

export default Safezone;
