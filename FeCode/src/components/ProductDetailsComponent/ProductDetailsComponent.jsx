import { Col, Image, InputNumber, Row } from "antd";
import React from "react";
import imageProduct from "../../assets/image/test.webp";
import imageProductSmall from "../../assets/image/small.webp";
import {
  WrapperStyleImageSmall,
  WrapperStyleColSmall,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
  WrappePriceProduct,
  WrappePriceTextProduct,
  WrapperAddressProduct,
  WrapperQualityProduct,
  WrapperInputNumber,
} from "./style";
import { PlusOutlined, StarFilled, MinusOutlined } from "@ant-design/icons";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";

const ProductDetailsComponent = ({ idProduct }) => {
  const onChange = () => {};
  const fetchGetDetailsProduct = async ({ queryKey }) => {
    const [, id] = queryKey; // Lấy idProduct từ queryKey
    const res = await ProductService.getDetailsProduct(id);
    return res.data;
  };

  const { isLoading, data: productDetails } = useQuery({
    queryKey: ["product-details", idProduct],
    queryFn: fetchGetDetailsProduct,
    enabled: !!idProduct, // Chỉ chạy query khi idProduct có giá trị
  });
  console.log("product-details", productDetails);

  return (
    <Row style={{ padding: "16px", background: "#fff", borderRadius: "4px" }}>
      <Col
        span={10}
        style={{ borderRight: "1px solid #e5e5e5", paddingRight: "8px" }}
      >
        <Image src={imageProduct} alt="image product" preview={false} />
        <Row style={{ paddingTop: "10px", justifyContent: "space-between" }}>
          <WrapperStyleColSmall span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColSmall>
          <WrapperStyleColSmall span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColSmall>
          <WrapperStyleColSmall span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColSmall>
          <WrapperStyleColSmall span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColSmall>
          <WrapperStyleColSmall span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColSmall>
          <WrapperStyleColSmall span={4}>
            <WrapperStyleImageSmall
              src={imageProductSmall}
              alt="image small"
              preview={false}
            />
          </WrapperStyleColSmall>
        </Row>
      </Col>
      <Col span={14} style={{ paddingLeft: "20px" }}>
        <WrapperStyleNameProduct>
          Kệ Sách Gỗ Đa Tầng FIVO
        </WrapperStyleNameProduct>
        <div style={{ marginLeft: "20px" }}>
          <StarFilled style={{ fontSize: "12px", color: "rgb(255,196,0)" }} />
          <StarFilled style={{ fontSize: "12px", color: "rgb(255,196,0)" }} />
          <StarFilled style={{ fontSize: "12px", color: "rgb(255,196,0)" }} />
          <WrapperStyleTextSell>| Đã bán 1000+</WrapperStyleTextSell>
        </div>
        <WrappePriceProduct>
          <WrappePriceTextProduct>200.000</WrappePriceTextProduct>
        </WrappePriceProduct>
        <WrapperAddressProduct>
          <span>Giao đến</span>
          <span className="address"> Q. 1, P. Bến Nghé, Hồ Chí Minh - </span>
          <span className="change-address">Đổi địa chỉ</span>
        </WrapperAddressProduct>
        <div
          style={{
            margin: "10px 0px 20px",
            padding: "10px 0",
            borderTop: "1px solid #e5e5e5",
            borderBottom: "1px solid #e5e5e5",
          }}
        >
          <div style={{ marginBottom: "6px" }}>Số Lượng</div>
          <WrapperQualityProduct>
            <button style={{ border: "none", background: "transparent" }}>
              <MinusOutlined style={{ color: "#000", fontSize: "20px" }} />
            </button>
            <WrapperInputNumber
              defaultValue={3}
              onChange={onChange}
              size="small"
            />
            <button style={{ border: "none", background: "transparent" }}>
              <PlusOutlined style={{ color: "#000", fontSize: "20px" }} />
            </button>
          </WrapperQualityProduct>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <ButtonComponent
            size={40}
            styleButton={{
              background: "rgb(255,57,69)",
              height: "48px",
              width: "220px",
              border: "none",
              boderRadius: "4px",
              marginLeft: "20px",
            }}
            textButton={"Chọn mua"}
            styleTextButton={{ color: "#fff" }}
          ></ButtonComponent>

          <ButtonComponent
            size={40}
            styleButton={{
              background: "#fff",
              height: "48px",
              width: "220px",
              border: "1px solid rgb(13, 92,182)",
              boderRadius: "4px",
            }}
            textButton={"Mua trả sau"}
            styleTextButton={{ color: "rgb(13, 92,182)", fontSize: "12px" }}
          ></ButtonComponent>
        </div>
      </Col>
    </Row>
  );
};
export default ProductDetailsComponent;
