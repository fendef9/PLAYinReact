import React, { useState, useEffect } from "react";
import SearchFriends from "./SearchFriends";
import One_Friend from "./One_Friend";
import { Redirect } from "react-router-dom"
import host from "../config";

const Friends = (props) => {
  if(!sessionStorage.getItem("token")){
    return <Redirect to="/"/>
  } 

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [isDeleted, setIsDeleted] = useState(true);
  const [items, setItems] = useState([]);
  

  const init = {
    headers: {
      "Authorization": `123 ${sessionStorage.getItem("token")}`,
    },
    method: "GET",

  }
  useEffect(() => {
    fetch(`${host}/api/user/friends`, init)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          console.log(`rerender`)
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [rerender])

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } 
  else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } 
  else {
    const oneFriend = items.map(val => {
      return (
        <One_Friend
          name={val.username}
          remove={isDeleted}
          key={val._id}
          id={val._id}
          setRerender={setRerender}
          rerender={rerender}
          setIsDeleted={setIsDeleted}
        />
      )
    })

    return (
      <div className="Friends">
        <h2>Friends</h2>
        <SearchFriends 
          rerender={rerender}
          setRerender={setRerender}
          isDeleted={isDeleted}
          setIsDeleted={setIsDeleted}
          setItems={setItems}
        />
        <h2>{ isDeleted ? "My Friends" : "Searching New Friends"}</h2>
        <div className="Friends__Gallery">
          {items.length === 0 ? "No Friends Found" : ""}
          {oneFriend}
        </div>
      </div>
    )
  }

}
export default Friends;