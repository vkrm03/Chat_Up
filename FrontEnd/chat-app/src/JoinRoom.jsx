import React, { useState } from 'react';
import './assets/Room.css';

function JoinRoom() {
  const [roomCode, setRoomCode] = useState('');

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (!roomCode.trim()) {
      alert('Please enter a room code.');
      return;
    }
    console.log('Joining room with code:', roomCode);
  };

  return (
    <div className="room-container">
      <div className="room-card">
        <h2>Join a Chat Room</h2>
        <p className="room-subtitle">Enter the room code to join your friends!</p>

        <form onSubmit={handleJoinRoom}>
          <input
            type="text"
            placeholder="Enter Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            className="room-input"
          />
          <button type="submit" className="room-btn">Join Room</button>
        </form>
      </div>
    </div>
  );
}

export default JoinRoom;
