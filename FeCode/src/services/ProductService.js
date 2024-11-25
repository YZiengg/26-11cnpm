import axios from "axios";
import { axiosJWT } from "./UserService"

export const getAllProduct = async (search,limit) => {
  try {
    let res = {}
    if(search?.length>0){
       res = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/get-all?filter=name&filter=${search}&limit=${limit}`
      );
    }else {
      res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all?limit=${limit}`
    );}
   
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
export const createProduct = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/create`,
      data // Truyền toàn bộ đối tượng data
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getDetailsProduct = async (id) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-details/${id}`)
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateProduct = async (id, access_token, data) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/product/update/${id}`, data, {
      headers: { token: `Bearer ${access_token}` },
    }
    )
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteProduct = async (id, access_token) => {
  try {
    const res = await axiosJWT.delete(
      `${process.env.REACT_APP_API_URL}/product/delete/${id}`, {
      headers: { token: `Bearer ${access_token}` },
    }
    )
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};


export const getAlltypeProduct = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all-type/` )
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};