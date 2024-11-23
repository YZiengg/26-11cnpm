import React from "react";
import { Button } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
    const { 
        size, 
        placeholder, 
        textButton, 
        backgroundColorInput = '#fff',
        backgroundColorButton = 'rgb(13,92,182)',
        colorButton = '#fff',
        bordered,
    } = props;

    return (
        <div style={{ display: "flex", backgroundColor: '#fff' }}>
            <InputComponent 
                size={size} 
                placeholder={placeholder} 
                bordered={bordered}
                style={{ backgroundColor: backgroundColorInput, }} 
                {...props}
            />
            <ButtonComponent
                size={size}
                styleButton={{background: backgroundColorButton, border: !bordered && 'none', }}
                icon={<SearchOutlined color={colorButton} style={{color:'#fff'}} />}
                textButton={textButton} 
                styleTextButton={{color:colorButton}}
            />
        </div>
    );
}

export default ButtonInputSearch; 
