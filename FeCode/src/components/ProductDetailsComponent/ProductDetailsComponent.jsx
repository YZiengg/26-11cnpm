import { Col, Image, InputNumber, Row } from "antd";
import React, { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct } from "../../redux/slides/orderSlide";
import { convertPrice } from "../../untils";
const ProductDetailsComponent = ({ idProduct }) => {
  const [numProduct, setNumProduct] = useState(1);
  const onChange = (value) => {
    setNumProduct(Number(value));
  };
  const user = useSelector((state) => state.user);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const fetchGetDetailsProduct = async ({ queryKey }) => {
    const [, id] = queryKey; // Lấy idProduct từ queryKey
    const res = await ProductService.getDetailsProduct(id);
    return res.data;
  };

  console.log("location", location);
  const renderStar = (num) => {
    const stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(<StarFilled style={{ color: "rgb(255,196,0)" }} key={i} />);
    }
    return stars;
  };
  const { isLoading, data: productDetails } = useQuery({
    queryKey: ["product-details", idProduct],
    queryFn: fetchGetDetailsProduct,
    enabled: !!idProduct, // Chỉ chạy query khi idProduct có giá trị
  });
  console.log("product-details", productDetails);
  const handleChangecount = (type) => {
    console.log("type", type);
    if (type === "increase") {
      setNumProduct(numProduct + 1);
    } else {
      setNumProduct(numProduct - 1);
    }
  };
  console.log("productDetails", productDetails);
  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      //   {
      //     name:{type:String, required:true},
      //     amount: {type:Number, required:true},
      //     image:{type:String, required:true},
      //     price:{type:Number, required:true},
      //     product:{
      //         type: mongoose.Schema.Types.ObjectId,
      //         ref:'Product',
      //         required:true,
      //     },
      // },
      dispatch(
        addOrderProduct({
          orderItem: {
            name: productDetails?.name,
            amount: numProduct,
            image: productDetails?.image,
            price: productDetails?.price,
            product: productDetails?._id,
          },
        })
      );
    }
  };
  console.log("product details", productDetails, user);
  return (
    <>
      <Row style={{ padding: "16px", background: "#fff", borderRadius: "4px" }}>
        <Col
          span={10}
          style={{ borderRight: "1px solid #e5e5e5", paddingRight: "8px" }}
        >
          <Image
            src={productDetails?.image}
            alt="image product"
            preview={false}
          />
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
            {productDetails?.name}{" "}
          </WrapperStyleNameProduct>
          <div style={{ marginLeft: "20px" }}>
            {renderStar(productDetails?.rating)}
            <span>{productDetails?.rating}</span>

            <WrapperStyleTextSell>| Đã bán 1000+</WrapperStyleTextSell>
          </div>
          <WrappePriceProduct>
            <WrappePriceTextProduct>
              {convertPrice(productDetails?.price)}
            </WrappePriceTextProduct>
          </WrappePriceProduct>
          <WrapperAddressProduct>
            <span>Giao đến</span>
            <span className="address"> {user?.address} </span>
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
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <MinusOutlined
                  style={{ color: "#000", fontSize: "20px" }}
                  onClick={() => handleChangecount("decrease")}
                />
              </button>
              <WrapperInputNumber
                onChange={onChange}
                defaultValue={1}
                value={numProduct}
                size="small"
              />
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <PlusOutlined
                  style={{ color: "#000", fontSize: "20px" }}
                  onClick={() => handleChangecount("increase")}
                />
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
              onClick={handleAddOrderProduct}
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
    </>
  );
};
export default ProductDetailsComponent;
