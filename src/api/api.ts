import axios from "axios";
import { Person } from "../App";

const BASEURL = "http://localhost:3001/";

export const getRecords = async () => {
  const response = await axios.get(BASEURL);

  return response.data;
};

export const deleteRecord = async (id: number) => {
  const response = await axios.delete(`${BASEURL}${id}`);

  return response.data;
};

export const addRecord = async (data: Person) => {
  const response = await axios.post(BASEURL, data);

  return response.data;
};

export const updateRecord = async (data: Person) => {
  const response = await axios.put(BASEURL, data);

  return response.data;
};
