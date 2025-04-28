import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GameState } from "../store/store";

const Restartbtn = () => {
    const RestartingGame=GameState((s)=>s.initializeTokens)
  return (
    <>
      {" "}
      <button className=" restart-btn px-2.5 py-1.5 rounded-[999px] bg-[#fff]" onClick={RestartingGame}>
        <FontAwesomeIcon icon={faRepeat} style={{ color: "#666" }}></FontAwesomeIcon>{" "}
      </button>
    </>
  );
};

export default Restartbtn;
