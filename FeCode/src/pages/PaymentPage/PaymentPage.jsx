import React, { useEffect, useMemo, useState } from "react";
import { Radio, Checkbox, Form } from "antd";
import {
  WrapperInfo,
  WrapperItemOrder,
  WrapperLeft,
  WrapperStyleHeader,
  WrapperListOrder,
  WrapperTotal,
  WrapperRight,
  Label,
  WrapperRadio,
} from "./style";
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { WrapperInputNumber } from "../../components/ProductDetailsComponent/style";
import {
  decreaseAmount,
  increaseAmount,
  removeOrderProduct,
  selectedOrder,
  removeAllOrderProduct,
  markAsPaid,
  removePaidProducts,
} from "../../redux/slides/orderSlide";
import { convertPrice } from "../../untils";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import * as OrderService from "../../services/OrderService";
import * as message from "../../components/Mesage/Message";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [listChecked, SetListChecked] = useState([]);
  const dispatch = useDispatch();
  const [stateUser, setStateUser] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [delivery, setDelivery] = useState(""); // Mặc định là một chuỗi rỗng hoặc giá trị khởi tạo khác
  const [payment, setPayment] = useState(""); // Mặc định là một chuỗi rỗng hoặc giá trị khởi tạo khác

  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(stateUser);
  }, [form, stateUser]);

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUser({
        ...stateUser,
        name: user?.name || "",
        phone: user?.phone || "",
        address: user?.address || "",
      });
    }
  }, [isOpenModalUpdateInfo, user]); // Điều này đảm bảo khi user thay đổi, stateUser sẽ được cập nhật

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + (cur.price || 0) * (cur.amount || 0); // Đảm bảo giá trị hợp lệ
    }, 0);
    return result || 0; // Trả về 0 nếu result là NaN hoặc undefined
  }, [order]);

  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + (cur.discount || 0) * (cur.amount || 0); // Đảm bảo giá trị hợp lệ
    }, 0);
    return result || 0; // Trả về 0 nếu result là NaN hoặc undefined
  }, [order]);

  const shippingPriceMemo = useMemo(() => {
    if (priceMemo > 200000) {
      return 10000;
    } else if (priceMemo === 0) {
      return 0; // Phí giao hàng 0 khi không có sản phẩm
    } else {
      return 20000;
    }
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    return (
      (Number(priceMemo) || 0) -
      (Number(priceDiscountMemo) || 0) +
      (Number(shippingPriceMemo) || 0)
    );
  }, [priceMemo, priceDiscountMemo, shippingPriceMemo]);
  const handleAddOrder = () => {
    if (
      user?.access_token &&
      order?.orderItemsSelected &&
      user?.name &&
      user?.address &&
      user?.phone &&
      priceMemo &&
      user?.id
    ) {
      mutationAddOrder.mutate(
        {
          token: user?.access_token,
          orderItems: order?.orderItemsSelected,
          fullName: user?.name,
          address: user?.address,
          phone: user?.phone,
          itemsPrice: priceMemo,
          shippingPrice: shippingPriceMemo,
          totalPrice: totalPriceMemo,
          user: user?.id,
          paymethMethod: payment,
        },
        {
          onSuccess: () => {
            message.success("Đặt hàng thành công");

            // Dispatch action xóa giỏ hàng sau khi thanh toán thành công
            dispatch(removeAllOrderProduct()); // Xóa tất cả sản phẩm trong giỏ hàng

            navigate("/orderSuccess", {
              state: {
                delivery,
                payment,
                orders: order?.orderItemsSelected,
                totalPriceMemo: totalPriceMemo,
              },
            });
          },
        }
      );
    }
  };

  console.log("state", order);

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, token, { ...rests });
    return res;
  });
  const mutationAddOrder = useMutationHooks((data) => {
    const { token, ...rests } = data;
    const res = OrderService.createOrder(token, { ...rests });
    return res;
  });
  const handleCancelUpdate = () => {
    setStateUser({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    form.resetFields();
    setIsOpenModalUpdateInfo(false);
  };
  console.log("data", mutationUpdate);

  const handleUpdateInforUser = () => {
    console.log("stateUser", stateUser);
    const { name, address, phone } = stateUser;
    if (name && address && phone) {
      mutationUpdate.mutate(
        {
          id: user?.id,
          token: user?.access_token,
          ...stateUser,
        },
        {
          onSuccess: () => {
            setIsOpenModalUpdateInfo(false);
          },
        }
      );
    }
  };

  const handleOnchange = (e) => {
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleDelivery = (e) => {
    setDelivery(e.target.value); // Fixed the assignment
  };

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  return (
    <div style={{ background: "#f5f5f5", width: "100%", minHeight: "100vh" }}>
      <div style={{ width: "1250px", margin: "0 auto", paddingTop: "30px" }}>
        <h3 style={{ padding: "1px 36px" }}>Chọn phương thức thanh toán</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: 1200,
            margin: "0px auto",
          }}
        >
          <WrapperLeft>
            <WrapperInfo>
              <div>
                <Label>Phương thức giao hàng</Label>
                <WrapperRadio onChange={handleDelivery} value={delivery}>
                  <Radio value="fast">
                    <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                      FAST
                    </span>{" "}
                    Giao hàng tiết kiệm
                  </Radio>
                  <Radio value="gojeck">
                    <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                      GOJECK
                    </span>{" "}
                    Giao hàng tiết kiệm
                  </Radio>
                </WrapperRadio>
              </div>
            </WrapperInfo>
            <WrapperInfo>
              <div>
                <Label>Chọn phương thức thanh toán</Label>
                <WrapperRadio onChange={handlePayment} value={payment}>
                  <Radio value="later_money"> Thanh toán khi nhận hàng</Radio>
                </WrapperRadio>
              </div>
            </WrapperInfo>
          </WrapperLeft>
          <WrapperRight>
            <WrapperInfo>
              <div>
                <span>Địa chỉ: </span>
                <span style={{ fontWeight: "bold" }}>{user?.address} </span>
                <span
                  onClick={handleChangeAddress}
                  style={{ color: "blue", cursor: "pointer " }}
                >
                  Thay đổi
                </span>
              </div>
            </WrapperInfo>
            <WrapperInfo>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Tạm tính</span>
                <span style={{ fontSize: "14px", fontWeight: "400" }}>
                  {convertPrice(priceMemo)}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Giảm giá</span>
                <span style={{ fontSize: "14px", fontWeight: "400" }}>
                  {`${priceDiscountMemo} %`}
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Phí giao hàng</span>
                <span style={{ fontSize: "14px", fontWeight: "400" }}>
                  {convertPrice(shippingPriceMemo)}
                </span>
              </div>
            </WrapperInfo>
            <WrapperTotal>
              <span>Tổng tiền</span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <span
                  style={{
                    color: "rgb(254,56,52)",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  {convertPrice(totalPriceMemo)}
                </span>
                <span
                  style={{ color: "rgb(254,56,52)", fontSize: "24px" }}
                ></span>
                <span style={{ color: "#000", fontSize: "11px" }}>
                  Đã bao gồm phí VAT
                </span>
              </div>
            </WrapperTotal>
            <ButtonComponent
              onClick={() => handleAddOrder()}
              size={40}
              styleButton={{
                background: "rgb(255, 57,69)",
                height: "48px",
                width: "100%",
                border: "none",
                borderRadius: "4px",
                fontSize: "16px",
                color: "#fff",
              }}
              textButton="ĐẶT HÀNG"
            ></ButtonComponent>
          </WrapperRight>
        </div>
      </div>
      <ModalComponent
        title="Cập nhật thông tin giao hàng"
        open={isOpenModalUpdateInfo}
        onCancel={handleCancelUpdate}
        onOk={handleUpdateInforUser}
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          // onFinish={}
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
        </Form>
      </ModalComponent>
    </div>
  );
};

export default PaymentPage;
