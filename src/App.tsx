import { useEffect, useState } from 'react'
import './App.css'
import { Row } from './components/Row/Row'
import { Column } from './components/Column/Column'
import { Cell } from './components/Cell/Cell'

import GearSetting from './assets/svg/gear-setting-settings-svgrepo-com.svg';
import PhotoSvgRepo from './assets/svg/photo-svgrepo-com.svg';
import UserAvatarProfil from './assets/svg/user-avatar-profile-svgrepo-com.svg';
import bgVideo from './assets/BG_BLUE.mp4';
function App() {
  const [currentCol, setCurrentCol] = useState(0);
  const [currentRow, setCurrentRow] = useState(0);

  const [rowPositions, setRowPositions] = useState<number[]>(Array(6).fill(0));

  const go = (movement: "UP" | "DOWN") => {
    setRowPositions(prev => {
      const newPositions = [...prev];
      newPositions[currentCol] = (newPositions[currentCol] ?? 0) + (movement === "DOWN" ? 1 : -1);
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
          setCurrentCol(prev => prev - 1);
          break;
        case "ArrowRight":
          setCurrentCol(prev => prev + 1);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentCol]);

  return (
    <main>
      <div className="center-line"></div>
      <video autoPlay muted loop>
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Row index={currentCol} setIndex={setCurrentCol}>
        <Column index={currentCol === 0 ? rowPositions[0] : 0} selected={currentCol === 0} setIndex={setCurrentRow}>
          <Cell icon={UserAvatarProfil} />
          <Cell icon={UserAvatarProfil} />
          <Cell icon={UserAvatarProfil} />
          <Cell icon={UserAvatarProfil} />
          <Cell icon={UserAvatarProfil} />

        </Column>
        <Column index={currentCol === 1 ? rowPositions[1] : 0} selected={currentCol === 1} setIndex={setCurrentRow}>
          <Cell icon={PhotoSvgRepo} />
          <Cell icon={PhotoSvgRepo} />
          <Cell icon={PhotoSvgRepo} />
          <Cell icon={PhotoSvgRepo} />

        </Column>
        <Column index={currentCol === 2 ? rowPositions[2] : 0} selected={currentCol === 2} setIndex={setCurrentRow}>

          <Cell icon={GearSetting} />

        </Column>
        <Column index={currentCol === 3 ? rowPositions[3] : 0} selected={currentCol === 3} setIndex={setCurrentRow}>

          <Cell icon={UserAvatarProfil} />


        </Column>
        <Column index={currentCol === 4 ? rowPositions[4] : 0} selected={currentCol === 4} setIndex={setCurrentRow}>

          <Cell icon={UserAvatarProfil} />


        </Column>
        <Column index={currentCol === 5 ? rowPositions[5] : 0} selected={currentCol === 5} setIndex={setCurrentRow}>
          <Cell icon={UserAvatarProfil} />



        </Column>
      </Row>

    </main>
  );
}

export default App
