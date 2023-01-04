import React from "react";
import * as C from "./styles";

const Input = ({ type, placeholder, value, onChange, mask}) => {
    return (
        <C.Input 
            mask={mask}   
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder} 
        />
    )
}

export default Input;