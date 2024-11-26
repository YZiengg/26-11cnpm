import React from "react";
import {
  WrapperInfo,
  WrapperItemOrder,
  WrapperContainer,
  WrapperItemOrderInfo,
  Label,
  WrapperValue,
} from "./style";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { orderContant } from "../../contant";
import { convertPrice } from "../../untils";

const OrderSuccess = () => {
  const order = useSelector((state) => state.order);
  const location = useLocation();
  const { state } = location;
  return (
    <div style={{ background: "#f5f5f5", width: "100%", minHeight: "100vh" }}>
      <div style={{ width: "1250px", margin: "0 auto", padding: "1px 36px" }}>
        <h3>Đơn hàng đã đặt</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <WrapperContainer>
            <WrapperInfo>
              <div>
                <Label style={{ color: "black", fontWeight: "bold" }}>
                  Phương thức giao hàng
                </Label>
                <WrapperValue>
                  <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                    {orderContant.delivery[state?.delivery]}
                  </span>{" "}
                  Giao hàng tiết kiệm
                </WrapperValue>
              </div>
            </WrapperInfo>
            <WrapperInfo>
              <div>
                <Label style={{ color: "black", fontWeight: "bold" }}>
                  {" "}
                  Phương thức thanh toán
                </Label>
                <WrapperValue>
                  {" "}
                  {orderContant.payment[state?.payment]}
                </WrapperValue>
              </div>
            </WrapperInfo>
            <WrapperItemOrderInfo>
              {state?.orders?.map((item) => {
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
                      <img
                        src={item.image}
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
                        Giá tiền: {convertPrice(item?.price)}
                      </div>
                      <div
                        style={{
                          width: "33%",
                          textAlign: "center",
                          fontSize: "14px",
                          color: "#242424",
                        }}
                      >
                        Số lượng: {item?.amount}
                      </div>
                    </div>
                  </WrapperItemOrder>
                );
              })}
            </WrapperItemOrderInfo>
            <div
              style={{
                width: "33%",
                fontSize: "17px",
                color: "red",
              }}
            >
              Tổng tiền: {convertPrice(state?.totalPriceMemo)}
            </div>
          </WrapperContainer>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
