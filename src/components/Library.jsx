import React from "react"
import Games_Gallery from "./Games_Gallery";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom"
import host from "../config";

const Library = () => {
  if(!sessionStorage.getItem("token")){
    return <Redirect to="/"/>
  } 
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const init = {
    headers: {
      "Authorization": `123 ${sessionStorage.getItem("token")}`,
    },
    method: "GET",

  }
  useEffect(() => {
    fetch(`${host}/api/user/games`, init)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
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
      <div className="Library">
        <h2>My Games</h2>
        <Games_Gallery games={items} buttons={true} />
      </div>
    )
  }
}
export default Library;