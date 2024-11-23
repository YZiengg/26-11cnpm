import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
  color: #333; /* Màu sắc nhẹ nhàng hơn */
  font-size: 19px; /* Cỡ chữ lớn hơn */
  
  border-bottom: 2px solid #ddd; /* Thêm đường viền dưới */
  font-weight: bold; /* Làm cho chữ đậm hơn */
 padding-bottom: 10px; /* Thêm khoảng cách giữa chữ và đường viền dưới */
`;
export const WrapperUploadFile = styled(Upload)`
  &.ant-upload.ant.upload-select.ant-upload-select-picture-card{
    width: 100px;
    height: 100px;
    border-radius: 70%;
  }
   &.ant-upload-list-item-info{display: none}
   & .ant-upload-list-item{display:none}
`