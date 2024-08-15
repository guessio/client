import React from 'react';
import Swal from 'sweetalert2';

function Card({ num, handleMakeGuess }) {
  const handleClick = () => {
    console.log(`Card number: ${num}`);
    handleMakeGuess(num);
    
    Swal.fire({
      title: 'Checking...',
      text: `You guessed ${num}`,
      icon: 'info',
      showConfirmButton: false,
      timer: 1000
    });
  };

  return (
    <div className="uno-card cursor-pointer" onClick={handleClick}>
      <div className="card-inner">
        <div className="front" data-content={num}>
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