import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

export default function AddPlayerPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [isRoomMaster, setIsRoomMaster] = useState(false);
  const [players, setPlayers] = useState([]);
  const [gameStatus, setGameStatus] = useState('waiting');
  const [secretNumber, setSecretNumber] = useState('');

  useEffect(() => {
      socket.on('roomMasterAssigned', (player) => {
          if (player.id === socket.id) {
              setIsRoomMaster(true);
              // simpan di localStorage
              // next nya request ke server apakah gue rm atau bukan
          }
      });

      socket.on('playersUpdate', (players) => {
          setPlayers(players);
      });

      socket.on('game:status', (statusGame) => {
        setGameStatus(statusGame)
        if(statusGame === "playing"){
            navigate("/app")
        }
        
      })

  
         return () => {
          socket.off('roomMasterAssigned');
          socket.off('playersUpdate');
          socket.off('waitingForPlayers');
          socket.off('gameStart');
     
      };
  }, []);

  const handleJoinGame = () => {
      socket.emit('joinGame', username);
      setIsJoined(true);
  };

  const handleSetNumber = () => {
      if (isRoomMaster) {
          socket.emit('setNumber', secretNumber);
        }
    };
    

  console.log(isJoined, gameStatus, username, isRoomMaster, '<<<<<<');
  

  return (
    <>
      {!isJoined ? (
        <div>
          <h1>Join the Game</h1>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-black"
          />
          <button onClick={handleJoinGame}>Join Game</button>
        </div>
      ) : (
        <div>
          {gameStatus === "waiting" && <p>Waiting for more players...</p>}
          {gameStatus === "ready" && (
            <div>
              <h2>Game Ready</h2>
              {isRoomMaster ? (
                <div>
                  <h3>You are the Room Master</h3>
                  <input
                    type="number"
                    placeholder="Set the secret number"
                    value={secretNumber}
                    onChange={(e) => setSecretNumber(e.target.value)}
                  />
                  <button onClick={handleSetNumber}>Set Number</button>
                </div>
              ) : (
                <div>Waiting Room Master Picking A Number...</div>
            
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
