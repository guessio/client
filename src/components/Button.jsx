import React from 'react'
import { Link } from 'react-router-dom'

const Button = () => {
    return (
        <Link to={'/add-player'}>
        <div className="btn-container">
            <button className="glowing-button">
                PLAY NOW
                <span className="arrow">➔</span>
            </button>
        </div>
        </Link>
    )
}

export default Button