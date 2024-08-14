import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Swal from 'sweetalert2';

// const socket = io("https://guessio-server.rollyroller.com");
const socket = io("http://localhost:3000");

export default function AddPlayerPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [isRoomMaster, setIsRoomMaster] = useState(false);
  const [players, setPlayers] = useState([]);
  const [gameStatus, setGameStatus] = useState("waiting");
  const [secretNumber, setSecretNumber] = useState("");

  useEffect(() => {
    socket.on("roomMasterAssigned", (player) => {
      if (player.id === socket.id) {
        setIsRoomMaster(true);
        Swal.fire({
          title: 'You are the Room Master!',
          text: 'You will need to set the secret number once the game is ready.',
          icon: 'info',
          confirmButtonText: 'OK'
        });
      }
    });

    socket.on("playersUpdate", (updatedPlayers) => {
      setPlayers(updatedPlayers);
    });

    socket.on("game:status", (statusGame) => {
      setGameStatus(statusGame);
      if (statusGame === "ready" && isRoomMaster) {
        Swal.fire({
          title: 'Game is Ready!',
          text: 'Please set the secret number to start the game.',
          icon: 'info',
          confirmButtonText: 'OK'
        });
      }
    });

    socket.on("gameStart", () => {
      navigate("/app", { state: isRoomMaster });
    });

    return () => {
      socket.off("roomMasterAssigned");
      socket.off("playersUpdate");
      socket.off("game:status");
      socket.off("gameStart");
    };
  }, [isRoomMaster, navigate]);

  const handleJoinGame = () => {
    if (username.trim() === "") {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter a username.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      
      return;
    }
    socket.emit("joinGame", username);
    setIsJoined(true);
  };

  const handleSetNumber = () => {
    if (isRoomMaster) {
      if (secretNumber === "" || isNaN(secretNumber) || secretNumber < 1 || secretNumber > 50) {
        Swal.fire({
          title: 'Invalid Number!',
          text: 'Please enter a number between 1 and 50.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }
      socket.emit("setNumber", parseInt(secretNumber));
    }
  };

  return (
    <div className="p-4">
      {!isJoined ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Join the Game</h1>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-black px-3 py-2 rounded mb-2"
          />
          <button 
            onClick={handleJoinGame}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Join Game
          </button>
        </div>
      ) : (
        <div>
          {gameStatus === "waiting" && (
            <p className="text-xl">Waiting for more players... ({players.length}/3)</p>
          )}
          {gameStatus === "ready" && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Game Ready</h2>
              {isRoomMaster ? (
                <div>
                  <h3 className="text-xl mb-2">You are the Room Master</h3>
                  <input
                    className="text-black px-3 py-2 rounded mb-2"
                    type="number"
                    placeholder="Set the secret number (1-50)"
                    value={secretNumber}
                    onChange={(e) => setSecretNumber(e.target.value)}
                    min="1"
                    max="50"
                  />
                  <button 
                    onClick={handleSetNumber}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Set Number
                  </button>
                </div>
              ) : (
                <div className="text-xl">Waiting for Room Master to pick a number...</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}