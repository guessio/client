import React from 'react';


function Card({ number }) {
    return (
        
        <div class="uno-card">
            <div class="card-inner">
                <div class="front">
                    <div class="front-bg"></div>
                </div>
                <div class="back">
                    <div class="back-bg">
                        <p class="uno">Pick</p>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Card;
