/*  import { ColumnDirective, ColumnsDirective, Edit, Filter, GridComponent, Inject, Page, Sort, Toolbar } from "@syncfusion/ej2-react-grids";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/oraret.css";




const Oraret = () => {
  const filterSettings = { type: "Excel" };
  const toolbarOptions = ["Add", "Edit", "Delete", "Update", "Cancel"];
  const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
  const pageSettings = { pageCount: 5 };
  let gridInstance;
const navigate = useNavigate();

  const [oraret, setOraret] = useState([]);
  const [buses, setBuses] = useState([]);
  const [rruget, setRruget] = useState([]);

  useEffect(() => {
    fetchOraret();
   fetchBuses();
    fetchRruget(); 
  }, []);

  const fetchOraret = async () => {
    try {
      const response = await axios.get("https://localhost:7255/api/Oraret/list");
      setOraret(response.data);
    } catch (error) {
      console.error("Error fetching Oraret:", error);
    }
  };

  const fetchBuses = async () => {
    try {
      const response = await axios.get("https://localhost:7255/api/Bus/selectForDropdown");
      setBuses(response.data);
      console.log("daa" ,response.data);
    } catch (error) {
      console.error("Error fetching Buses:", error);
    }
  };

  const fetchRruget = async () => {
    try {
      const response = await axios.get("https://localhost:7255/api/Rruget/selectForDropdown");
      setRruget(response.data);
      console.log("bbbbbbbbbbbb" ,response.data);
    } catch (error) {
      console.error("Error fetching Rrugët:", error);
    }
  }; 

  function actionBegin(args) {
    if (args.requestType === "save") {
      args.cancel = true;
      if (args.action === "add") {
        axios.post("https://localhost:7255/api/Oraret/add", args.data).then(() => fetchOraret());
      } else {
        axios.put("https://localhost:7255/api/Oraret/update", args.data).then(() => fetchOraret());
      }
    } else if (args.requestType === "delete") {
      args.cancel = true;
      axios.delete(`https://localhost:7255/api/Oraret/delete/${args.data[0].OrariId}`).then(() => fetchOraret());
    }
  }

  return (
    <div className="control-pane">
      <div className="control-section full-screen">
        <h2 className="title">Oraret e Autobusëve</h2>
        <p className="description">
          Menaxhoni oraret e autobusëve me lehtësi. Ky komponent ofron mundësinë për të parë, shtuar, modifikuar dhe fshirë oraret e autobusëve.
        </p>
          <div className="back-arrow" onClick={() => navigate("/home")}>
  <span className="arrow">←</span> Kthehu
        </div>

        <GridComponent  dataSource={oraret}  ref={(grid) => (gridInstance = grid)}  toolbar={toolbarOptions}  allowSorting={true}  allowFiltering={true}  filterSettings={filterSettings}  allowPaging={true}  editSettings={editSettings} pageSettings={pageSettings} actionBegin={actionBegin.bind(this)} >
          <ColumnsDirective>
            <ColumnDirective field="OrariId" headerText="ID" isPrimaryKey={true} visible={false} />
            <ColumnDirective field="KohaNisjes" headerText="Koha Nisjes" editType="datetimepickeredit" />
            <ColumnDirective field="KohaArritjes" headerText="Koha Arritjes" editType="datetimepickeredit" />
            <ColumnDirective field="Statusi" headerText="Statusi" validationRules={{ required: true }} />
            <ColumnDirective field="DataKrijimit" headerText="Data Krijimit" editType="datetimepickeredit" />
          <ColumnDirective field="BusId" headerText="Bus" editType="dropdownedit" edit={{ params: { dataSource: buses, fields: { text: "BusName", value: "BusId" } } }} />
            <ColumnDirective field="RrugaId" headerText="Rruga" editType="dropdownedit" edit={{ params: { dataSource: rruget, fields: { text: "RrugaName", value: "RrugaId" } } }} /> 
          </ColumnsDirective>
          <Inject services={[Page, Toolbar, Edit, Sort, Filter]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default Oraret; 


 */


import { ColumnDirective, ColumnsDirective, Edit, Filter, GridComponent, Inject, Page, Sort, Toolbar } from "@syncfusion/ej2-react-grids";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/oraret.css";

