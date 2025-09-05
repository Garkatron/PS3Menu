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
import BG_VIDEO from "./assets/BG_0.mp4";
import { SND_CURSOR } from "./sounds";
import { useIsMobile } from "./utils";
import { ContactForm } from "./components/ContactForm/ContactForm";
import { InstagramEmbed } from "./components/InstagramEmbed/InstagramEmbed";

function App() {
  const [currentCol, setCurrentCol] = useState(0);
  const colRef = useRef(currentCol);
  const isMobile = useIsMobile();
  const [isVisibleSubmenu, setVisibleSubmenu] = useState(false);

  useEffect(() => {
    colRef.current = currentCol;
  }, [currentCol]);



  useEffect(() => {
    const prevColKey = isMobile ? "ArrowUp" : "ArrowLeft";
    const nextColKey = isMobile ? "ArrowDown" : "ArrowRight";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === prevColKey) {
        setCurrentCol(prev => Math.max(0, prev - 1));
      }
      if (e.key === nextColKey) {
        setCurrentCol(prev => Math.min(6, prev + 1));
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
  }, [isMobile]);

  return (
    <main>
      <video autoPlay muted loop>
        <source src={BG_VIDEO} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Row index={currentCol} setIndex={setCurrentCol}>
        <Column icon={ICON_HOUSE} selected={currentCol === 0} >
          <Cell icon={ICON_USER_AVATAR_PROFILE} onClick={() => { setVisibleSubmenu(!isVisibleSubmenu) }} >
            <h2>Hi, I'm Matias</h2>
            <p>
              Web Developer & Minecraft Modder. I began my programming journey during the pandemic, starting with Java and exploring other languages. Since then, I have been building projects, learning new concepts, and recently completed a vocational training program (GM FP) in Microinformatic Systems and Communications. I am currently studying DAW (Web Development).

            </p>

            <h3>Use of AI</h3>
            <p>
              I use AI to research, clarify concepts, and perform small refactorings or optimizations. It helps me save time on repetitive tasks, but I avoid relying on it for major refactors or as my main learning source.
            </p>

          </Cell>

        </Column>
        <Column icon={ICON_LINK} selected={currentCol === 1}>
          <Cell icon={ICON_EMAIl}>
            <ContactForm />

          </Cell>
          <Cell icon={ICON_LINKEDIN} />
          <Cell icon={ICON_INSTAGRAM}>
            <InstagramEmbed url="https://www.instagram.com/p/DNYsxC3tHgk/" />

          </Cell>
          <Cell icon={ICON_YOUTUBE} />
          <Cell icon={ICON_FACEBOOK} />
        </Column>
        <Column icon={ICON_PORTFOLIO} selected={currentCol === 2}></Column>
        <Column icon={ICON_BUSINESS} selected={currentCol === 3}></Column>
        <Column icon={ICON_GEAR_SETTING} selected={currentCol === 4}>
          <Cell icon={ICON_TRANSLATE}>
          </Cell>
        </Column>
        <Column icon={ICON_PROGRAMMING} selected={currentCol === 5}>
          <Cell icon={ICON_JAVA}>
            I started learning Java and improved my skills by creating Minecraft mods.
          </Cell>
          <Cell icon={ICON_JS}>
            I developed strong control of JavaScript, using it extensively in my vocational training (GS FP).
          </Cell>
          <Cell icon={ICON_SQL}>
            I learned SQL during my DAW vocational program.
          </Cell>
          <Cell icon={ICON_KOTLIN}>
            I used Kotlin to build an app for a small business.
          </Cell>
          <Cell icon={ICON_LOGO_TS}>
            I use TypeScript to make my web apps safer and more maintainable.
          </Cell>
          <Cell icon={ICON_RUST}>
            I'm learning Rust to improve my low-level programming skills.
          </Cell>
        </Column>
        <Column icon={ICON_TOOLBOX} selected={currentCol === 6} >
          <Cell icon={ICON_ASTRO}>
            I use Astro for building static and fast websites like portfolios or blogs.
          </Cell>
          <Cell icon={ICON_REACT}>
            I enjoy using React for interactive web applications, but I am also exploring alternatives.
          </Cell>
          <Cell icon={ICON_MONGODB}>
            I started using MongoDB during the DAW program and continue to use it in small personal projects.
          </Cell>
          <Cell icon={ICON_LINUX}>
            I enjoy using Linux, it’s reliable and efficient for development.
          </Cell>
        </Column>
      </Row>
      {
        isVisibleSubmenu && (
          <section className="menu">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i}></div>
            ))}
          </section>
        )
      }

    </main>
  );
}

export default App;
