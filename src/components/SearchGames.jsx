import React from "react";

const makeFiltration = (where, filter) => {
    const arr = where.filter(val => {
        let tag = false;
        {
            const tagValue = val.tag
            for (let i = 0; i < tagValue.length; i++) {
                if (filter.has(tagValue[i])) {
                    if (filter.get(tagValue[i])) {
                        tag = true;
                        break;
                    }
                }
            }
        }

        if (tag) {
            if (
                Number.parseInt(val.price) <= Number.parseInt(filter.get("price")) ||
                filter.get("price") === -1
            ) {
                if (
                    val.name.toLowerCase().trim().includes(filter.get("name").toLowerCase().trim())
                ) {
                    return true
                }
            }
        };
    })
    return arr
}

const SearchGames = (props) => {
    return (
        <div className="Search">
            <input onChange={e => {
                props.disp(
                    {
                        name: e.target.id,
                        value: e.target.value
                    }
                )
            }}
                id="name"
                type="text"
                placeholder="Search Games"
            />
            <button onClick={
                () => {
                    const arr = makeFiltration(props.items, props.filter);
                    props.set(arr);
                }
            } id="search">Search</button>
        </div>
    )
}
export default SearchGames;