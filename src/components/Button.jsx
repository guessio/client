import React from 'react'
import { Link } from 'react-router-dom'

const Button = () => {
    return (
        <Link to={'/add-player'}>
        <div class="btn-container">
            <button class="glowing-button">
                PLAY NOW
                <span class="arrow">➔</span>
            </button>
        </div>
        </Link>
    )
}

export default Button