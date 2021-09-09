import React from "react";
import { useState } from "react"
import Alert from "./Alert";
import host from "../config";

const Card = (props) => {
  const [modal, setModal] = useState({ text: "", open: false })
  return (
    <div className="Card">
      <Alert text={modal.text} show={modal.open} class={"inform"} key="alert"/>
      <div className="Card__Title">
        <h2>{props.title}</h2>
        <p>{props.price + ' UAH'}</p>
      </div>
      <div className="Card__Content">
        <p>{props.content}</p>
        <hr />
        <div className="Card__Content__Buttons">{
          props.buttons
            ? [
              <button
                id="Download"
                key={props.buttonKey[0]}
                onClick={() => {
                  setModal({ text: "Link are not available for now", open: true })
                  setTimeout(() => { setModal({ open: false }) }, 2000)
                }}
              >
                Download
              </button>,
              <button
                id="Share"
                key={props.buttonKey[1]}
                onClick={() => {
                  setModal({ text: "Link are not available for now", open: true })
                  setTimeout(() => { setModal({ open: false }) }, 2000)
                }}
              >
                Share
              </button>
            ]
            : <button
                id="addToLibrary"
                onClick={
                   (e) => {
                    fetch(`${host}/api/user/games/${props.id}`, {
                      headers: {
                        "Authorization": `123 ${sessionStorage.getItem("token")}`,
                      },
                      method: "PATCH",
                
                    }).then(res => {
                        setModal({ text: "Game was added to your library", open: true })
                        setTimeout(() => { setModal({ open: false }) }, 2000)
                      })
                      .catch(err => console.error(err))
                     
                  }
                }
              >
              Add to Library
            </button>
        }
        </div>
      </div>
    </div>
  )
}
export default Card;
