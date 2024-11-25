import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "12px 36px",
      }}
    >
      <div
        style={{
          width: "100%",
        }}
      >
        <h5>
          <span
            style={{ cursor: "pointer", fontWeight: "bold" }}
            onClick={() => {
              navigate("/");
            }}
          >
            Trang chủ
          </span>{" "}
          - Chi tiết sản phẩm
        </h5>
        <ProductDetailsComponent idProduct={id} />
      </div>
    </div>
  );
};
export default ProductDetailsPage;
