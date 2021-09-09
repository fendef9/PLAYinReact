import React from "react"
import logo from "./svg/logo.svg"

const Toolbar = () => {
    return (
        <nav className="Toolbar">
            <img src={logo} alt=""></img>
            <ul>
                <li><a href="/games">Games</a></li>
                <li><a href="/library">Library</a></li>
                <li><a href="/friends">Friends</a></li>
                <li><a href="/profile">Profile</a></li>
            </ul>
        </nav>
    )
}
export default Toolbar;