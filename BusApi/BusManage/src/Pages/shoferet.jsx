import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ColumnDirective, ColumnsDirective, Edit, Filter, GridComponent, Inject, Page, Sort, Toolbar } from "@syncfusion/ej2-react-grids";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/shoferet.css";

const Shoferet = () => {
  const filterSettings = { type: "Excel" };
  const toolbarOptions = ["Add", "Edit", "Delete", "Update", "Cancel"];
  const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
  const pageSettings = { pageCount: 5 };
  let gridInstance;
const navigate = useNavigate();
  const [shoferet, setShoferet] = useState([]);
   const [dropdownData, setDropdownData] = useState({ buses: [] });

  useEffect(() => {
    fetchShoferet();
    fetchDropdownData();
  }, []);

  const fetchShoferet = async () => {
    try {
      const response = await axios.get("https://localhost:7255/api/Shoferet/list");
      setShoferet(response.data);
    } catch (error) {
      console.error("Error fetching Shoferët:", error);
    }
  };
 

const fetchDropdownData = async () => {
  try {
    const response = await axios.get("https://localhost:7255/api/Bus/selectForDropdown");

    console.log("Dropdown API Response:", response.data); 

    setDropdownData({
      buses: response.data.map(bus => ({ 
        busId: bus.busId ?? 0,  
        busName: bus.busName,
      })),
    });
  } catch (error) {
    console.error("Error fetching dropdown data:", error);
  }
};

  function actionBegin(args) {
    if (args.requestType === "save") {
      args.cancel = true;
      if (args.action === "add") {
        axios.post("https://localhost:7255/api/Shoferet/add", args.data).then(() => fetchShoferet());
      } else {
        axios.put("https://localhost:7255/api/Shoferet/update", args.data).then(() => fetchShoferet());
      }
    } else if (args.requestType === "delete") {
      args.cancel = true;
      axios.delete(`https://localhost:7255/api/Shoferet/delete/${args.data[0].shoferiId}`).then(() => fetchShoferet());
    }
  }

  return (
    <div className="control-pane">
      <div className="control-section full-screen">
        <h2 className="title">Informacione për Shoferët</h2>
        <p className="description">
Menaxhoni detajet e shoferëve, disponueshmërinë dhe angazhimet për çdo autobus dhe rrugë.     
   </p>
        <div className="back-arrow" onClick={() => navigate("/home")}>
  <span className="arrow">←</span> Kthehu
        </div>
        {dropdownData.buses.length > 0 ? ( 
        <GridComponent dataSource={shoferet}  ref={(grid) => (gridInstance = grid)} toolbar={toolbarOptions} allowSorting={true}  allowFiltering={true} filterSettings={filterSettings} allowPaging={true} editSettings={editSettings} pageSettings={pageSettings} actionBegin={actionBegin.bind(this)} >
          <ColumnsDirective>
            <ColumnDirective field="ShoferiId" headerText="ID" isPrimaryKey={true} visible={false} />
            <ColumnDirective field="Emri" headerText="Emri" validationRules={{ required: true }} />
            <ColumnDirective field="NumriLicencës" headerText="Numri Licencës" validationRules={{ required: true }} />
            <ColumnDirective field="DataKrijimit" headerText="Data Krijimit" editType="datetimepickeredit" />
               <ColumnDirective
                field="BusId"
                headerText="Bus"
                template={(props) => (
                  <DropDownListComponent
                    width="150px"
                    key={props.busId}  
                    dataSource={dropdownData.buses}
                    fields={{ text: "busName", value: "busId" }}
                    value={props.busId ?? 0}  
                    change={(args) => console.log("Dropdown Selected Value:", args.value)}
                  />
                )}
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

export default Shoferet;