import React from 'react';


function Card({ num }) {

    return (
        
        <div class="uno-card">
            <div class="card-inner">
                <div class="front" data-content={num}>
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
