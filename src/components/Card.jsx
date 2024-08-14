import React from 'react';

function Card({ num }) {

    const handleClick = () => {
        console.log(`Card number: ${num}`);
    };

    return (
        <div className="uno-card" onClick={handleClick}>
            <div className="card-inner">
                <div value={num} className="front" data-content={num}>
                    <div className="front-bg"></div>
                </div>
                <div className="back">
                    <div className="back-bg">
                        <p className="uno">Pick</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
