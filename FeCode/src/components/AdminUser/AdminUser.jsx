import React, { useEffect, useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style"; // WrapperUploadFile đã được thêm vào đây
import TableComponent from "../TableComponent/TableComponent";
import { Form, Button, Upload, Avatar } from "antd";
import ModalComponent from "../ModalComponent/ModalComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { getBase64 } from "../../untils";
import { useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { useQuery } from "@tanstack/react-query";
import * as message from "../../components/Mesage/Message";
import * as UserService from "../../services/UserService";
import InputComponent from "../InputComponent/InputComponent";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

const AdminUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsopenDrawer] = useState(false);
  const [isModalOpenDelete, setisModalOpenDelete] = useState(false);
  const user = useSelector((state) => state?.user);

  const [stateUser, setStateUser] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
    avatar: "",
    address: "",
  });

  const [form] = Form.useForm();
  const mutation = useMutationHooks(async (data) => {
    const res = await UserService.signupUser(data); // Gọi API và chờ kết quả
    return res; // Trả về kết quả từ server
  });

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, token, { ...rests });
    return res;
  });

  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data;
    const res = UserService.deleteUser(id, token);
    return res;
  });

  const getAllUsers = async () => {
    const res = await UserService.getAllUser();
    return res;
  };

  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsUser(rowSelected);
    }
  }, [rowSelected]);

  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await UserService.getDetailsUser(rowSelected);
    if (res?.data) {
      setStateUser({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        address: res?.data?.address,
      });
    }
  };

  useEffect(() => {
    if (stateUser) {
      form.setFieldsValue(stateUser); // Dùng setFieldsValue để cập nhật toàn bộ form
    }
  }, [form, stateUser]);

  const { data, isLoading, isSuccess, isError } = mutation;
  const {
    data: dataUpdateed,
    isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  const {
    data: dataDeleted,
    isLoading: isLoadingDeleted,
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
  } = mutationDeleted;

  const queryUser = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const { isLoading: isLoadingUser, data: users } = queryUser;

  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
          onClick={() => {
            setisModalOpenDelete(true);
          }}
        />
      </div>
    );
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  const dataTable =
    users?.data?.length &&
    users?.data?.map((user) => {
      return { ...user, key: user._id };
    });

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success();
      handleCancel();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessUpdated && dataUpdateed?.status === "OK") {
      message.success();
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      message.error();
    }
  }, [isSuccessUpdated]);

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      message.success();
      handleCancelDelete();
    } else if (isErrorDeleted) {
      message.error();
    }
  }, [isSuccessDeleted]);

  const handleCancelDelete = () => {
    setisModalOpenDelete(false);
  };

  const handleDeleteUser = () => {
    mutationDeleted.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Đóng modal
    setStateUser({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    form.resetFields();
  };

  const handleCloseDrawer = () => {
    setIsopenDrawer(false); // Đóng modal
    setStateUser({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    form.resetFields();
  };

  const onFinish = () => {
    mutation.mutate(stateUser, {
      onSettled: () => {
        queryUser.refetch();
      },
    });
  };

  const handleOnchange = (e) => {
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeAvatar = async ({ fileList }) => {
    if (!fileList || fileList.length === 0) return; // Kiểm tra fileList
    const file = fileList[0]; // Lấy file đầu tiên
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUser({
      ...stateUser,
      image: file.preview,
    });
  };

  const onUpdateUser = () => {
    mutationUpdate.mutate(
      { id: rowSelected, token: user?.access_token, ...stateUser },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };

  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <div
        style={{
          paddingTop: "15px",
          border: "1px solid #ddd",
          borderRadius: "6px",
        }}
      >
        <TableComponent
          columns={columns}
          isLoading={isLoadingUser}
          data={dataTable}
          onRow={(record) => {
            return {
              onClick: () => {
                setRowSelected(record._id); // Lưu toàn bộ record, không chỉ id
              },
            };
          }}
        />
      </div>

      <ModalComponent
        title="Tạo người dùng "
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
        ]}
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          autoComplete="on"
          form={form}
        >
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
            labelAlign="left" // Căn lề trái
          >
            <InputComponent
              value={stateUser.name}
              onChange={handleOnchange}
              name="name"
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
            labelAlign="left"
          >
            <InputComponent
              value={stateUser.email}
              onChange={handleOnchange}
              name="email"
            />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
            labelAlign="left"
          >
            <InputComponent
              value={stateUser.phone}
              onChange={handleOnchange}
              name="phone"
            />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
            labelAlign="left"
          >
            <InputComponent
              value={stateUser.address}
              onChange={handleOnchange}
              name="address"
            />
          </Form.Item>

          {/* WrapperUploadFile */}
          <WrapperUploadFile>
            <Upload
              customRequest={() => {}}
              listType="picture-card"
              onChange={handleOnchangeAvatar}
            >
              {stateUser.image ? (
                <img
                  src={stateUser.image}
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Chọn ảnh</div>
                </div>
              )}
            </Upload>
          </WrapperUploadFile>

          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>
    </div>
  );
};

export default AdminUser;
