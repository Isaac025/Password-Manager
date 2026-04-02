import API from "./api";

// GET all passwords
export const getPasswords = async () => {
  const { data } = await API.get("/passwords");
  return data;
};

// ADD password
export const addPassword = async (formData) => {
  const { data } = await API.post("/passwords", formData);
  return data;
};

// DELETE password
export const deletePassword = async (id) => {
  const { data } = await API.delete(`/passwords/${id}`);
  return data;
};

// EDIT password
export const editPassword = async (id, formData) => {
  const { data } = await API.patch(`/passwords/${id}`, formData);
  return data;
};
