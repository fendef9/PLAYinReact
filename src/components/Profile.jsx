import React from "react"
import { useState, useEffect, useReducer } from "react";
import validation from "./validation";
import Alert from "./Alert";
import Input from "./Input";
import { Redirect } from "react-router-dom"
import host from "../config";

const inputs = new Map();
inputs.set(`age`, {isValid:true, content:``});
inputs.set(`username`, {isValid:true, content:``});
inputs.set(`email`, {isValid:true, content:``});

const reducer = (state, action) => {
  switch(action.name){
    case "age":
      return state.set(`age`, {content:action.value, isValid:action.validate});
    case "email":
      return state.set(`email`, {content:action.value, isValid:action.validate});
    case "username":
      return state.set(`username`, {content:action.value, isValid:action.validate});
    default:
      return state;  
  }
}

const Profile = (props) => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formParams, dispatch] = useReducer(reducer, inputs);
  const [modal, setModal] = useState({ text: "", open: false, style:""});
  const [redirect, setRedirect] = useState(sessionStorage.getItem("token"));
  const [inputBorders, setInputBorders] = useState({id:'', value:''});

  const saveProfile = e => {
    e.preventDefault();
    if (e.target.id === "save") {
      const mapIter = formParams.entries();
      let res = mapIter.next();
      
      while(!res.done){
        if(!res.value[1].isValid){
          setModal(
            {
              text: `"${res.value[1].content}" is not correct value for the "${res.value[0]}" field`,
              open: true,
              style: "error"
            }
          )
          setInputBorders({id: res.value[0], value: `borderErr`});
          setTimeout(() => {
            setModal({open:false})
            setInputBorders(``);
          }, 3000)
          return
        }
        res = mapIter.next()
      }

      fetch(
        `${host}/api/user/profile`, 
        {
          method: "PATCH",
          headers: {
            "Authorization": `123 ${sessionStorage.getItem("token")}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(
            {
              username: formParams.get(`username`).content,
              age: formParams.get(`age`).content,
              email: formParams.get(`email`).content,
            }
          )
        }
      )
      .then( async res => {
        const body = await(res.json())
        if (!res.ok){
          throw new Error(body.message)
        }
        else{
          const success = (text) => {
            setModal(
              {
                text,
                open: true,
                style: "success"
              }
            )
            setTimeout(() => {
              setModal({open:false})
            }, 2000)
          }
          if(body.message){
            success(body.message)
          }
          else if(body.token){
            sessionStorage.setItem("token", "");
            setRedirect(sessionStorage.getItem("token"))
            //послать на перелогин
          }
        }
      })
      .catch(err => {
        setModal(
          {
            text: err.message,
            open: true,
            style: "error"
          }
        )
        setTimeout(() => {
          setModal({open:false})
        }, 5000)
      })
    }
  }

  const change = e => {
    if( validation[e.target.id](e.target.value) ){
      // e.target.classList.remove("borderErr");
      dispatch({name:e.target.id, value:e.target.value,validate:true});
    }
    else {
      dispatch({name:e.target.id, value:e.target.value,validate:false});
      // e.target.classList.add("borderErr");
    }
  }

  useEffect(() => {
    fetch(
      `${host}/api/user/profile`, 
      {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Authorization": `123 ${sessionStorage.getItem("token")}`,
        },
      }
    )
    .then(res => res.json())
    .then(
      (result) => {
        dispatch({name:`email`, value:result.email, validate:true});
        dispatch({name:`username`, value:result.username, validate:true});
        dispatch({name:`age`, value:result.age, validate:true});
        setIsLoaded(true);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }, [])

  if (error) {
    return <Alert text={error.message} class={`error`} show={true} key="alert"/>
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div className="Profile">
        {redirect ? [] : <Redirect to="/" /> }
        <Alert show={modal.open} text={modal.text} class={modal.style} key="formAlert"/>
        <p>Profile</p>
   
        <form onChange={change} onClick={saveProfile}>
          <label htmlFor="email">Email</label>
          <Input
            class={inputBorders} 
            ids="email" 
            holder="Email" 
            types="email" 
            default={formParams.get("email").content} 
          />
          <label htmlFor="profile-username">Username</label>
          <Input
            class={inputBorders} 
            ids="username" 
            holder="Username" 
            types="text" 
            default={formParams.get(`username`).content}
          />
          <label htmlFor="profile-age">Age</label>
          <Input
            class={inputBorders} 
            ids="age" 
            holder="Age" 
            types="number"  
            default={formParams.get(`age`).content}
          />
          <button id="save">save</button>
        </form>
      </div>
    )
  }

}

export default Profile;