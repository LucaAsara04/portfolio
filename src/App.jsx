import { useState, useEffect } from "react";
import "./App.css";
import narutoPanel from "./assets/images/naruto-panel.jpg";
import theLastOfUsImage from "./assets/images/the-last-of-us.jpg";


const bootLines = [
  "SYSTEM BOOT SEQUENCE",
  "",
  "Initializing modules...",
  "Loading profile...",
  "Loading education...",
  "Loading professional experience...",
  "Loading skills...",
  "Loading contacts...",
  "",
  "System ready.",
  "",
  "Launching interface..."
];

const folders = [
  "About Me",
  "Istruzione e Formazione",
  "Esperienze Professionali",
  "Competenze",
  "Contatti",
  "Progetti"
];

function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const [showDesktop, setShowDesktop] = useState(false);
  const [activeFolder, setActiveFolder] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [displayRole, setDisplayRole] = useState("");

  const [visibleLines, setVisibleLines] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (bootComplete) {
      return;
    }

    if (currentLineIndex >= bootLines.length) {
      const completeTimer = setTimeout(() => {
        setBootComplete(true);
      }, 800);

      return () => clearTimeout(completeTimer);
    }

    const line = bootLines[currentLineIndex];

    if (line === "") {
      const emptyLineTimer = setTimeout(() => {
        setVisibleLines((prev) => [...prev, ""]);
        setCurrentLine("");
        setCurrentCharIndex(0);
        setCurrentLineIndex((prev) => prev + 1);
      }, 250);

      return () => clearTimeout(emptyLineTimer);
    }

    if (currentCharIndex < line.length) {
      const typingTimer = setTimeout(() => {
        setCurrentLine((prev) => prev + line[currentCharIndex]);
        setCurrentCharIndex((prev) => prev + 1);
      }, 35);

      return () => clearTimeout(typingTimer);
    }

    const nextLineTimer = setTimeout(() => {
      setVisibleLines((prev) => [...prev, line]);
      setCurrentLine("");
      setCurrentCharIndex(0);
      setCurrentLineIndex((prev) => prev + 1);
    }, 350);

    return () => clearTimeout(nextLineTimer);
  }, [bootComplete, currentLineIndex, currentCharIndex]);

  useEffect(() => {
    if (!bootComplete) return;

    const fullName = "ASARA LUCA";
    const fullRole = "Digital Support & Data Analyst";

    let nameIndex = 0;

    const writeName = setInterval(() => {
      nameIndex++;

      setDisplayName(
        fullName.substring(0, nameIndex)
      );

      if (nameIndex >= fullName.length) {
        clearInterval(writeName);

        let roleIndex = 0;

        const writeRole = setInterval(() => {
          roleIndex++;

          setDisplayRole(
            fullRole.substring(0, roleIndex)
          );

          if (roleIndex >= fullRole.length) {
            clearInterval(writeRole);
          }
        }, 35);
      }
    }, 80);

    return () => clearInterval(writeName);
  }, [bootComplete]);

  if (!bootComplete) {
    return (
      <div className="boot-screen">
        <div className="boot-content">
          {visibleLines.map((line, index) => (
            <div key={index} className="boot-line">
              {line}
            </div>
          ))}

          <div className="boot-line active-line">
            {currentLine}
            <span className="cursor"></span>
          </div>
        </div>
      </div>
    );
  }

  if (!showDesktop) {
    return (
      <div className="welcome-screen">
        <div className="hero-title">
          <h1 className="hero-name">
            {displayName}
          </h1>

          <h2 className="hero-role">
            {displayRole}
          </h2>
        </div>

        <button
          className="enter-button"
          onClick={() => setShowDesktop(true)}
        >
          ENTER
        </button>
      </div>
    );
  }

  return (
    <div className="desktop-container">
      <div className="monitor">
        <div className="monitor-header">
          LUCA OS
        </div>

        <div className="desktop">
          {folders.map((folder, index) => (
            <div
              key={folder}
              className="folder"
              onClick={() => {
                if (folder === "About Me") {
                  setActiveFolder("about");
                }
              }}
            >
              <div
                className="folder-icon"
                style={{
                  color: [
                    "#00F5FF",
                    "#7B61FF",
                    "#00FF88",
                    "#FFC857",
                    "#FF6B6B",
                  ][index],
                }}
              >
                📁
              </div>

              <span
                style={{
                  color: [
                    "#00F5FF",
                    "#7B61FF",
                    "#00FF88",
                    "#FFC857",
                    "#FF6B6B",
                  ][index],
                }}
              >
                {folder}
              </span>
            </div>
          ))}
        </div>
      </div>

      {activeFolder === "about" && (
        <div className="card-overlay">
          <div className="about-card">
            <div className="card-header">
              <span>ABOUT_ME.exe</span>

              <button
                className="card-close"
                onClick={() => setActiveFolder(null)}
              >
                ×
              </button>
            </div>

            <div className="card-content">
              <h2>About Me</h2>

              <p className="about-intro">
                Digital Support & Data Analyst con esperienza nella trasformazione
                digitale dei processi aziendali. Mi occupo di automazione, analisi
                dei dati e soluzioni Microsoft 365, con particolare attenzione
                all'efficienza operativa e all'innovazione. Appassionato di
                tecnologia, apprendimento continuo e problem solving, cerco sempre
                di comprendere a fondo i sistemi prima di implementarli.
              </p>

              <div className="about-section-title">
                Interests & Hobbies
              </div>

              <div className="hobby-placeholder">
                <span>MODULE_01</span>

                <strong>Anime & Manga</strong>

                <div className="anime-panel-container">
                  <img
                    src={narutoPanel}
                    alt="Naruto Panel"
                    className="anime-panel"
                  />
                </div>

                <div className="anime-content">
                  <h3>Naruto</h3>

                  <p>
                    Guardo anime e leggo manga da molti anni e Naruto è da sempre la mia opera
                    preferita.
                  </p>

                  <p>
                    Mi ha insegnato a non arrendermi davanti alle difficoltà, a migliorarmi
                    costantemente e a perseguire gli obiettivi con determinazione.
                  </p>

                  <p>
                    Mi ha inoltre trasmesso l'importanza del lavoro di squadra e della fiducia
                    reciproca, valori che applico anche nella vita professionale.
                  </p>

                  <div className="learned-values">
                    <h4>LEARNED VALUES</h4>

                    <ul>
                      <li>Perseveranza</li>
                      <li>Miglioramento continuo</li>
                      <li>Lavoro di squadra</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="hobby-placeholder">
                <span>MODULE_02</span>

                <strong>Videogames</strong>

                <div className="anime-panel-container">
                  <img
                    src={theLastOfUsImage}
                    alt="The Last of Us"
                    className="anime-panel"
                  />
                </div>

                <div className="anime-content">
                  <h3>The Last of Us</h3>

                  <p>
                    Gioco ai videogiochi fin da bambino e nel corso degli anni hanno spesso
                    rappresentato un luogo dove rifugiarmi, rilassarmi e vivere storie capaci
                    di lasciare qualcosa.
                  </p>

                  <p>
                    The Last of Us è il titolo che più mi ha colpito. Mi ha insegnato che ogni
                    azione ha delle conseguenze e che dietro ogni scelta esistono sempre motivazioni
                    che spesso non sono immediatamente visibili.
                  </p>

                  <p>
                    Mi ha portato a guardare persone e situazioni con maggiore comprensione,
                    cercando di capire le cause prima di fermarmi alle apparenze.
                  </p>

                  <div className="learned-values">
                    <h4>LEARNED VALUES</h4>

                    <ul>
                      <li>Empatia</li>
                      <li>Consapevolezza delle conseguenze</li>
                      <li>Comprendere le motivazioni</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;