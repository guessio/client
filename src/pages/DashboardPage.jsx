import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import io from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

// const socket = io("https://guessio-server.rollyroller.com");
const socket = io("http://localhost:3000");


const DashboardPage = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const { isRoomMaster, secretNumber: initialSecretNumber } = location.state || {};
  
  const [players, setPlayers] = useState([]);
  const [countdown, setCountdown] = useState(180);
  const [gameStatus, setGameStatus] = useState('playing');
  const [secretNumber, setSecretNumber] = useState(initialSecretNumber || '');
  const [guesses, setGuesses] = useState([]);
  const cards = Array.from({ length: 50 }, (_, i) => i + 1);

  useEffect(() => {
    socket.on('countdownUpdate', (timeLeft) => {
      setCountdown(timeLeft);
    });

    socket.on('guessResult', ({ playerId, guess }) => {
      setGuesses((prevGuesses) => [...prevGuesses, { playerId, guess }]);
      if (playerId === socket.id) {
        Swal.fire({
          title: 'Wrong Guess!',
          text: `You guessed ${guess}, but that's not correct. Try again!`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });

    socket.on('gameEnd', ({ winnerId, winnerName }) => {
      if (winnerId) {
        Swal.fire({
          title: 'Game Over!',
          text: `The winner is ${winnerName}`,
          icon: 'success',
          confirmButtonText: 'OK'
          
        });
        navigate('/')
      } else {
        Swal.fire({
          title: 'Time\'s up!',
          text: 'No one guessed the correct number.',
          icon: 'info',
          confirmButtonText: 'OK'
        });
      }
      setGameStatus('ended');
    });

    return () => {
      socket.off('countdownUpdate');
      socket.off('guessResult');
      socket.off('gameEnd');
    };
  }, []);

  const handleMakeGuess = (guess) => {
    socket.emit('makeGuess', guess);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Game in Progress</h2>
      <p className="text-xl mb-4">Time Left: {countdown} seconds</p>
      {isRoomMaster ? (
        <div>
          <h3 className="text-xl font-semibold mb-2">Secret Number: {secretNumber}</h3>
          <h3 className="text-xl font-semibold mb-2">Players' Guesses:</h3>
          <ul className="list-disc pl-5">
            {guesses.map((g, index) => (
              <li key={index}>
                Player {g.playerId}: {g.guess}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-5">
          {cards.map((number) => (
            <Card key={number} num={number} handleMakeGuess={handleMakeGuess} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;