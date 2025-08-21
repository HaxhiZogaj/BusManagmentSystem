import { ColumnDirective, ColumnsDirective, Edit, Filter, GridComponent, Inject, Page, Sort, Toolbar } from "@syncfusion/ej2-react-grids";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Rezervimet= () => {
  const filterSettings = { type: "Excel" };
  const toolbarOptions = ["Add", "Edit", "Delete", "Update", "Cancel"];
  const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true ,  mode: "Dialog"};
  const pageSettings = { pageCount: 5 };
  let gridInstance;

  const [rezervimet, setRezervimet] = useState([]);
  const [pasagjeret, setPasagjeret] = useState([]);
  const [oraret, setOraret] = useState([]);
const navigate = useNavigate();
  useEffect(() => {
    fetchRezervimet();
    fetchPasagjeret();
    fetchOraret();
  }, []);

  const fetchRezervimet = async () => {
    try {
      const response = await axios.get("https://localhost:7255/api/rezervimet/list");
      setRezervimet(response.data);
    } catch (error) {
      console.error(" Error fetching Rezervimet:", error);
    }
  };

  const fetchPasagjeret = async () => {
    try {
      const response = await axios.get("https://localhost:7255/api/Pasagjeret/selectForDropdown");
      setPasagjeret(response.data);
      console.log("✅ Updated Pasagjeret:", response.data); 
    } catch (error) {
      console.error("Error fetching Pasagjeret:", error);
    }
  };
  
  const fetchOraret = async () => {
    try {
      const response = await axios.get("https://localhost:7255/api/Oraret/selectForDropdown");
      setOraret(response.data);
      console.log("Updated Oraret:", response.data); 
    } catch (error) {
      console.error("Error fetching Oraret:", error);
    }
  };

  function actionBegin(args) {
    if (args.requestType === "save") {
      args.cancel = true;
      if (args.action === "add") {
        axios.post("https://localhost:7255/api/Rezervimet/add", args.data).then(() => fetchRezervimet());
      } else {
        axios.put("https://localhost:7255/api/Rezervimet/update", args.data).then(() => fetchRezervimet());
      }
    } else if (args.requestType === "delete") {
      args.cancel = true;
      axios.delete(`https://localhost:7255/api/Rezervimet/delete/${args.data[0].rezervimiId}`).then(() => fetchRezervimet());
    }
  }

  return (
    <div className="control-pane">
      <div className="control-section full-screen">
        <h2 className="title">Përmbledhje e Rezervimeve</h2>
        <p className="description">
        Monitoroni të gjitha rezervimet, duke përfshirë vendet e rezervuara, datat dhe rrugët për çdo udhëtim.
        </p>
             <div className="back-arrow" onClick={() => navigate("/home")}>
  <span className="arrow">←</span> Kthehu
        </div>
        <GridComponent  dataSource={rezervimet} ref={(grid) => (gridInstance = grid)} toolbar={toolbarOptions} allowSorting={true} allowFiltering={true} filterSettings={filterSettings} allowPaging={true} editSettings={editSettings}  pageSettings={pageSettings} actionBegin={actionBegin.bind(this)} >
          <ColumnsDirective>
            <ColumnDirective field="RezervimiId" headerText="ID" isPrimaryKey={true} visible={false} />
            <ColumnDirective field="NumriVendit" headerText="Numri Vendit" type="number" validationRules={{ required: true }} />
            <ColumnDirective field="Statusi" headerText="Statusi" validationRules={{ required: true }} />          
            <ColumnDirective  field="DataKrijimit"  headerText="Data Krijimit"  editType="datetimepickeredit" format="M/d/y hh:mm a" />
            <ColumnDirective field="PasagjeriId" headerText="Pasagjeri" editType="dropdownedit" edit={{   params: {    popupHeight: "300px",   dataSource: pasagjeret.length ? pasagjeret : [],     fields: { text: "pasagjeriName", value: "pasagjeriId" } } }} />
            <ColumnDirective field="OrariId" headerText="Orari" editType="dropdownedit" edit={{   params: {   popupHeight: "300px",  dataSource: oraret.length ? oraret : [],   fields: { text: "OrariName", value: "OrariId" } } }}/>
          </ColumnsDirective>
          <Inject services={[Page, Toolbar, Edit, Sort, Filter]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default Rezervimet;