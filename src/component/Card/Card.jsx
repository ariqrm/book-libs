import React, { Fragment } from 'react'
import './Card.css'

const Card = (props) => {
    return (
        <Fragment>
            <div className="myCard">
                <img src={props.data.image} alt="" onClick={() => props.viewDitail(props.data.id)} />
                <p className="product-status" id={props.data.status}>{props.data.status}</p>
                <p onClick={() => props.viewDitail(props.data.id)} className="product-title">{props.data.title.substr(0, 25)}</p>
                <p className="product-desc">{props.data.description.substr(0, 100) + '...'}</p>
            </div>
        </Fragment>
    )
}

export default Card;