const Oraret = () => {
  const filterSettings = { type: "Excel" };
  const toolbarOptions = ["Add", "Edit", "Delete", "Update", "Cancel"];
  const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
  const pageSettings = { pageCount: 5 };
  let gridInstance;
  const navigate = useNavigate();

  const [oraret, setOraret] = useState([]);
  const [dropdownData, setDropdownData] = useState({ buses: [], rruget: [] });

  useEffect(() => {
    fetchOraret();
    fetchDropdownData();
  }, []);

  useEffect(() => {
    console.log("Dropdown Data Before Rendering:", dropdownData);
  }, [dropdownData]);

/*   const fetchOraret = async () => {
    try {
      const response = await axios.get("https://localhost:7255/api/Oraret/list");
      setOraret(response.data);
    } catch (error) {
      console.error("Error fetching Oraret:", error);
    }
  }; */

  const fetchOraret = async () => {
  try {
    const response = await axios.get("https://localhost:7255/api/Oraret/list");
    console.log("Fetched Oraret Data:", response.data); // ✅ Debug output

    setOraret(response.data.map(orari => ({
      ...orari,
      busName: orari.Bus ? orari.Bus.BusName : "Unknown Bus",
      rrugaName: orari.Rruga ? orari.Rruga.RrugaName : "Unknown Route"
    })));
  } catch (error) {
    console.error("Error fetching Oraret:", error);
  }
};

  const fetchDropdownData = async () => {
    try {
      const responseBus = await axios.get("https://localhost:7255/api/Bus/selectForDropdown");
      const responseRruge = await axios.get("https://localhost:7255/api/Rruget/selectForDropdown");

      setDropdownData({
        buses: responseBus.data.map(bus => ({ busId: bus.BusId ?? 0, busName: bus.BusName })),
        rruget: responseRruge.data.map(rruge => ({ rrugaId: rruge.RrugaId ?? 0, rrugaName: rruge.RrugaName }))
      });

    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  function actionBegin(args) {
    if (args.requestType === "save") {
      args.cancel = true;
      if (args.action === "add") {
        axios.post("https://localhost:7255/api/Oraret/add", args.data).then(() => fetchOraret());
      } else {
        axios.put("https://localhost:7255/api/Oraret/update", args.data).then(() => fetchOraret());
      }
    } else if (args.requestType === "delete") {
      args.cancel = true;
      axios.delete(`https://localhost:7255/api/Oraret/delete/${args.data[0].OrariId}`).then(() => fetchOraret());
    }
  }

  return (
    <div className="control-pane">
      <div className="control-section full-screen">
        <h2 className="title">Oraret e Autobusëve</h2>
        <p className="description">
          Menaxhoni oraret e autobusëve me lehtësi. Ky komponent ofron mundësinë për të parë, shtuar, modifikuar dhe fshirë oraret e autobusëve.
        </p>
        <div className="back-arrow" onClick={() => navigate("/home")}>
          <span className="arrow">←</span> Kthehu
        </div>

        {dropdownData.buses.length > 0 && dropdownData.rruget.length > 0 ? (
          <GridComponent
            dataSource={oraret}
            ref={(grid) => (gridInstance = grid)}
            toolbar={toolbarOptions}
            allowSorting={true}
            allowFiltering={true}
            filterSettings={filterSettings}
            allowPaging={true}
            editSettings={editSettings}
            pageSettings={pageSettings}
            actionBegin={actionBegin.bind(this)}
          >
            <ColumnsDirective>
              <ColumnDirective field="OrariId" headerText="ID" isPrimaryKey={true} visible={false} />
              <ColumnDirective field="KohaNisjes" headerText="Koha Nisjes" editType="datetimepickeredit" />
              <ColumnDirective field="KohaArritjes" headerText="Koha Arritjes" editType="datetimepickeredit" />
              <ColumnDirective field="Statusi" headerText="Statusi" validationRules={{ required: true }} />
              <ColumnDirective field="DataKrijimit" headerText="Data Krijimit" editType="datetimepickeredit" />
  {/*             <ColumnDirective field="BusId" headerText="Bus" editType="dropdownedit" edit={{ params: { dataSource: dropdownData.buses, fields: { text: "busName", value: "busId" } } }} />
              <ColumnDirective field="RrugaId" headerText="Rruga" editType="dropdownedit" edit={{ params: { dataSource: dropdownData.rruget, fields: { text: "rrugaName", value: "rrugaId" } } }} />
           */} 
           
           <ColumnDirective 
  field="busId" 
  headerText="Bus" 
  editType="dropdownedit" 
  edit={{ params: { dataSource: dropdownData.buses, fields: { text: "busName", value: "busId" } } }} 
/>

<ColumnDirective 
  field="rrugaId" 
  headerText="Rruga" 
  editType="dropdownedit" 
  edit={{ params: { dataSource: dropdownData.rruget, fields: { text: "rrugaName", value: "rrugaId" } } }} 
/>
            </ColumnsDirective>
            <Inject services={[Page, Toolbar, Edit, Sort, Filter]} />
          </GridComponent>
        ) : (
          <p>Loading dropdown data...</p>
        )}
      </div>
    </div>
  );
};

export default Oraret;