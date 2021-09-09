import React from "react"
import Card from "./Card";

const Games_Gallery = (props) => {
    const notFound = [<div className="NoFound" key="noFound">No Games Found</div>]
    const games = props.games ? props.games : [];
    const gamesList = games.map((val) => {
        return (

            <Card
                buttonKey={[val._id + 1, val._id + 2]}
                key={val._id}
                title={val.name}
                content={val.description}
                price={val.price}
                buttons={props.buttons}
                id={val._id}
            />
        )
    })
    return (

        <div className="Games-Gallery">
            {gamesList.length ? gamesList : notFound}
        </div>

    )
}
export default Games_Gallery;