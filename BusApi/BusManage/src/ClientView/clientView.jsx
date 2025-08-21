import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Inject, Page, Sort } from "@syncfusion/ej2-react-grids";
import axios from "axios";
import { useEffect, useState } from "react";
import './client.css';

const ClientView = () => {
  const [biletat, setBiletat] = useState([]);
  const [buses, setBuses] = useState([]);
  const [oraret, setOraret] = useState([]);
  const [rezervimet, setRezervimet] = useState([]);
  const [pasagjeret, setPasagjeret] = useState([]);
  const [rruget, setRruget] = useState([]);
  const [shoferet, setShoferet] = useState([]);
  const [showDetails, setShowDetails] = useState(false); const toggleDetails = () => { setShowDetails(!showDetails); };
  const [showBuses, setShowBuses] = useState(false); const toggleBuses = () => setShowBuses(!showBuses);
  const [showOraret, setShowOraret] = useState(false); const toggleOraret = () => setShowOraret(!showOraret);
  const [showRezervimet, setShowRezervimet] = useState(false); const [showPasagjeret, setShowPasagjeret] = useState(false);
  const toggleRezervimet = () => setShowRezervimet(!showRezervimet); const togglePasagjeret = () => setShowPasagjeret(!showPasagjeret);
  const [showRruget, setShowRruget] = useState(false); const [showShoferet, setShowShoferet] = useState(false);
  const toggleRruget = () => setShowRruget(!showRruget); const toggleShoferet = () => setShowShoferet(!showShoferet);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setBiletat((await axios.get("https://localhost:7255/api/Biletat/list")).data);
      setBuses((await axios.get("https://localhost:7255/api/Bus/list")).data);
      setOraret((await axios.get("https://localhost:7255/api/Oraret/list")).data);
      setRezervimet((await axios.get("https://localhost:7255/api/Rezervimet/list")).data);
      setPasagjeret((await axios.get("https://localhost:7255/api/Pasagjeret/list")).data);
      setRruget((await axios.get("https://localhost:7255/api/Rruget/list")).data);
      setShoferet((await axios.get("https://localhost:7255/api/Shoferet/list")).data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="client-view-container">
    <section className="prishtina-urban-info">
     <h2>Informacione për Transportin Urban në Prishtinë</h2>

  <div className="info-item">
    <h3>🚍 Ku mund të blini biletat?</h3>
    <p>Biletat për transportin urban në Prishtinë mund të blihen në autobus, tek pikat e shitjes së biletave, dhe përmes aplikacionit zyrtar të transportit urban. Pika të ndryshme për biletat janë të shpërndara në të gjithë qytetin.</p>
  </div>
  <hr></hr>

  <div className="info-item">
    <h3>🚌 Linjat e Autobusëve dhe Rrugët</h3>
    <p>Transporti urban ofrohet nga një rrjet autobusësh që mbulojnë të gjithë qytetin, duke lidhur zonat më të largëta me qendrën. Secili autobus kalon përmes disa pikave të ndalesave dhe ka një itinerar të përcaktuar që mund të shikohet online ose në aplikacion.</p>
    <ul>
      <li>Linja 1: Qendra – Lagjia e Dajti – Ura e Llukës – Sheshi Zahir Pajaziti</li>
      <li>Linja 2: Qendra – Fushë Kosovë – Terminali i Autobusëve</li>
      <li>Linja 3: Qendra – Prishtinë Lindore – Lagjia e Dajti</li>
      <li>Linja 4: Qendra – Llapi – Fakulteti i Shkencave Sociale</li>
    </ul>
  </div>
  <hr></hr>

  <div className="info-item">
    <h3>🕒 Orari i Autobusëve</h3>
    <p>Autobuset janë të disponueshme çdo ditë nga ora 06:00 deri në 22:00. Intervalet e ndalesave janë çdo 15-20 minuta në orët e pikut, dhe çdo 30 minuta pas orës 20:00. Informacioni për oraret dhe ndalesat mund të kontrollohet përmes aplikacionit ose faqes së internetit të transportit urban.</p>
  </div>
<hr></hr>

  <div className="info-item">
    <h3>📅 Si të bëni Rezervim?</h3>
    <p>Për të bërë rezervim, përdorni aplikacionin mobil të transportit urban. Ky mundëson rezervimin e vendit në autobus nëpërmjet një sistemi të thjeshtë dhe të sigurt.</p>
  </div>
<hr></hr>

  <div className="info-item">
    <h3>👤 Pasagjerët dhe Regjistrimi në Autobus</h3>
    <p>Pasagjerët mund të kontrollojnë nëse janë regjistruar për një udhëtim përmes aplikacionit. Aplikacioni tregon statusin e regjistrimit dhe mundësinë për të bërë ndryshime nëse është e nevojshme.</p>
  </div>
  <hr></hr>

  <div className="info-item">
    <h3>🚎 Shoferët e Autobusëve</h3>
    <p>Shoferët e autobusëve janë të trajnuar dhe të certifikuar për të ofruar një shërbim të sigurt dhe të besueshëm. Ata gjithashtu kontrollojnë çdo pasagjer për sigurinë dhe ndihmojnë në rastet e nevojshme.</p>
  </div>
</section>


<div className="collapsible-wrapper">
        <div className="collapsible-item">
          <div className="description-container" onClick={toggleDetails}>
            <p>📜 <strong>Biletat:</strong> Klikoni për të parë bileten tuaj.</p>
            <span className={`arrow ${showDetails ? "open" : ""}`}>&#9660;</span>
          </div>
          <div className={`grid-container ${showDetails ? "show" : ""}`}>
            <GridComponent dataSource={biletat} allowPaging allowSorting allowFiltering filterSettings={{ type: "Excel" }}>
              <ColumnsDirective>
                <ColumnDirective field="NumriBiletës" headerText="Numri Biletës" />
                <ColumnDirective field="Çmimi" headerText="Çmimi" type="number" />
              </ColumnsDirective>
              <Inject services={[Page, Sort, Filter]} />
            </GridComponent>
          </div>
        </div>

        <div className="collapsible-item">
          <div className="description-container" onClick={toggleBuses}>
            <p>🚌 <strong>Autobuset:</strong> Klikoni për të parë autobusat.</p>
            <span className={`arrow ${showBuses ? "open" : ""}`}>&#9660;</span>
          </div>
          <div className={`grid-container ${showBuses ? "show" : ""}`}>
            <GridComponent dataSource={buses} allowPaging allowSorting allowFiltering filterSettings={{ type: "Excel" }}>
              <ColumnsDirective>
                <ColumnDirective field="BusId" headerText="ID" isPrimaryKey={true} visible={false} />
                <ColumnDirective field="NumriTargës" headerText="Numri Targës" />
                <ColumnDirective field="Kapaciteti" headerText="Kapaciteti" type="number" />
                <ColumnDirective field="Statusi" headerText="Statusi" />
                <ColumnDirective field="DataKrijimit" headerText="Data Krijimit" />
              </ColumnsDirective>
              <Inject services={[Page, Sort, Filter]} />
            </GridComponent>
          </div>
        </div>
      </div>

      <div className="collapsible-wrapper">
        <div className="collapsible-item">
          <div className="description-container" onClick={toggleOraret}>
            <p>⏰ <strong>Oraret:</strong> Klikoni për të parë Oraret.</p>
            <span className={`arrow ${showOraret ? "open" : ""}`}>&#9660;</span>
          </div>
          <div className={`grid-container ${showOraret ? "show" : ""}`}>
            <GridComponent dataSource={oraret} allowPaging allowSorting allowFiltering filterSettings={{ type: "Excel" }}>
              <ColumnsDirective>
                <ColumnDirective field="OrariId" headerText="ID" isPrimaryKey={true} visible={false} />
                <ColumnDirective field="KohaNisjes" headerText="Koha Nisjes" editType="datetimepickeredit" />
                <ColumnDirective field="KohaArritjes" headerText="Koha Arritjes" editType="datetimepickeredit" />
                <ColumnDirective field="Statusi" headerText="Statusi" validationRules={{ required: true }} />
                <ColumnDirective field="DataKrijimit" headerText="Data Krijimit" editType="datetimepickeredit" />
              </ColumnsDirective>
              <Inject services={[Page, Sort, Filter]} />
            </GridComponent>
          </div>
        </div>

        <div className="collapsible-item">
          <div className="description-container" onClick={toggleRezervimet}>
            <p>📌 <strong>Rezervimet:</strong> Klikoni për të parë ose fshehur listën e rezervimeve të pasagjerëve.</p>
            <span className={`arrow ${showRezervimet ? "open" : ""}`}>&#9660;</span>
          </div>
          <div className={`grid-container ${showRezervimet ? "show" : ""}`}>
            <GridComponent dataSource={rezervimet} allowPaging allowSorting allowFiltering filterSettings={{ type: "Excel" }}>
              <ColumnsDirective>
                <ColumnDirective field="RezervimiId" headerText="ID" isPrimaryKey={true} visible={false} />
                <ColumnDirective field="NumriVendit" headerText="Numri Vendit" type="number" validationRules={{ required: true }} />
                <ColumnDirective field="Statusi" headerText="Statusi" validationRules={{ required: true }} />
              </ColumnsDirective>
              <Inject services={[Page, Sort, Filter]} />
            </GridComponent>
          </div>
        </div>
      </div>

      <div className="collapsible-wrapper">
        <div className="collapsible-item">
          <div className="description-container" onClick={togglePasagjeret}>
            <p>🧍 <strong>Pasagjerët:</strong> Klikoni për të shfaqur ose fshehur të dhënat e pasagjerëve.</p>
            <span className={`arrow ${showPasagjeret ? "open" : ""}`}>&#9660;</span>
          </div>
          <div className={`grid-container ${showPasagjeret ? "show" : ""}`}>
            <GridComponent dataSource={pasagjeret} allowPaging allowSorting allowFiltering filterSettings={{ type: "Excel" }}>
              <ColumnsDirective>
                <ColumnDirective field="PasagjeriId" headerText="ID" isPrimaryKey={true} visible={false} />
                <ColumnDirective field="Emri" headerText="Emri" validationRules={{ required: true }} />
                <ColumnDirective field="Email" headerText="Email" validationRules={{ required: true }} />
                <ColumnDirective field="NumriTelefonit" headerText="Numri Telefonit" validationRules={{ required: true }} />
                <ColumnDirective field="DataKrijimit" headerText="Data Krijimit" editType="datetimepickeredit" />
              </ColumnsDirective>
              <Inject services={[Page, Sort, Filter]} />
            </GridComponent>
          </div>
        </div>

        <div className="collapsible-item">
          <div className="description-container" onClick={toggleRruget}>
            <p>🛣️ <strong>Rrugët:</strong> Klikoni për të parë detajet e itinerarit, origjinën dhe destinacionin.</p>
            <span className={`arrow ${showRruget ? "open" : ""}`}>&#9660;</span>
          </div>
          <div className={`grid-container ${showRruget ? "show" : ""}`}>
            <GridComponent dataSource={rruget} allowPaging allowSorting allowFiltering filterSettings={{ type: "Excel" }}>
              <ColumnsDirective>
                <ColumnDirective field="RrugaId" headerText="ID" isPrimaryKey={true} visible={false} />
                <ColumnDirective field="Origjina" headerText="Origjina" validationRules={{ required: true }} />
                <ColumnDirective field="Destinacioni" headerText="Destinacioni" validationRules={{ required: true }} />
                <ColumnDirective field="Distanca" headerText="Distanca" type="number" validationRules={{ required: true }} />
                <ColumnDirective field="DataKrijimit" headerText="Data Krijimit" editType="datetimepickeredit" />
              </ColumnsDirective>
              <Inject services={[Page, Sort, Filter]} />
            </GridComponent>
          </div>
        </div>
      </div>

      <div className="collapsible-wrapper">
        <div className="collapsible-item">
          <div className="description-container" onClick={toggleShoferet}>
            <p>👨‍✈️ <strong>Shoferët:</strong> Klikoni për të parë të dhënat e shoferëve dhe licencat përkatëse.</p>
            <span className={`arrow ${showShoferet ? "open" : ""}`}>&#9660;</span>
          </div>
          <div className={`grid-container ${showShoferet ? "show" : ""}`}>
            <GridComponent dataSource={shoferet} allowPaging allowSorting allowFiltering filterSettings={{ type: "Excel" }}>
              <ColumnsDirective>
                <ColumnDirective field="ShoferiId" headerText="ID" isPrimaryKey={true} visible={false} />
                <ColumnDirective field="Emri" headerText="Emri" validationRules={{ required: true }} />
                <ColumnDirective field="NumriLicencës" headerText="Numri Licencës" validationRules={{ required: true }} />
                <ColumnDirective field="DataKrijimit" headerText="Data Krijimit" editType="datetimepickeredit" />
              </ColumnsDirective>
              <Inject services={[Page, Sort, Filter]} />
            </GridComponent>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ClientView;