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
  "Istruzione e Formazione",
  "Esperienze Professionali",
  "Competenze",
  "Contatti",
  "Progetti",
  "About Me"
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

  const [contactVisibleLines, setContactVisibleLines] = useState([]);
  const [contactReady, setContactReady] = useState(false);

  const [cvGenerating, setCvGenerating] = useState(false);
  const [cvProgress, setCvProgress] = useState(0);
  const [cvReady, setCvReady] = useState(false);
  const [cvVisibleLines, setCvVisibleLines] = useState([]);

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

  useEffect(() => {
    if (activeFolder !== "contacts") {
      setContactVisibleLines([]);
      setContactReady(false);
      setCvGenerating(false);
      setCvProgress(0);
      setCvReady(false);
      setCvVisibleLines([]);
      return;
    }

    const contactLines = [
      "Initializing communication module...",
      "Searching available channels...",
      "[OK] Email channel detected",
      "[OK] Phone channel detected",
      "[OK] LinkedIn profile detected",
      "[OK] GitHub repository detected",
      "Connection established."
    ];

    let index = 0;

    const interval = setInterval(() => {
      setContactVisibleLines((prev) => [
        ...prev,
        contactLines[index]
      ]);

      index++;

      if (index >= contactLines.length) {
        clearInterval(interval);

        setTimeout(() => {
          setContactReady(true);
        }, 2500);
      }
    }, 900);

    return () => clearInterval(interval);
  }, [activeFolder]);


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

        <div className="matrix-background">
          {Array.from({ length: 40}).map((_, index) => (
            <div
              key={index}
              className="matrix-column"
              style={{
                left: `${index * 2.5}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${8 + Math.random() * 8}s`,
              }}
            >
              {Array.from({ length: 25 }).map((_, i) => (
                <span key={i}>
                  {Math.random() > 0.5 ? "1" : "0"}
                </span>
              ))}
            </div>
          ))}
        </div>

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

  const handleGenerateCv = () => {
    setCvGenerating(true);
    setCvReady(false);
    setCvProgress(0);
    setCvVisibleLines([]);

    const generationSteps = [
      {
        progress: 20,
        text: "Collecting profile data... [OK]",
      },
      {
        progress: 40,
        text: "Extracting education modules... [OK]",
      },
      {
        progress: 60,
        text: "Analyzing professional experience... [OK]",
      },
      {
        progress: 80,
        text: "Loading skills database... [OK]",
      },
      {
        progress: 100,
        text: "Building PDF document... [OK]",
      },
    ];

    let stepIndex = 0;

    const interval = setInterval(() => {
      const currentStep = generationSteps[stepIndex];

      setCvProgress(currentStep.progress);

      setCvVisibleLines((prev) => [
        ...prev,
        currentStep.text,
      ]);

      stepIndex++;

      if (stepIndex >= generationSteps.length) {
        clearInterval(interval);

        setTimeout(() => {
          setCvReady(true);

          const link = document.createElement("a");
          link.href = `${import.meta.env.BASE_URL}cv/CV_Luca_Asara.pdf`;
          link.download = "CV_Luca_Asara.pdf";

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, 2000);
      }
    }, 1000);
  };


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

                if (folder === "Istruzione e Formazione") {
                  setActiveFolder("education");
                }

                if (folder === "Esperienze Professionali") {
                  setActiveFolder("experience");
                }

                if (folder === "Competenze") {
                  setActiveFolder("skills");
                }

                if (folder === "Contatti") {
                  setActiveFolder("contacts");
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
                    "#d22626",
                  ][index],
                }}
              >
                📁
              </div>

              <span
                style={{
                  color: [
                    "#00F5FF",
                    "#243ee6",
                    "#9c29e9",
                    "#fbef49",
                    "#ec9121",
                    "#ea2a2ada",
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

      {activeFolder === "education" && (
        <div className="card-overlay">
          <div className="about-card">

            <div className="card-header">
              <span>EDUCATION.log</span>

              <button
                className="card-close"
                onClick={() => setActiveFolder(null)}
              >
                ×
              </button>
            </div>

            <div className="card-content">

              <h2>Istruzione e Formazione</h2>

              <p className="about-intro">
                Il mio percorso formativo è stato orientato fin da subito
                all'informatica, ai dati e alla comprensione dei processi aziendali.
                Nel tempo ho approfondito competenze tecniche, analitiche e
                organizzative che oggi rappresentano la base del mio lavoro.
              </p>

              {/* ITS */}

              <div className="hobby-placeholder">

                <span>MODULE_01</span>

                <strong>
                  ITS Angelo Rizzoli
                </strong>

                <p
                  style={{
                    color: "#00ff88",
                    marginTop: "10px",
                    marginBottom: "20px",
                  }}
                >
                  2023 - 2025 | Big Data Specialist
                </p>

                <div className="anime-content">

                  <p>
                    Il percorso ITS come Big Data Specialist ha rappresentato un'importante
                    occasione per consolidare e approfondire le mie competenze nel mondo dei
                    dati e delle tecnologie informatiche. Durante questi due anni ho avuto modo
                    di affrontare progetti pratici, lavorando su casi reali e sviluppando un
                    approccio orientato all'analisi, alla progettazione e alla risoluzione dei
                    problemi.
                  </p>

                  <p>
                    Ho approfondito tematiche legate a database, SQL, programmazione e analisi
                    dei dati, imparando a trasformare le informazioni in strumenti utili per
                    supportare decisioni e processi aziendali. Il contesto ITS mi ha inoltre
                    permesso di sviluppare capacità di collaborazione, gestione delle attività e
                    apprendimento continuo, aspetti fondamentali in un settore in costante
                    evoluzione.
                  </p>

                  <p>
                    Grazie ai project work e alle attività svolte durante il percorso, ho potuto
                    affinare un metodo di lavoro orientato agli obiettivi, maturando una visione
                    più completa del ruolo che i dati e la tecnologia possono avere all'interno
                    delle organizzazioni.
                  </p>

                  <div className="learned-values">

                    <h4>LEARNED SKILLS</h4>

                    <ul>
                      <li>Data Analysis</li>
                      <li>SQL</li>
                      <li>Python</li>
                      <li>Machine Learning</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* SIA */}

              <div className="hobby-placeholder">

                <span>MODULE_02</span>

                <strong>
                  ISS Piero della Francesca
                </strong>

                <p
                  style={{
                    color: "#00ff88",
                    marginTop: "10px",
                    marginBottom: "20px",
                  }}
                >
                  2018 - 2023 | Sistemi Informativi Aziendali (SIA)
                </p>

                <div className="anime-content">

                  <p>
                    Il percorso di studi presso l'Istituto Piero della Francesca ha costituito
                    la base della mia formazione tecnica e professionale. Dopo il biennio comune
                    di Amministrazione, Finanza e Marketing, ho scelto di proseguire nell'indirizzo
                    Sistemi Informativi Aziendali, attirato dall'unione tra tecnologia,
                    organizzazione aziendale e gestione delle informazioni.
                  </p>

                  <p>
                    Durante gli anni del percorso SIA ho approfondito discipline legate
                    all'informatica, alla programmazione, alle reti e ai sistemi informativi,
                    sviluppando al tempo stesso competenze economiche e organizzative. Questo mi
                    ha permesso di comprendere come la tecnologia possa essere uno strumento di
                    supporto concreto per i processi aziendali.
                  </p>

                  <p>
                    Oltre alle conoscenze tecniche, questo percorso mi ha aiutato a sviluppare
                    metodo di studio, capacità analitiche e problem solving, alimentando una
                    curiosità verso il mondo dell'innovazione che mi ha poi portato a proseguire
                    gli studi nell'ambito dei dati e della trasformazione digitale.
                  </p>

                  <div className="learned-values">

                    <h4>LEARNED SKILLS</h4>

                    <ul>
                      <li>Informatica</li>
                      <li>Programmazione</li>
                      <li>Economia Aziendale</li>
                      <li>Diritto</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeFolder === "experience" && (
        <div className="card-overlay">
          <div className="about-card">

            <div className="card-header">
              <span>EXPERIENCE.sys</span>

              <button
                className="card-close"
                onClick={() => setActiveFolder(null)}
              >
                ×
              </button>
            </div>

            <div className="card-content">

              <h2>Esperienze Professionali</h2>

              <p className="about-intro">
                La mia esperienza professionale mi ha permesso di trasformare le
                competenze acquisite durante il percorso di studi in attività
                concrete, lavorando a stretto contatto con processi aziendali,
                utenti e tecnologie.
              </p>

              <div className="hobby-placeholder">

                <span>MODULE_01</span>

                <strong>FERVO SRL</strong>

                <p
                  style={{
                    color: "#00ff88",
                    marginTop: "10px",
                    marginBottom: "20px",
                  }}
                >
                  Gennaio 2025 - In Corso | Digital Support & Data Analyst
                </p>

                <div className="anime-content">

                  <p>
                    In FERVO ho l'opportunità di lavorare quotidianamente su attività
                    legate alla digitalizzazione, all'automazione dei processi e al
                    supporto agli utenti, contribuendo all'evoluzione tecnologica
                    dell'azienda e al miglioramento delle attività operative.
                  </p>

                  <p>
                    Collaboro con diversi reparti aziendali per comprendere esigenze,
                    analizzare processi e progettare soluzioni in grado di aumentare
                    efficienza, controllo e condivisione delle informazioni.
                  </p>

                  <p>
                    Nel tempo ho partecipato a progetti che coinvolgono Microsoft 365,
                    Power Automate, SharePoint, gestione dei dati, reportistica e
                    sviluppo di strumenti digitali a supporto delle attività
                    aziendali.
                  </p>

                  <p>
                    Questa esperienza mi ha permesso di comprendere l'importanza
                    dell'analisi dei processi, della comunicazione tra reparti e del
                    ruolo che la tecnologia può avere nel generare valore concreto per
                    le persone e per l'organizzazione.
                  </p>

                  <p>
                    Ogni progetto rappresenta un'occasione per continuare a imparare,
                    confrontarmi con nuove sfide e consolidare competenze tecniche e
                    relazionali che oggi considero fondamentali nel mio percorso di
                    crescita professionale.
                  </p>

                  <div className="learned-values">

                    <h4>LEARNED SKILLS</h4>

                    <ul>
                      <li>Microsoft 365</li>
                      <li>Power Automate</li>
                      <li>SharePoint</li>
                      <li>Data Analysis</li>
                      <li>Digitalization</li>
                      <li>Process Automation</li>
                      <li>User Support</li>
                      <li>Project Management</li>
                      <li>Problem Solving</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeFolder === "skills" && (
        <div className="card-overlay">
          <div className="about-card">

            <div className="card-header">
              <span>SKILLS.db</span>

              <button
                className="card-close"
                onClick={() => setActiveFolder(null)}
              >
                ×
              </button>
            </div>

            <div className="card-content">

              <h2>Competenze</h2>

              <p className="about-intro">
                Nel corso del mio percorso di studi e dell'esperienza professionale
                ho sviluppato competenze tecniche e trasversali che mi permettono
                oggi di affrontare progetti di digitalizzazione, automazione,
                gestione dati e supporto agli utenti con un approccio strutturato e
                orientato al miglioramento continuo.
              </p>

              <div className="hobby-placeholder">

                <span>MODULE_01</span>

                <strong>Hard Skills</strong>

                <div className="anime-content">

                  <p>
                    Le competenze tecniche che ho acquisito derivano dall'unione tra
                    formazione e attività svolte sul campo. Nel tempo ho avuto modo
                    di lavorare con strumenti e tecnologie legate ai dati,
                    all'automazione e agli ecosistemi Microsoft.
                  </p>

                  <p>
                    Utilizzo quotidianamente Microsoft 365, SharePoint e Power
                    Automate per supportare processi aziendali, creare soluzioni
                    digitali e migliorare l'efficienza operativa.
                  </p>

                  <p>
                    Parallelamente continuo ad approfondire SQL, Python,
                    amministrazione di sistemi e networking, con l'obiettivo di
                    comprendere sempre più a fondo il funzionamento delle tecnologie
                    che utilizzo.
                  </p>

                  <div className="learned-values">

                    <h4>TECHNICAL SKILLS</h4>

                    <ul>
                      <li>Microsoft 365</li>
                      <li>Power Automate</li>
                      <li>SharePoint</li>
                      <li>SQL</li>
                      <li>Python</li>
                      <li>Excel Advanced</li>
                      <li>Git & GitHub</li>
                      <li>Networking</li>
                      <li>Data Analysis</li>
                    </ul>

                  </div>

                </div>

              </div>

              <div className="hobby-placeholder">

                <span>MODULE_02</span>

                <strong>Soft Skills</strong>

                <div className="anime-content">

                  <p>
                    Oltre alle competenze tecniche, considero fondamentali le
                    capacità trasversali sviluppate durante gli studi e l'esperienza
                    professionale. Sono spesso queste competenze a permettere di
                    trasformare una buona idea in una soluzione realmente utile.
                  </p>

                  <p>
                    Lavorando con persone provenienti da reparti diversi ho imparato
                    l'importanza dell'ascolto, della comunicazione chiara e della
                    capacità di comprendere esigenze differenti prima di proporre una
                    soluzione.
                  </p>

                  <p>
                    Ho inoltre sviluppato un approccio orientato all'apprendimento
                    continuo, all'analisi dei problemi e alla ricerca delle cause,
                    cercando sempre di comprendere il funzionamento di un processo
                    prima di intervenire su di esso.
                  </p>

                  <div className="learned-values">

                    <h4>SOFT SKILLS</h4>

                    <ul>
                      <li>Problem Solving</li>
                      <li>Team Working</li>
                      <li>Comunicazione</li>
                      <li>Pensiero Analitico</li>
                      <li>Curiosità</li>
                      <li>Apprendimento Continuo</li>
                      <li>Gestione delle Priorità</li>
                      <li>Adattabilità</li>
                    </ul>

                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>
      )}

      {activeFolder === "contacts" && (
        <div className="card-overlay">
          <div className="about-card">

            <div className="card-header">
              <span>CONTACT_PROTOCOL.exe</span>

              <button
                className="card-close"
                onClick={() => setActiveFolder(null)}
              >
                ×
              </button>
            </div>

            <div className="card-content">

              <h2>Contatti</h2>

              <p className="about-intro">
                Questa sezione raccoglie i principali canali attraverso cui è possibile
                entrare in contatto con me, consultare i miei profili professionali
                o scaricare una versione sintetica del mio percorso in formato PDF.
              </p>

              <div className="contact-terminal">
                {contactVisibleLines.map((line, index) => (
                  <div key={index} className="contact-terminal-line">
                    {line}
                  </div>
                ))}

                {!contactReady && (
                  <span className="cursor">█</span>
                )}
              </div>

              {contactReady && (
                <>
                  <div className="contact-grid">

                    <div className="contact-card">
                      <span className="contact-icon">EMAIL</span>
                      <h3>Email</h3>
                      <p>asaraluca04@gmail.com</p>
                    </div>

                    <div className="contact-card">
                      <span className="contact-icon">PHONE</span>
                      <h3>Telefono</h3>
                      <p>+39 349 383 3442</p>
                    </div>

                    <a
                      className="contact-card"
                      href="https://www.linkedin.com/in/luca-asara-363216365/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="contact-icon">LINK</span>
                      <h3>LinkedIn</h3>
                      <p>Apri profilo professionale</p>
                    </a>

                    <a
                      className="contact-card"
                      href="https://github.com/LucaAsara04"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="contact-icon">GIT</span>
                      <h3>GitHub</h3>
                      <p>Visualizza repository</p>
                    </a>

                  </div>

                  <div className="cv-generator">

                    <div className="cv-generator-header">
                      <span>CV_GENERATOR.exe</span>
                    </div>

                    <p>
                      Simula la generazione del CV partendo dai dati del profilo,
                      dalla formazione, dall'esperienza professionale e dalle
                      competenze visualizzate nel portfolio.
                    </p>

                    {!cvGenerating && (
                      <button
                        className="generate-cv-button"
                        onClick={handleGenerateCv}
                      >
                        GENERATE CV
                      </button>
                    )}

                    {cvGenerating && (
                      <div className="cv-loading-box">

                        {cvVisibleLines.map((line, index) => (
                          <div key={index} className="cv-loading-line">
                            {line}
                          </div>
                        ))}

                        <div className="cv-progress-bar">
                          <div
                            className="cv-progress-fill"
                            style={{
                              width: `${cvProgress}%`,
                            }}
                          ></div>
                        </div>

                        <div className="cv-progress-text">
                          {cvProgress}%
                        </div>

                      </div>
                    )}

                    {cvReady && (
                      <div className="cv-ready">
                        Document ready. Download started.
                      </div>
                    )}

                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
export default App;