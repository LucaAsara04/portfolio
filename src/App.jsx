import { useState, useEffect } from "react";
import "./App.css";

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
  "Contatti"
];

function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const [showDesktop, setShowDesktop] = useState(false);
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