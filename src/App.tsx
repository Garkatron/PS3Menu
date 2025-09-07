import { useEffect, useState, useRef } from "react";
import "./App.css";
import { Row } from "./components/Row/Row";
import { Column } from "./components/Column/Column";
import { Cell } from "./components/Cell/Cell";
import {
  ICON_ART, ICON_ASTRO, ICON_BIG_BUSINESS, ICON_BUILDING, ICON_BUSINESS, ICON_EMAIl, ICON_ESO, ICON_FACEBOOK,
  ICON_GEAR_SETTING, ICON_HOUSE, ICON_INSTAGRAM, ICON_JAVA, ICON_JOYSTICK, ICON_JS,
  ICON_KOTLIN, ICON_LEARN, ICON_LINK, ICON_LINKEDIN, ICON_LINUX, ICON_LOGO_TS, ICON_MONGODB,
  ICON_PHOTO, ICON_PORTFOLIO, ICON_PROGRAMMING, ICON_REACT, ICON_RUST, ICON_SMALL_BUSINESS, ICON_SQL,
  ICON_TECHNICIAN,
  ICON_TOOLBOX, ICON_TOOLS, ICON_TOP, ICON_TRANSLATE, ICON_USER_AVATAR_PROFILE, ICON_WEB, ICON_YOUTUBE
} from "./icons";
import BG_VIDEO from "./assets/BG_0.mp4";
import { SND_CURSOR } from "./sounds";
import { useIsMobile } from "./utils";
import { ContactForm } from "./components/ContactForm/ContactForm";
import { InstagramEmbed } from "./components/InstagramEmbed/InstagramEmbed";
import { IMG_CHIP8, IMG_GUIDEBOOK, IMG_LRUCACHE, IMG_PAPERWORK, IMG_PARKOUR, IMG_RENDERER3D, IMG_RLOX } from "./images";

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
        {/* Perfil */}
        <Column icon={ICON_HOUSE} selected={currentCol === 0}>
          <Cell icon={ICON_USER_AVATAR_PROFILE} onClick={() => setVisibleSubmenu(!isVisibleSubmenu)}>
            <h2>Hi, I'm Matias</h2>
            <p>
              Web Developer & Minecraft Modder. I began my programming journey during the pandemic, starting with Java and exploring other languages...
            </p>
            <h3>Use of AI</h3>
            <p>
              I use AI to research, clarify concepts, and perform small refactorings or optimizations...
            </p>
          </Cell>
        </Column>

        {/* Enlaces */}
        <Column icon={ICON_LINK} selected={currentCol === 1}>
          <Cell icon={ICON_EMAIl}><ContactForm /></Cell>
          <Cell icon={ICON_LINKEDIN} />
          <Cell icon={ICON_INSTAGRAM}>
            <InstagramEmbed url="https://www.instagram.com/p/DNYsxC3tHgk/" />
          </Cell>
          <Cell icon={ICON_YOUTUBE} />
          <Cell icon={ICON_FACEBOOK} />
        </Column>

        {/* Portafolio */}
        <Column icon={ICON_PORTFOLIO} selected={currentCol === 2}>
          <Cell invert={false} icon={IMG_RLOX}>A Implementation of JLOX in rust!</Cell>
          <Cell invert={false} icon={IMG_RENDERER3D}>A 3D Renderer written in rust from scratch</Cell>
          <Cell invert={false} icon={IMG_LRUCACHE}>LRU Cache implementation in rust</Cell>
          <Cell invert={false} icon={IMG_CHIP8}>A CHIP8 Emulator written in Python</Cell>
          <Cell invert={false} icon={IMG_GUIDEBOOK}>A Minecraft mod that adds markdown to books.</Cell>
          <Cell invert={false} icon={IMG_PAPERWORK}>A Minecraft mod about paper.</Cell>
          <Cell invert={false} icon={IMG_PARKOUR}>A Minecraft mod that adds parkour.</Cell>
        </Column>

        {/* Educación / Learn */}
        <Column icon={ICON_LEARN} selected={currentCol === 3}>
          <Cell icon={ICON_WEB}>
            Web Development
            CIFP Majada Marcial [ 11/09/2024 – Current ]
            City: Puerto del Rosario | Country: Spain
          </Cell>
          <Cell icon={ICON_TECHNICIAN}>
            Technician in Microcomputer Systems and Networks
            Majada Marcial Integrated Vocational Training Center [ 10/09/2022 – 2024 ]
          </Cell>
          <Cell icon={ICON_ESO}>
            Certificate of Compulsory Secondary Education
            Puerto del Rosario Institute of Education [ 17/08/2016 – 01/09/2022 ]
          </Cell>
        </Column>

        {/* Experiencia */}
        <Column icon={ICON_BUSINESS} selected={currentCol === 4}>
          <Cell icon={ICON_BIG_BUSINESS}>
            Web Development Vocational Training Internship, where I applied my skills in JavaScript, MongoDB, React, and other technologies to real-world projects.
          </Cell>
          <Cell icon={ICON_SMALL_BUSINESS}>
            Intermediate Vocational Training Internship, focused on computer assembly, hardware testing, network setup, and server configuration.
          </Cell>
        </Column>


        {/* Programación / Skills */}
        <Column icon={ICON_PROGRAMMING} selected={currentCol === 5}>
          <Cell icon={ICON_JAVA}>I started learning Java and improved my skills by creating Minecraft mods.</Cell>
          <Cell icon={ICON_JS}>I developed strong control of JavaScript...</Cell>
          <Cell icon={ICON_SQL}>I learned SQL during my DAW vocational program.</Cell>
          <Cell icon={ICON_KOTLIN}>I used Kotlin to build an app for a small business.</Cell>
          <Cell icon={ICON_LOGO_TS}>I use TypeScript to make my web apps safer and more maintainable.</Cell>
          <Cell icon={ICON_RUST}>I'm learning Rust to improve my low-level programming skills.</Cell>
        </Column>

        {/* Herramientas */}
        <Column icon={ICON_TOOLBOX} selected={currentCol === 6}>
          <Cell icon={ICON_ASTRO}>I use Astro for building static and fast websites...</Cell>
          <Cell icon={ICON_REACT}>I enjoy using React for interactive web applications...</Cell>
          <Cell icon={ICON_MONGODB}>I started using MongoDB during the DAW program...</Cell>
          <Cell icon={ICON_LINUX}>I enjoy using Linux, it’s reliable and efficient for development.</Cell>
        </Column>

        {/* Configuración */}
        <Column icon={ICON_GEAR_SETTING} selected={currentCol === 7}>
          <Cell icon={ICON_TRANSLATE}></Cell>
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
