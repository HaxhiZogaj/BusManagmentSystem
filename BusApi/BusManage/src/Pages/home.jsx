import "../styles/home.css";

import biletatImage from "../assets/bileta.jpg";
import busesImage from "../assets/busat.jpg";
import orariImage from "../assets/orariUdhtimeve.jpg";
import pasagjerImage from "../assets/passagjerat.jpg";
import rezervimeImage from "../assets/rezervimet.jpg";
import rrugetImage from "../assets/rruget.jpg";
import shoferImage from "../assets/shoferi.jpg";
const Home = () => {
  return (
    <main className="main">
      <h2>Sistemi i Menaxhimit të Autobusëve</h2>
      <p>
        Ky sistem ofron një mënyrë efikase për menaxhimin e autobusëve, orareve, pasagjerëve, rezervimeve dhe biletave.
        Me këtë platformë, mund të mbikëqyrni të gjitha aspektet e transportit publik.
      </p>
      <div className="section-container">

        <section className="section">
          <h2>Oraret ⏰</h2>
          <p>
            Organizimi i orareve të autobusëve është një nga faktorët më kritikë për garantimin e efikasitetit të sistemit të transportit publik.
            Çdo itinerar është i përcaktuar në mënyrë të qartë, duke siguruar se autobusët mbërrijnë në kohën e duhur dhe minimizohen vonesat.
          </p>
          <img src={orariImage} alt="Oraret e udhëtimeve" className="image-placeholder" />
          <button className="button" onClick={() => window.location.href = "/oraret"}>Menaxho Oraret</button>
        </section>

        <section className="section">
          <h2>Biletat 🎫</h2>
          <p>
            Biletat janë dokumente elektronike që sigurojnë hyrjen e pasagjerëve në udhëtimet e rezervuara. Çdo biletë ka një numër unik që e identifikon atë dhe një çmim të përcaktuar,
            në varësi të distancës dhe destinacionit. Biletat mund të rezervohen online ose në stacionet e autobusëve.
          </p>
          <img src={biletatImage} alt="Biletat" className="image-placeholder" />
          <button className="button" onClick={() => window.location.href = "/biletat"}>Menaxho Biletat</button>
        </section>


        <section className="section">
          <h2>Autobusët 🚌</h2>
          <p>
            Monitoro flotën e autobusëve, statusin dhe kapacitetin. Çdo autobus ka një numër unik që e identifikon atë, dhe informacion mbi kushtet e tij operacionale.
            Me këtë sistem, operatorët mund të caktojnë itinerarin e autobusëve në mënyrë më të strukturuar dhe të analizojnë të dhënat e performancës.
          </p>
          <img src={busesImage} alt="Autobusët" className="image-placeholder" />
          <button className="button" onClick={() => window.location.href = "/buses"}>Menaxho Autobusët</button>
        </section>


        <section className="section">
          <h2>Rezervimet 📅</h2>
          <p>
            Menaxho rezervimet e udhëtimeve shpejt dhe lehtë. Pasagjerët mund të bëjnë rezervime online ose fizikisht në stacionet e autobusëve.
            Çdo rezervim është i dokumentuar në sistem për një proces më transparent dhe të organizuar.
          </p>

          <img src={rezervimeImage} alt="Rezervimet" className="image-placeholder" />
          <button className="button" onClick={() => window.location.href = "/rezervimet"}>Menaxho Rezervimet</button>
        </section>


        <section className="section">
          <h2>Rrugët 📍</h2>
          <p>
            Planifiko dhe optimizo rrugët për udhëtime më të mira. Rrugët përcaktojnë destinacionet e udhëtimeve dhe lidhin vendet ku operojnë autobusët.
            Menaxhimi i rrugëve ndihmon në organizimin më të mirë të udhëtimeve dhe minimizimin e vonesave të panevojshme.
          </p>
          <img src={rrugetImage} alt="Rrugët" className="image-placeholder" />
          <button className="button" onClick={() => window.location.href = "/rruget"}>Menaxho Rrugët</button>
        </section>

      
        <section className="section">
          <h2>Pasagjerët 👥</h2>
          <p>
            Pasagjerët janë zemra e sistemit të transportit publik. Çdo udhëtar ka profilin e tij unik, duke lejuar menaxhimin efikas të të dhënave dhe rezervimeve.
            Informacioni i pasagjerëve ruhet në mënyrë të sigurt, duke mundësuar personalizimin e shërbimit.
          </p>

          <img src={pasagjerImage} alt="Pasagjerët" className="image-placeholder" />
          <button className="button" onClick={() => window.location.href = "/pasagjeret"}>Menaxho Pasagjerët</button>
        </section>

       
        <section className="section">
          <h2>Shoferët 🚍</h2>
          <p>
            Menaxho shoferët dhe detajet e licencimit të tyre. Çdo shofer ka një numër licence unik që e identifikon atë,
            duke mundësuar një sistem më të organizuar për monitorimin e shoferëve.
          </p>

          <img src={shoferImage} alt="Shoferët" className="image-placeholder" />
          <button className="button" onClick={() => window.location.href = "/shoferet"}>Menaxho Shoferët</button>
        </section>
      </div>
    </main>
  );
};

export default Home;