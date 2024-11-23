import axios from 'axios';

export const axiosJWT = axios.create()

export const loginUser = async (data) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data);
    return res.data;
  } catch (error) {
    return error.response.data
  }
}

export const signupUser = async (data) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data);
    return res.data;
  } catch (error) {
    return error.response.data
  }
}


export const getDetailsUser = async (id, access_token) => {
  try {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL}/user/get-details/${id}`,
      {
        headers: { token: `Bearer ${access_token}` },
      }
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllUser = async ( access_token) => {
  try {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL}/user/getAll`,
      {
        headers: { token: `Bearer ${access_token}` },
      }
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
export const deleteUser = async (id, access_token,data) => {
  try {
    const res = await axiosJWT.delete(
      `${process.env.REACT_APP_API_URL}/user/delete-user/${id}`,data,
      {
        headers: { token: `Bearer ${access_token}` },
      }
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const refreshToken = async () => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/refresh-token`,
      {},  // Body có thể là rỗng nếu không cần gửi thêm dữ liệu
      { withCredentials: true }  // Cấu hình vớiCredentials đúng cách
    );

    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/log-out`
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
export const updateUser = async (id, data, access_token) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/user/update-user/${id}`,
      data,
      {
        headers: { token: `Bearer ${access_token}` }, // Đảm bảo bạn sử dụng đúng `access_token` ở đây
      }
    );
    return res.data;
  } catch (error) {
    return error.response ? error.response.data : { error: 'An error occurred' };
  }
};

