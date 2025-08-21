import { useNavigate } from "react-router-dom";
import aboutImage from "../assets/aboutus.jpg";
import "../styles/AboutUs.css";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <section className="aboutus-section">
      <div className="aboutus-container">
        <div className="aboutus-text">
          <h1 className="aboutus-heading">Mirë se vini te ATPK</h1>
          <p className="aboutus-description">
            <strong>Autoriteti i Transportit Publik të Kosovës (ATPK)</strong> është i
            përkushtuar në ofrimin e një sistemi modern, të sigurt dhe efikas të
            transportit publik në të gjithë vendin. Misioni ynë është të lehtësojmë
            lëvizjen e qytetarëve përmes teknologjive inteligjente dhe infrastrukturës së përparuar.
          </p>
          <p className="aboutus-description">
            Me flota të reja, bileta elektronike, sistem të avancuar orarësh dhe
            investime të vazhdueshme, jemi gjithmonë një hap përpara në përmirësimin e udhëtimeve tuaja.
          </p>
          <button className="details-button" onClick={() => navigate("/about-details")}>
            Shiko më shumë
          </button>
        </div>
        <div className="aboutus-image">
          <img src={aboutImage} alt="Transporti publik" className="aboutus-img" />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
