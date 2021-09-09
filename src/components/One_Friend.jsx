import React from "react";
import host from "../config";
const Friend = (props) => {
    return (
        <div className="One_Friend">
            <p>User: {props.name}</p>
            <button 
                className={props.remove ? "coral" : ""} 
                onClick={
                    () => {
                        let method;
                        if(props.remove){
                          method = "DELETE"  
                        }
                        else{
                            method = "PATCH"
                        }
                        const init = {
                            headers: {
                                "Authorization": `123 ${sessionStorage.getItem("token")}`,
                            },
                            method,
                        
                          }
                        fetch(`${host}/api/user/friends/${props.id}`, init)
                        .then(res => {
                            if(res.ok){
                                props.setRerender(!props.rerender)
                                if(method==="PATCH"){
                                    props.setIsDeleted(!props.remove)  
                                }
                            }
                        })

                    }
                }
            >
                {props.remove ? "Remove Friend" : "Add Friend"}
            </button>
        </div>
    )
}
export default Friend;