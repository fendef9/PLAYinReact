import React from "react";

const Input = (props) => {
    return(
        <input
            className={(props.class.id === props.ids) ? props.class.value : ""} 
            id={props.ids} 
            placeholder={props.holder}
            type={props.types} 
            defaultValue={props.default}
        />
    )
}

export default Input;