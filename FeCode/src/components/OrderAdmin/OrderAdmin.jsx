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
import * as message from "../Mesage/Message";
import * as OrderService from "../../services/OrderService";
import InputComponent from "../InputComponent/InputComponent";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

const OrderAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsopenDrawer] = useState(false);
  const [isModalOpenDelete, setisModalOpenDelete] = useState(false);
  const user = useSelector((state) => state?.user);

  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token);
    return res;
  };

  const queryOrder = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrder,
  });

  const { isLoading: isLoadingOrder, data: orders } = queryOrder;

  const columns = [
    {
      title: "UserName ",
      dataIndex: "useName",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.useName.length - b.useName.length,
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },

    {
      title: "Address",
      dataIndex: "address",
    },

    {
      title: "Price Items",
      dataIndex: "itemsPrice",
      sorter: (a, b) => a.itemsPrice.length - b.itemsPrice.length,
    },

    {
      title: "Price Ship",
      dataIndex: "shippingPrice",
      sorter: (a, b) => a.shippingPrice.length - b.shippingPrice.length,
    },
    {
      title: "Toltal Price",
      dataIndex: "totalPrice",
      sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
    },
  ];

  const dataTable =
    orders?.data?.length &&
    orders?.data?.map((order) => {
      console.log("users", order);
      return {
        ...order,
        key: order._id,
        useName: order?.shippingAddress?.fullName,
        phone: order?.shippingAddress?.phone,
        address: order?.shippingAddress?.address,
      };
    });

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
          isLoading={isLoadingOrder}
          data={dataTable}
        />
      </div>
    </div>
  );
};

export default OrderAdmin;
