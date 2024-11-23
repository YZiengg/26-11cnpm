import styled from "styled-components";
import { Card } from "antd";
export const WrapperCardStyle= styled(Card)`
width: 200px;
& img{
      height: 200px;
      width: 200px;
     }
`
export const StyleNameProduct = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  color: rgb(56, 56, 61);
  padding: 10px 10px 0; /* Thêm padding trên để tách biệt khỏi hình ảnh */
  margin-left: -20px;
  margin-top: -20px; 
`;

export const WrapperReportText = styled.div`
  font-size: 11px;
  color: rgb(128, 128, 137);
  display: flex;
  align-items: center;
  margin: 8px -9px 4px  -9px;
`;

export const WrapperPriceText = styled.div`
  color: rgb(255, 66, 78);
  font-size: 16px;
  font-weight: 500;
   margin: 8px -9px 4px  -9px;  
`;

export const WrapperDiscountText = styled.span`
  color: rgb(255, 66, 78);
  font-size: 12px;
  font-weight: 500;
`;
export const WrapperStyleTextSell= styled.span`
font-size: 15px;
line-height: 24px;
color: rgb(120,120,120);
`
