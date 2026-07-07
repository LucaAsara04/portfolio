import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const [showDesktop, setShowDesktop] = useState(false);

  const [visibleLines, setVisibleLines] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

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

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setVisibleLines((prev) => [...prev, bootLines[index]]);
      index++;

      if (index >= bootLines.length) {
        clearInterval(interval);

        setTimeout(() => {
          setBootComplete(true);
        }, 1000);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const folders = [
    "About Me",
    "Istruzione e Formazione",
    "Esperienze Professionali",
    "Competenze",
    "Contatti"
  ];

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
            <span className="cursor">█</span>
          </div>
        </div>
      </div>
    );
  }

  if (!showDesktop) {
    return (
      <div className="welcome-screen">
        <div className="hero-title">
          <h1 className="hero-name">ASARA LUCA</h1>
          <h2 className="hero-role">Digital Support & Data Analyst</h2>
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
          {folders.map((folder) => (
            <div key={folder} className="folder">
              <div className="folder-icon">📁</div>
              <span>{folder}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;
``