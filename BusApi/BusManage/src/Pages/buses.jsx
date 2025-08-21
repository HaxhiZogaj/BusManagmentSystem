import { ColumnDirective, ColumnsDirective, Edit, Filter, GridComponent, Inject, Page, Sort, Toolbar } from "@syncfusion/ej2-react-grids";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Buses = () => {
  const filterSettings = { type: "Excel" };
  const toolbarOptions = ["Add", "Edit", "Delete", "Update", "Cancel"];
  const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
  const pageSettings = { pageCount: 5 };
  let gridInstance;

  const [buses, setBuses] = useState([]);
  const [oraret, setOraret] = useState([]);
  const [shoferet, setShoferet] = useState([]);
const navigate = useNavigate();
  useEffect(() => {
    fetchBuses();
    fetchOraret();
    fetchShoferet();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await axios.get("https://localhost:7255/api/Bus/list");
      setBuses(response.data);
    } catch (error) {
      console.error("Error fetching Buses:", error);
    }
  };

  const fetchOraret = async () => {
    try {
      const response = await axios.get("https://localhost:7255/api/Oraret/selectForDropdown");
      setOraret(response.data);
    } catch (error) {
      console.error(" Error fetching Oraret:", error);
    }
  };

  const fetchShoferet = async () => {
    try {
      const response = await axios.get("https://localhost:7255/api/Shoferet/selectForDropdown");
      setShoferet(response.data);
    } catch (error) {
      console.error("Error fetching Shoferët:", error);
    }
  };

  function actionBegin(args) {
    if (args.requestType === "save") {
      args.cancel = true;
      if (args.action === "add") {
        axios.post("https://localhost:7255/api/Bus/add", args.data).then(() => fetchBuses());
      } else {
        axios.put("https://localhost:7255/api/Bus/update", args.data).then(() => fetchBuses());
      }
    } else if (args.requestType === "delete") {
      args.cancel = true;
      axios.delete(`https://localhost:7255/api/Bus/delete/${args.data[0].BusId}`).then(() => fetchBuses());
    }
  }

  return (
    <div className="control-pane">
      <div className="control-section full-screen">
        <h2 className="title">Lista e Autobusëve</h2>
        <p className="description">
        Këtu mund të shikoni dhe menaxhoni të gjitha autobusët që janë të disponueshëm për oraret dhe rrugët.
        </p>
             <div className="back-arrow" onClick={() => navigate("/home")}>
         <span className="arrow">←</span> Kthehu
        </div>
        <GridComponent  dataSource={buses} ref={(grid) => (gridInstance = grid)} toolbar={toolbarOptions} allowSorting={true} allowFiltering={true} filterSettings={filterSettings} allowPaging={true} editSettings={editSettings} pageSettings={pageSettings}  actionBegin={actionBegin.bind(this)} >
          <ColumnsDirective>
            <ColumnDirective field="BusId" headerText="ID" isPrimaryKey={true} visible={false} />
            <ColumnDirective field="NumriTargës" headerText="Numri Targës" validationRules={{ required: true }} />
            <ColumnDirective field="Kapaciteti" headerText="Kapaciteti" type="number" validationRules={{ required: true }} />
            <ColumnDirective field="Statusi" headerText="Statusi" validationRules={{ required: true }} />
            <ColumnDirective field="DataKrijimit" headerText="Data Krijimit" editType="datetimepickeredit" format={{ type: "dateTime", format: "M/d/y hh:mm a" }} />
            <ColumnDirective field="OrariId" headerText="Orari" editType="dropdownedit" edit={{ params: { dataSource: oraret, fields: { text: "OrariName", value: "OrariId" } } }} />
            <ColumnDirective field="ShoferiId" headerText="Shofer" editType="dropdownedit" edit={{ params: { dataSource: shoferet, fields: { text: "ShoferName", value: "ShoferiId" } } }} />
          </ColumnsDirective>
          <Inject services={[Page, Toolbar, Edit, Sort, Filter]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default Buses;