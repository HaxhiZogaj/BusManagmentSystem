import axios from "axios";

export const getAllBiletat = () => axios.get("/api/Biletat/list");
export const getRezervimetDropdown = () =>
  axios.get("/api/Biletat/selectForDropdown").then(res =>
    ({ data: res.data.rezervimet.map(r => ({ rezervimiId: r.rezervimiId, rezervimiName: r.rezervimiName })) })
  );
export const addBileta = (payload) => axios.post("/api/Biletat/add", payload);
export const updateBileta = (id, payload) => axios.put(`/api/Biletat/update`, payload);
export const deleteBileta = (id) => axios.delete(`/api/Biletat/delete/${id}`);