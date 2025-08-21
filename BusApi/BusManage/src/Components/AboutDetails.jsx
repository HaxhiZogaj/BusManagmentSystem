import { useState } from "react";
import { FaBus, FaBusAlt, FaClock, FaGlobe, FaMapMarkerAlt, FaShieldAlt, FaTicketAlt, FaTools, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/AboutDetail.css";

const cardData = [
  {
    icon: <FaMapMarkerAlt />,
    title: "Rrugët Kryesore",
    text: "Lidhje të forta ndërmjet qyteteve si Prishtinë, Pejë, Ferizaj dhe Mitrovicë.",
    more: "Rrugët janë të mirëmbajtura dhe përfshijnë ndriçim LED, sinjalizim të avancuar dhe stacione ndihmëse për pasagjerët.",
  },
  {
    icon: <FaTicketAlt />,
    title: "Sistemi i Biletave",
    text: "Biletim elektronik, kartela digjitale dhe rezervime online për lehtësi dhe shpejtësi.",
    more: "Përdoruesit mund të përdorin aplikacione mobile për të blerë bileta dhe për të menaxhuar udhëtimet e tyre.",
  },
  {
    icon: <FaClock />,
    title: "Menaxhimi i Orarit",
    text: "Orar i sinkronizuar në kohë reale për nisje dhe mbërritje të planifikuara.",
    more: "Të gjitha oraret përditësohen automatikisht bazuar në trafikun dhe kushtet e rrugës.",
  },
  {
    icon: <FaBus />,
    title: "Flota Moderne",
    text: "Autobusë me WiFi, ndjekje GPS, klimatizim dhe teknologji ekologjike.",
    more: "Autobusët janë miqësorë me ambientin dhe përputhen me standardet evropiane për emetimet.",
  },
  {
    icon: <FaUsers />,
    title: "Pasagjerët Tanë",
    text: "Studentë, udhëtarë biznesi, familje dhe turistë të gjithë të përfshirë.",
    more: "Kemi platforma të personalizuara për nevojat e secilit grup të pasagjerëve.",
  },
  {
    icon: <FaTools />,
    title: "Zgjidhjet Teknike",
    text: "Përdorim inteligjencë artificiale për analizë të fluksit dhe optimizim të linjave.",
    more: "Analizat na ndihmojnë të rishikojmë linjat çdo muaj për të përmirësuar efikasitetin.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Siguria & Shoferët",
    text: "Trajnime moderne dhe sensorë për parandalimin e aksidenteve.",
    more: "Shoferët certifikohen çdo 6 muaj dhe mjetet kalojnë kontrolle teknike rigoroze.",
  },
  {
    icon: <FaGlobe />,
    title: "E Ardhmja",
    text: "Investime në autobusë elektrikë, stacione të zgjuara dhe digjitalizim të plotë.",
    more: "Po zhvillojmë një platformë kombëtare të menaxhimit të transportit në kohë reale.",
  },
   {
    icon: <FaBusAlt />,
    title: "Interieri",
    text: "Interieri ne autobusët elektrike jane mjaft te avancuara",
    more: "Perfshihet klim,ventilim,karrige me ftofje,karrige dehidruese dhe rahati ngjyrash qe pushojne syte",
  },
];


const AboutDetails = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
 const [isSidebarOpen, setIsSidebarOpen] = useState(true);
 
  const toggleMoreInfo = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  const navigate = useNavigate();


  return (
    <section className="about-us-section">
   <div
  className={`back-arrow1 ${isSidebarOpen ? 'arrow-open' : 'arrow-closed'}`}
  onClick={() => navigate("/aboutus")}>
  ← Kthehu
</div>


      <div className="about-us-wrapper">

          <div className="intro-text">
          <p>
            <strong>ATPK - Autoriteti i Transportit Publik të Kosovës</strong> është një institucion i avancuar për menaxhimin inteligjent të transportit publik në vend. Ne ofrojmë platforma moderne për flotën, biletimin, oraret dhe rezervimet.
          </p>
        </div>
        <div className="about-grid">
          {cardData.map((card, index) => (
            <div key={index} className="about-card-container">
              <div className="about-card">
                <div className="about-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <button
                  className="learn-more-btn"
                  onClick={() => toggleMoreInfo(index)}
                >
                  {expandedIndex === index ? "Mbylle" : "Njoftohu më shumë"}
                </button>
              </div>
              {expandedIndex === index && (
                <div className="about-card-details">
                  <p>{card.more}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutDetails;


