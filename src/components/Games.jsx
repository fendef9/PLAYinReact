import React, { useEffect, useReducer, useState } from "react"
import Filter from "./Filter"
import Games_Gallery from "./Games_Gallery"
import SearchGames from "./SearchGames"
import { Redirect } from "react-router-dom"
import host from "../config"

const filterDefault = new Map()
filterDefault.set(`indie`, true);
filterDefault.set(`action`, true);
filterDefault.set(`adventure`, true);
filterDefault.set(`price`, -1);
filterDefault.set(`name`, "");

const reducer = (state, action) => {
  switch (action.name) {
    case "indie":
    case "action":
    case "adventure":
      return state.set(action.name, action.value);
    case "price":
    case "name":
      return state.set(action.name, action.value);
    default:
      return state
  }
}

const Games = () => {
  if(!sessionStorage.getItem("token")){
    return <Redirect to="/"/>
  } 

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [maxPrice, setPrice] = useState(0);
  const [filterState, dispatch] = useReducer(reducer, filterDefault);

  const findMixPrice = (where) => {
    let currentPrice = 0;
    where.forEach(val => {
      if (Number.parseInt(val.price) > currentPrice) {
        currentPrice = val.price;
      }
    })
    return currentPrice;
  }

  useEffect(() => {
    fetch(`${host}/api/steam/games`)
      .then(res => res.json())
      .then(
        (result) => {
          setPrice(findMixPrice(result));
          setItems(result);
          setFilteredItems(result);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div className="Games" >
        <h2 className="Games__Header">Games</h2>
        <SearchGames
          disp={dispatch}
          filter={filterState}
          items={items}
          set={setFilteredItems}
        />
        <h2 className="Games__Second-Header">Featured Games</h2>
        <div className="Games__Wrapper">
          <Games_Gallery
            games={filteredItems}
            buttons={false}
          />
          <Filter cost={maxPrice} disp={dispatch} />
        </div>
      </div>
    );
  }
}
export default Games;