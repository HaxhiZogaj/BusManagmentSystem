import { ColumnDirective, ColumnsDirective, Edit, Filter, GridComponent, Inject, Page, Sort, Toolbar } from "@syncfusion/ej2-react-grids";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Pasagjeret = () => {
  const filterSettings = { type: "Excel" };
  const toolbarOptions = ["Add", "Edit", "Delete", "Update", "Cancel"];
  const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
  const pageSettings = { pageCount: 5 };
  let gridInstance;
const navigate = useNavigate();
  const [pasagjeret, setPasagjeret] = useState([]);

  useEffect(() => {
    fetchPasagjeret();
  }, []);

  const fetchPasagjeret = async () => {
    try {
      const response = await axios.get("https://localhost:7255/api/Pasagjeret/list");
      setPasagjeret(response.data);
    } catch (error) {
      console.error("Error fetching Pasagjerët:", error);
    }
  };
  function actionBegin(args) {
    if (args.requestType === "save") {
      args.cancel = true;
      if (args.action === "add") {
        axios.post("https://localhost:7255/api/Pasagjeret/add", args.data).then(() => fetchPasagjeret());
      } else {
        axios.put("https://localhost:7255/api/Pasagjeret/update", args.data).then(() => fetchPasagjeret());
      }
    } 
    else if (args.requestType === "delete") {
      args.cancel = true;
       const confirmed = window.confirm("Are you sure you want to delete this passenger?");
    if (!confirmed) {
      console.log("Deletion canceled.");
      return;
    }
      axios.delete(`https://localhost:7255/api/Pasagjeret/delete/${args.data[0].pasagjeriId}`).then(() => fetchPasagjeret());
    }
  } 

  return (
    <div className="control-pane">
      <div className="control-section full-screen">
        <h2 className="title">Detajet e Pasagjerëve</h2>
        <p className="description">
         Shikoni dhe përditësoni detajet e pasagjerëve për çdo rezervim dhe udhëtim si dhe editim per ndryshim te pasagjerve egzisutes.
        </p>
             <div className="back-arrow" onClick={() => navigate("/home")}>
  <span className="arrow">←</span> Kthehu
        </div>
        <GridComponent  dataSource={pasagjeret} ref={(grid) => (gridInstance = grid)} toolbar={toolbarOptions} allowSorting={true} allowFiltering={true} filterSettings={filterSettings} allowPaging={true} editSettings={editSettings} pageSettings={pageSettings} actionBegin={actionBegin.bind(this)} >
          <ColumnsDirective>
            <ColumnDirective field="PasagjeriId" headerText="ID" isPrimaryKey={true} visible={false} />
            <ColumnDirective field="Emri" headerText="Emri" validationRules={{ required: true }} />
            <ColumnDirective field="Email" headerText="Email" validationRules={{ required: true }} />
            <ColumnDirective field="NumriTelefonit" headerText="Numri Telefonit" validationRules={{ required: true }} />
            <ColumnDirective field="DataKrijimit" headerText="Data Krijimit" editType="datetimepickeredit" />
          </ColumnsDirective>
          <Inject services={[Page, Toolbar, Edit, Sort, Filter]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default Pasagjeret;