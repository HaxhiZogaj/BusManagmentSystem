import { ColumnDirective, ColumnsDirective, Edit, Filter, GridComponent, Inject, Page, Sort, Toolbar } from "@syncfusion/ej2-react-grids";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Rruget = () => {
  const filterSettings = { type: "Excel" };
  const toolbarOptions = ["Add", "Edit", "Delete", "Update", "Cancel"];
  const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
  const pageSettings = { pageCount: 5 };
  let gridInstance;
const navigate = useNavigate();
  const [rruget, setRruget] = useState([]);

  useEffect(() => {
    fetchRruget();
  }, []);

  const fetchRruget = async () => {
    try {
      const response = await axios.get("https://localhost:7255/api/Rruget/list");
      setRruget(response.data);
    } catch (error) {
      console.error(" Error fetching Rrugët:", error);
    }
  };

  function actionBegin(args) {
    if (args.requestType === "save") {
      args.cancel = true;
      if (args.action === "add") {
       axios.post("https://localhost:7255/api/Rruget/add", args.data).then(() => fetchRruget());
      } else {
        axios.put("https://localhost:7255/api/Rruget/update", args.data).then(() => fetchRruget());
      }
    } else if (args.requestType === "delete") {
      args.cancel = true;
      axios.delete(`https://localhost:7255/api/Rruget/delete/${args.data[0].rrugaId}`).then(() => fetchRruget());
    }
  } 

 

  return (
    <div className="control-pane">
      <div className="control-section full-screen">
        <h2 className="title">Informacione për Rrugët</h2>
        <p className="description">
         Menaxhoni dhe organizoni rrugët e ndryshme të disponueshme për transport, duke përfshirë destinacionet dhe oraret.
        </p>
             <div className="back-arrow" onClick={() => navigate("/home")}>
  <span className="arrow">←</span> Kthehu
        </div>
        <GridComponent  dataSource={rruget}  ref={(grid) => (gridInstance = grid)}  toolbar={toolbarOptions}  allowSorting={true}  allowFiltering={true}  filterSettings={filterSettings} allowPaging={true}  editSettings={editSettings}  pageSettings={pageSettings}  actionBegin={actionBegin.bind(this)} >
          <ColumnsDirective>
            <ColumnDirective field="RrugaId" headerText="ID" isPrimaryKey={true} visible={false} />
            <ColumnDirective field="Origjina" headerText="Origjina" validationRules={{ required: true }} />
            <ColumnDirective field="Destinacioni" headerText="Destinacioni" validationRules={{ required: true }} />
            <ColumnDirective field="Distanca" headerText="Distanca" type="number" validationRules={{ required: true }} />
            <ColumnDirective field="DataKrijimit" headerText="Data Krijimit" editType="datetimepickeredit" />
          </ColumnsDirective>
          <Inject services={[Page, Toolbar, Edit, Sort, Filter]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default Rruget;