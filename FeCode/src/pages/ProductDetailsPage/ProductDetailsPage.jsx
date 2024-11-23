import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { id } = useParams();
  return (
    <div
      style={{
        padding: "0 120px",
        background: "#efefef",
        marginTop: "-22px",
        height: "1000px",
      }}
    >
      <h5> Trang chủ - Chi tiết sản phẩm</h5>
      <div>
        <ProductDetailsComponent idProduct={id} />
      </div>
    </div>
  );
};
export default ProductDetailsPage;
