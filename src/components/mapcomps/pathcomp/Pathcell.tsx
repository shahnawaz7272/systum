import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { GameState } from "../../../store/store";
import Token from "../Token";
import { useEffect } from "react";

type CellType = {
  celltype: number;
  coloredsteps: string;
  specialid: string;
};

const Pathcell = ({ celltype, coloredsteps, specialid }: CellType) => {
  const tokens = GameState((s) => s.Tokens);
  const Turn = GameState((s) => s.Turn);
  const tokensHere = tokens.filter((t) => t.position === specialid);
  const sendTokenHome = GameState((s) => s.sendTokenHome);
  const NextTurn = GameState((s) => s.nextTurn);

  let colored: number[] = [];
  let starred: number[] = [];
  let arrowed: number[] = [];
  let starColor: string = "";
  let arrowRotation: number = 0;

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
  }

  const isColoredCell = colored.includes(celltype);
  const isStarCell = starred.includes(celltype);
  const isArrowCell = arrowed.includes(celltype);

  useEffect(() => {
    const currentPlayerTokens = tokensHere.filter((t) => t.color === Turn);
    const enemyTokens = tokensHere.filter((t) => t.color !== Turn);

    if (isColoredCell || isStarCell) {
      console.log(`${specialid} nai marega`);
    } else {
      console.log(`${specialid} maaro saalo ko`);
      if (currentPlayerTokens.length === 1 && enemyTokens.length > 0) {
        enemyTokens.forEach((enemy) => {
          sendTokenHome(enemy.id, enemy.color);
        });
        console.log(" Sent opponents home from:", specialid);
      }
    }
  }, [tokensHere.length, Turn]);

  return (
    <div className="pathcell-wrapper">
      <div
        className={`pathcell-inner ${isColoredCell ? `bg-${coloredsteps}` : ""}`}
      >
        {isStarCell && <FontAwesomeIcon icon={faStarRegular} style={{ color: starColor }} size="x" />}
        {isArrowCell && <FontAwesomeIcon icon={faArrowRight} style={{ color: starColor }} size="x" rotation={arrowRotation} />}

        {tokensHere.map((item) => (
          <Token key={item?.id} color={item?.color} spiningAni={item?.color} tokenId={item?.id} />
        ))}
      </div>
    </div>
  );
};

export default Pathcell;
