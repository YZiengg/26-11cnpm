import React, { useEffect, useRef, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {
  ButtonComponentMore,
  WrapperTypeProduct,
  WrapperProducts,
} from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/image/slider1.webp";
import slider2 from "../../assets/image/slider2.webp";
import slider3 from "../../assets/image/slider3.webp";
import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";
const HomePage = () => {
  const searchProduct = useSelector((state) => state.product?.search || ""); // Giá trị mặc định
  const arr = ["Phòng khách", "Phòng bếp", "Phòng ngủ"];
  const [limit, setLimit] = useState(5);
  const searchDebounce = useDebounce(searchProduct, 1000);
  const fetchProductAll = async ({ queryKey }) => {
    console.log("context:", queryKey); // Log toàn bộ queryKey để kiểm tra
    const limit = queryKey && queryKey[1];
    const search = queryKey && queryKey[2];
    const res = await ProductService.getAllProduct(search, limit);
    return res;
  };

  const { isLoading, data: products } = useQuery({
    queryKey: ["products", limit, searchDebounce], // Truyền các giá trị cần thiết
    queryFn: fetchProductAll, // Truyền trực tiếp fetchProductAll mà không cần tham số
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });
  return (
    <Loading isLoading={isLoading}>
      <div style={{ width: "1250px", margin: "0 auto" }}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </WrapperTypeProduct>
      </div>
      <div
        className="body"
        style={{ width: "100%", backgroundColor: "efefef" }}
      >
        <div
          id="container"
          style={{ height: "1000px", width: "1250px", margin: "0 auto" }}
        >
          <SliderComponent arrImage={[slider1, slider2, slider3]} />
          <WrapperProducts>
            {products?.data?.map((product) => {
              return (
                <CardComponent
                  key={product._id}
                  countInstock={product.countInstock}
                  description={product.description}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  rating={product.rating}
                  type={product.type}
                  selled={product.selled}
                  discount={product.discount}
                  id={product._id}
                />
              );
            })}
          </WrapperProducts>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <ButtonComponentMore
              textButton="Xem thêm"
              type="outline"
              styleButton={{
                border: "1px solid rgb(11, 116, 229)",
                color: "rgb(11, 116, 229)",
                width: "240px",
                height: "38px",
                borderRadius: "4px",
              }}
              styleTextButton={{ fontWeight: 500 }}
              onClick={() => setLimit((prev) => prev + 5)}
            />
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default HomePage;
