import axios from "axios";

// export const createOrder = async (data, access_token) => {
//   try {
//     const res = await axios.post(
//       `${process.env.REACT_APP_API_URL}/order/create`,
//       data // Truyền toàn bộ đối tượng data
//     );
//     return res.data;
//   } catch (error) {
//     return error.response.data;
//   }
// };
 
export const createOrder = async ( access_token,data) => {
  console.log("access_token",{access_token,data} )
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/order/create`, data, {
      headers: { token: `Bearer ${access_token}` },
    }
    )
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getAllOrder = async ( access_token,data) => {
  console.log("access_token",{access_token,data} )
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/order/get-all-order`,  {
      headers: { token: `Bearer ${access_token}` },
    }
    )
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
  
