

import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";
const socket = io("http://localhost:3000");
const DashboardPage = (state) => {
  const cards = Array.from({ length: 50 }, (_, i) => i + 1);


  const isRoomMaster = useLocation()

  
  useEffect(()=>{

    
  },[])

//   const [username, setUsername] = useState('');
//     const [isJoined, setIsJoined] = useState(false);
//     const [isRoomMaster, setIsRoomMaster] = useState(false);
//     const [players, setPlayers] = useState([]);
//     const [guess, setGuess] = useState('');
    const [countdown, setCountdown] = useState(180);
//     const [gameStatus, setGameStatus] = useState('waiting');
    const [secretNumber, setSecretNumber] = useState('');
    const [guesses, setGuesses] = useState([]);

    // useEffect(() => {
    //     socket.on('roomMasterAssigned', (player) => {
    //         if (player.id === socket.id) {
    //             setIsRoomMaster(true);
    //             // simpan di localStorage
    //             // next nya request ke server apakah gue rm atau bukan
    //         }
    //     });

    //     socket.on('playersUpdate', (players) => {
    //         setPlayers(players);
    //     });

    //     socket.on('game:status', (statusGame) => {
    //       setGameStatus(statusGame)
    //     })

    //     socket.on('gameStart', () => {
    //         setGameStatus('playing');
    //         // navigate ke /play?isRoomMaster=isRoomMaster
    //     });

    //     socket.on('countdownUpdate', (timeLeft) => {
    //         setCountdown(timeLeft);
    //     });

    //     socket.on('guessResult', ({ playerId, guess }) => {
    //         setGuesses((prevGuesses) => [...prevGuesses, { playerId, guess }]);
    //     });

    //     socket.on('gameEnd', ({ winnerId, winnerName }) => {
    //         if (winnerId) {
    //             alert(`Game Over! The winner is ${winnerName}`);
    //         } else {
    //             alert('Time\'s up! No one guessed the correct number.');
    //         }
    //         setGameStatus('ended');
    //     });

    //     return () => {
    //         socket.off('roomMasterAssigned');
    //         socket.off('playersUpdate');
    //         socket.off('waitingForPlayers');
    //         socket.off('gameStart');
    //         socket.off('countdownUpdate');
    //         socket.off('guessResult');
    //         socket.off('gameEnd');
    //     };
    // }, []);

    // const handleJoinGame = () => {
    //     socket.emit('joinGame', username);
    //     setIsJoined(true);
    // };

    // const handleSetNumber = () => {
    //     if (isRoomMaster) {
    //         socket.emit('setNumber', secretNumber);
    //     }
    // };

    // const handleMakeGuess = () => {
    //     socket.emit('makeGuess', guess);
    // };

    // console.log(isJoined, gameStatus, username, isRoomMaster, '<<<<<<');
    



  return (
    <>
      {"playing" === "playing" && (
        <div>
          <h2>Game in Progress</h2>
          <p>Time Left: {countdown} seconds</p>
          {isRoomMaster ? (
            <div>
              <h3>Number:</h3>
              <h3>{secretNumber}</h3>
              <h3>Players' Guesses:</h3>
              <ul>
                {guesses.map((g, index) => (
                  <li key={index}>
                    Player {g.playerId}: {g.guess}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex grid grid-cols-5 gap-5 m-20">
            {cards.map((number) => (
              <Card num={number} />
            ))}
          </div>
         )}
        </div>
      )} 

     
    </>
  );
};



export default DashboardPage;
