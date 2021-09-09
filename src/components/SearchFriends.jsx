import React, { useState } from "react";
import host from "../config";

const SearchFriends = (props) => {
    const [input, setInput] = useState(``);
    return (
        <div className="Search">
            <input 
                onChange={e => {
                    setInput(e.target.value);
                    if (e.target.value === ""){
                        props.setIsDeleted(true);
                        props.setRerender(!props.rerender)
                        console.log(e.target.value)
                        
                    }
                }}
                id="name"
                type="text"
                placeholder="Search Friends"
            />
            <button 
                onClick={() => {
                    const init = {
                        headers: {
                            "Authorization": `123 ${sessionStorage.getItem("token")}`,
                        },
                        method: "GET",
                    }
                    fetch(`${host}/api/user/friends/${input}`, init)
                    .then(res => res.json())
                    .then(res => {
                        props.setItems(res);
                        props.setIsDeleted(false)
                    })
                }} 
                id="search"
            >Search</button>
        </div>
    )
}
export default SearchFriends;