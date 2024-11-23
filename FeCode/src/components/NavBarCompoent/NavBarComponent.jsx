import React from "react";
import { WrapperLabelText, WrapperTextValue, WrapperContent, WrapperPriceText } from "./style";
import { Checkbox} from "antd";
import { Rate } from 'antd';

const NavBarComponent = () => {
    const onChange = (checkedValues) => {
        console.log('Checked values: ', checkedValues);
    };

    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => {
                    return (
                        <WrapperTextValue key={option}>{option}</WrapperTextValue>
                    );
                });
            case 'checkbox': 
                return (
                    <Checkbox.Group style={{ width: '100%', display:'flex',flexDirection:'column', gap:'12px'}} onChange={onChange}>
                        {options.map((option) => {
                            return (
                                <Checkbox key={option.value} value={option.value}>
                                    {option.label}
                                </Checkbox>
                            );
                        })}    
                    </Checkbox.Group>
                )
                case 'star': 
                return options.map((option) => {
                    console.log('check', option)
                            return (
                               <div style={{display:'flex'}}>
                                <Rate style={{fontSize:'12px'}} disabled defaultValue={option} />
                                <span>{`từ ${option} sao`} </span>
                               </div>
                               )
                        })
                        case 'price': 
                         return options.map((option) => {
                         return (
                            <WrapperPriceText>{option}</WrapperPriceText>
                        );
    });
                
            default:
                return null; 
        }
    };

    return (
        <div>
            <WrapperLabelText>Label</WrapperLabelText>
            <WrapperContent>
                {renderContent('text', ['Phòng bếp', 'Phòng khách', 'Phòng ngủ'])} 
            </WrapperContent>
        </div>
    );
};

export default NavBarComponent;
