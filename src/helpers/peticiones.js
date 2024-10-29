import axios from "axios";

export const PostData = async (url, obj) => {
  try {
    const resp = await axios.post(url, obj);
    return resp.status;
  } catch (error) {
    console.log(error);
  }
};

export const GetData = async (url) => {
  try {
    const resp = await axios.get(url);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const PatchData = async (url, obj) => {
  try {
    const resp = await axios.patch(url, obj);
    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteData = async (url) => {
  try {
    const resp = await axios.delete(url);
    return resp;
  } catch (error) {
    console.log(error);
  }
};
