import { useEffect, useState, useRef } from "react";
import "./App.css";
import { Row } from "./components/Row/Row";
import { Column } from "./components/Column/Column";
import { Cell } from "./components/Cell/Cell";
import {
  ICON_ART, ICON_ASTRO, ICON_BUILDING, ICON_BUSINESS, ICON_EMAIl, ICON_FACEBOOK,
  ICON_GEAR_SETTING, ICON_HOUSE, ICON_INSTAGRAM, ICON_JAVA, ICON_JOYSTICK, ICON_JS,
  ICON_KOTLIN, ICON_LINK, ICON_LINKEDIN, ICON_LINUX, ICON_LOGO_TS, ICON_MONGODB,
  ICON_PHOTO, ICON_PORTFOLIO, ICON_PROGRAMMING, ICON_REACT, ICON_RUST, ICON_SQL,
  ICON_TOOLBOX, ICON_TOOLS, ICON_TOP, ICON_TRANSLATE, ICON_USER_AVATAR_PROFILE, ICON_YOUTUBE
} from "./icons";
import BG_VIDEO from "./assets/BG_BLUE.mp4";
import { SND_CURSOR } from "./sounds";

function App() {
  const [currentCol, setCurrentCol] = useState(0);
  const [rowPositions, setRowPositions] = useState<number[]>(Array(7).fill(0));
  const colRef = useRef(currentCol);

  useEffect(() => {
    colRef.current = currentCol;
  }, [currentCol]);

  const go = (movement: "UP" | "DOWN") => {
    setRowPositions(prev => {
      const newPositions = [...prev];
      const col = colRef.current;
      newPositions[col] = (newPositions[col] ?? 0) + (movement === "DOWN" ? 1 : -1);
      return newPositions;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          go("UP");
          break;
        case "ArrowDown":
          go("DOWN");
          break;
        case "ArrowLeft":
          setCurrentCol(prev => Math.max(0, prev - 1));
          break;
        case "ArrowRight":
          setCurrentCol(prev => Math.min(6, prev + 1));
          break;
      }

      if (SND_CURSOR) {
        SND_CURSOR.currentTime = 0;
        SND_CURSOR.play();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main>
      <video autoPlay muted loop>
        <source src={BG_VIDEO} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Row index={currentCol} setIndex={setCurrentCol}>
        <Column icon={ICON_HOUSE} index={currentCol === 0 ? rowPositions[0] : 0} selected={currentCol === 0} setIndex={setRowPositions}>
          <Cell icon={ICON_USER_AVATAR_PROFILE} />
          <Cell icon={ICON_PORTFOLIO} />
        </Column>
        <Column icon={ICON_LINK} index={currentCol === 1 ? rowPositions[1] : 0} selected={currentCol === 1} setIndex={setRowPositions}>
          <Cell icon={ICON_EMAIl} />
          <Cell icon={ICON_LINKEDIN} />
          <Cell icon={ICON_INSTAGRAM} />
          <Cell icon={ICON_YOUTUBE} />
          <Cell icon={ICON_FACEBOOK} />
        </Column>
        <Column icon={ICON_PORTFOLIO} index={currentCol === 2 ? rowPositions[2] : 0} selected={currentCol === 2} setIndex={setRowPositions}></Column>
        <Column icon={ICON_BUSINESS} index={currentCol === 3 ? rowPositions[3] : 0} selected={currentCol === 3} setIndex={setRowPositions}></Column>
        <Column icon={ICON_GEAR_SETTING} index={currentCol === 4 ? rowPositions[4] : 0} selected={currentCol === 4} setIndex={setRowPositions}>
          <Cell icon={ICON_TRANSLATE} />
        </Column>
        <Column icon={ICON_PROGRAMMING} index={currentCol === 5 ? rowPositions[5] : 0} selected={currentCol === 5} setIndex={setRowPositions}>
          <Cell icon={ICON_JAVA} />
          <Cell icon={ICON_JS} />
          <Cell icon={ICON_SQL} />
          <Cell icon={ICON_KOTLIN} />
          <Cell icon={ICON_LOGO_TS} />
          <Cell icon={ICON_RUST} />
        </Column>
        <Column icon={ICON_TOOLBOX} index={currentCol === 6 ? rowPositions[6] : 0} selected={currentCol === 6} setIndex={setRowPositions}>
          <Cell icon={ICON_ASTRO} />
          <Cell icon={ICON_REACT} />
          <Cell icon={ICON_MONGODB} />
          <Cell icon={ICON_LINUX} />
        </Column>
      </Row>
    </main>
  );
}

export default App;
