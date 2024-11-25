import React, { useEffect, useMemo, useState } from "react";
import { Button, Checkbox, Form } from "antd";
import {
  WrapperInfo,
  WrapperItemOrder,
  WrapperLeft,
  WrapperStyleHeader,
  WrapperListOrder,
  WrapperTotal,
  WrapperRight,
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
} from "../../redux/slides/orderSlide";
import { convertPrice } from "../../untils";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import * as message from "../../components/Mesage/Message";

const OrderPage = () => {
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
  const [form] = Form.useForm();
  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter(
        (order) => order !== e.target.value
      );
      SetListChecked(newListChecked);
    } else {
      SetListChecked([...listChecked, e.target.value]);
    }
  };

  const handleChangeCount = (type, productId) => {
    if (type === "increase") {
      dispatch(increaseAmount({ idProduct: productId }));
    } else {
      dispatch(decreaseAmount({ idProduct: productId }));
    }
  };

  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product);
      });
      SetListChecked(newListChecked);
    } else {
      SetListChecked([]);
    }
  };

  useEffect(() => {
    dispatch(selectedOrder({ listChecked }));
  }, [listChecked]);

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

  const handleRemoveProduct = (productId) => {
    dispatch(removeOrderProduct({ idProduct: productId }));
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
  const handleAddCard = () => {
    if (!order?.orderItemsSelected?.length) {
      message.error("Vui lòng chọn sản phẩm");
    } else if (!user.phone || !user.address || !user.name) {
      setIsOpenModalUpdateInfo(true);
    } else {
      console.log("Thông tin người dùng:", user);
      console.log("Sản phẩm trong giỏ hàng:", order?.orderItemsSelected);
      console.log("add giỏ hàng");
    }
  };

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, token, { ...rests });
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
  console.log("stateUser", stateUser);

  return (
    <div style={{ background: "#f5f5f5", width: "100%", minHeight: "100vh" }}>
      <div style={{ width: "1250px", margin: "0 auto", paddingTop: "30px" }}>
        <h3>Giỏ hàng</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: 1200,
            margin: "0px auto",
          }}
        >
          <WrapperLeft>
            <WrapperStyleHeader>
              <span style={{ display: "inline-block", width: "390px" }}>
                <Checkbox
                  onChange={handleOnchangeCheckAll}
                  checked={listChecked?.length === order?.orderItems.length}
                ></Checkbox>
                <span style={{ marginLeft: "30px" }}>
                  Tất cả ({order?.orderItems?.length} sản phẩm)
                </span>
              </span>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    width: "33%",
                    textAlign: "center",
                    paddingRight: "30px",
                  }}
                >
                  Đơn giá
                </span>
                <span
                  style={{
                    width: "33%",
                    textAlign: "center",
                    paddingRight: "30px",
                  }}
                >
                  Số lượng
                </span>
                <span
                  style={{
                    width: "33%",
                    textAlign: "center",
                    paddingRight: "30px",
                  }}
                >
                  Thành tiền
                </span>
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {order?.orderItems?.map((item) => {
                return (
                  <WrapperItemOrder key={item.product}>
                    <div
                      style={{
                        width: "390px",
                        display: "flex",
                        alignItems: "center",
                        gap: "30px",
                      }}
                    >
                      <Checkbox
                        onChange={onChange}
                        value={item?.product}
                        checked={listChecked.includes(item?.product)}
                      ></Checkbox>
                      <img
                        src={item?.image}
                        style={{
                          width: "77px",
                          height: "79px",
                          objectFit: "cover",
                        }}
                      />
                      <div
                        style={{
                          width: 260,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.name}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          width: "33%",
                          textAlign: "center",
                          fontSize: "14px",
                          color: "#242424",
                        }}
                      >
                        {convertPrice(item?.price)}
                      </div>

                      <div
                        style={{
                          width: "33%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleChangeCount("decrease", item.product)
                          }
                        >
                          <MinusOutlined />
                        </button>
                        <WrapperInputNumber
                          defaultValue={item.amount}
                          value={item.amount}
                          size="small"
                          readOnly
                          style={{
                            width: "40px",
                            textAlign: "center",
                            border: "1px solid #dcdcdc",
                            borderRadius: "4px",
                          }}
                        />
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleChangeCount("increase", item.product)
                          }
                        >
                          <PlusOutlined />
                        </button>
                      </div>

                      <div
                        style={{
                          width: "33%",
                          textAlign: "center",
                          fontSize: "14px",
                          color: "red",
                        }}
                      >
                        {convertPrice(item?.price * item?.amount)}
                      </div>

                      <div
                        style={{
                          width: "10%",
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <DeleteOutlined
                          style={{ cursor: "pointer" }}
                          onClick={() => handleRemoveProduct(item?.product)}
                        />
                      </div>
                    </div>
                  </WrapperItemOrder>
                );
              })}
            </WrapperListOrder>
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
              onClick={() => handleAddCard()}
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
              textButton="MUA HÀNG"
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

export default OrderPage;
