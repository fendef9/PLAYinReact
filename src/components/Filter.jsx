import React from "react";
import { useState } from "react"

const Filter = (props) => {
    const [price, setPrice] = useState(props.cost);
    const change = (e) => {
        props.disp({
            name: e.target.value,
            value: e.target.checked
        })
    }

    return (
        <form className="Filter" >
            <label htmlFor="price">Filter by price: {price} UAH</label>
            <input
                id="price"
                type="range"
                min="0"
                max={props.cost}
                defaultValue={props.cost}
                onChange={(e) => {
                    setPrice(e.target.value);
                    props.disp({ name: e.target.id, value: e.target.value })

                }

                }
            />
            <div className="fieldset">
                <p>Filter by tag</p>
                <div>
                    <label htmlFor="indie">Indie</label>
                    <input id="indie" type="checkbox" defaultChecked={true} value="indie" onChange={change} />
                </div>
                <div>
                    <label htmlFor="action">Action</label>
                    <input id="action" type="checkbox" defaultChecked={true} value="action" onChange={change} />
                </div>
                <div>
                    <label htmlFor="adventure">Adventure</label>
                    <input id="adventure" type="checkbox" defaultChecked={true} value="adventure" onChange={change} />
                </div>
            </div>
        </form>
    )
}
export default Filter;