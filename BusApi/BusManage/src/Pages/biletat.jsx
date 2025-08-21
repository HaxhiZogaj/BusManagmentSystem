import { useEffect, useState } from 'react';
import GenericGrid from '../Common/GenericGrid/genericGrid.jsx';
import {
  addBileta,
  deleteBileta,
  getAllBiletat,
  getRezervimetDropdown,
  updateBileta
} from '../Services/BiletatApi.js';

function BiletatGrid() {
  const [data, setData] = useState([]);
  const [rezervimet, setRezervimet] = useState([]);
  const [ready, setReady] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const [biletatRes, rezervimetRes] = await Promise.all([
        getAllBiletat(),
        getRezervimetDropdown(),
      ]);
      setData(biletatRes.data);
      setRezervimet(rezervimetRes.data);
      setReady(true);
    };
    fetch();
  }, [refresh]);

  const columns = [
    { field: "biletaId", isPrimaryKey: true, isIdentity: true, visible: false },
    { field: "numriBiletës", headerText: "Numri Biletës", validationRules: { required: true }, width: 200 },
    { field: "çmimi", headerText: "Çmimi", type: "number", validationRules: { required: true }, width: 150 },
    { field: "dataLëshimit", headerText: "Data Lëshimit", format: "yMd", type: "date", editType: "datepickeredit", validationRules: { required: true }, width: 180 },
    {
      field: "rezervimiId",
      headerText: "Rezervimi",
      foreignKeyField: "rezervimiId",
      foreignKeyValue: "rezervimiName",
      dataSource: rezervimet,
      editType: "dropdownedit",
      validationRules: { required: true },
      width: 200
    }
  ];

const handleActionBegin = async (args) => {
  if (args.requestType === 'save') {
    const original = args.rowData || {};
    const updated = args.data || {};

    const formatDate = (value) => {
      const date = new Date(value);
      return date instanceof Date && !isNaN(date)
        ? date.toISOString()
        : new Date().toISOString(); // fallback
    };

    const payload = {
  numriBiletës: updated.numriBiletës || original.numriBiletës,
  çmimi: updated.çmimi !== undefined ? Number(updated.çmimi) : Number(original.çmimi),
  dataLëshimit: updated.dataLëshimit
    ? formatDate(updated.dataLëshimit)
    : formatDate(original.dataLëshimit),
  rezervimiId: updated.rezervimiId || original.rezervimiId,
};
console.log("Payload for save action:", payload);
    

    if (updated.biletaId) {
      payload.BiletaId = updated.biletaId;
      await updateBileta(updated.biletaId, payload);
    } else {
      await addBileta(payload);
    }

    setRefresh(prev => !prev);
  }

  if (args.requestType === 'delete') {
    try {
      await deleteBileta(args.data[0]?.biletaId);
      setRefresh(prev => !prev);
    } catch (error) {
      console.error("Gabim gjatë fshirjes së biletës:", error);
    }
  }
};

  return (
    <GenericGrid
      title="Menaxhimi i Biletave"
      data={data}
      columns={columns}
      dataReady={ready}
      actionBegin={handleActionBegin}
      dropdownOptions={[
        { text: "Switch to Dialog", id: "Dialog" },
        { text: "Switch to Inline", id: "Inline" }
      ]}
    />
  );
}

export default BiletatGrid;