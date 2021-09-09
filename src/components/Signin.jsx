import React, { useState, } from "react"
import { Redirect } from "react-router-dom"
import Alert from "./Alert"
import host from "../config"

const Signin = (props) => {
    const [alertObj, setAlertObj] = useState({ show: false, class: "", text: "" });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(!sessionStorage.getItem("token"));

    return (
        <div className="Signin">
            {redirect ? []  : <Redirect to="/games" /> }
            <Alert show={alertObj.show} class={alertObj.class} text={alertObj.text} key={alertObj.text}/>
            <p>Sign In <small>or</small> Log In</p>
            <form>
                <label htmlFor="login-email">Email</label>
                <input
                    onChange={e => {
                        setEmail(e.target.value)
                    }}
                    itemID="login-email"
                    placeholder="Email"
                    type="email"
                />
                <label htmlFor="login-password">Password</label>
                <input
                    onChange={e => {
                        setPassword(e.target.value)
                    }}
                    itemID="login-password"
                    placeholder="Password"
                    type="password"
                />
                <button onClick={(e) => {
                    e.preventDefault()
                    fetch(`${host}/api/auth/register`, {
                        method:"POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        body: JSON.stringify(
                        {
                            password,
                            email,
                        })       
                    })
                    .then(async(response) => {
                        const regBody = await response.json();
                        if(!response.ok){
                            throw new Error(regBody.message);
                        }
                        else{
                            setAlertObj({
                                class: "success",
                                text: 'You are registred.Pleas log in',
                                show: true
                            })
                            setTimeout(() => {
                                setAlertObj({show: false})
                            },3000)
                        }   
                    })
                    .catch(err => {
                        setAlertObj({
                            class: "error",
                            text: err.message,
                            show: true
                        })
                        setTimeout(() => {
                            setAlertObj({show: false})
                        },3000)
                    })
                }}>Register</button>
                <button onClick={(e) => {
                    e.preventDefault()
                    fetch(`${host}/api/auth/login`, {
                        method:"POST",
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        body: JSON.stringify(
                        {
                            password,
                            email,
                        })   
                    })
                        .then(async (res) => {
                            const logBody = await res.json();
                            if(!res.ok){
                                throw new Error(logBody.message);
                            }
                            return logBody
                        })
                        .then(res => {
                            sessionStorage.setItem("token", res.jwt_token)
                            setRedirect(false)
                        })
                        .catch(err => {
                            setAlertObj({
                                class: "error",
                                text: err.message,
                                show: true
                            })
                            setTimeout(() => {
                                setAlertObj({show: false})
                            },3000)
                        })
                    }
                }>Sign in</button>
        </form>
        </div >

    )
}

export default Signin;