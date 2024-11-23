import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";


const DefaulComponent=({children})=>{
    return <div>
        <HeaderComponent/>
        {children}
    </div>
}

export default DefaulComponent