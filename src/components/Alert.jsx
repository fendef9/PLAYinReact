import React from "react";

const Alert = (props) => {
    const alert = [
        <div className={`alert ${props.class}`}>
            <p>{props.text}</p>
        </div>
    ]
    return  props.show ? alert: []
}

export default Alert