import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
  display: flex; /* Sử dụng flex để sắp xếp các item nằm ngang */
  align-items: center; /* Căn giữa các item theo chiều dọc */
  gap: 16px; /* Giảm khoảng cách giữa các item */
  justify-content: flex-start; /* Bắt đầu sắp xếp từ bên trái */
  height: 44px; /* Giảm chiều cao của Wrapper */
  padding-top: 8px; /* Giảm khoảng cách trên */
  padding-bottom: 8px; /* Giảm khoảng cách dưới */
`;
export const ButtonComponentMore = styled(ButtonComponent)`
  background: #fff; /* Nền trắng mặc định */

  &:hover {
    color: #fff; /* Chữ trắng khi hover */
    background: rgb(13, 92, 182); /* Nền xanh khi hover */
    span{
    color:#fff;
    }
  }
    width: 100%;
    text-align: center;
`;
export const WrapperProducts = styled.div`
display: flex;
justify-content: center;
gap: 14px;
margin-top: 20px;
flex-wrap: wrap;
max-width: 1200px;
`
