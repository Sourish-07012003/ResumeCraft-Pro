import API from "./api";

export const getResume = async () => {
  const res = await API.get("/resume");
  return res.data;
};

export const saveResume = async (data) => {
  const res = await API.post("/resume", data);
  return res.data;
};
