import React, { useState } from "react";
import "./assets/Room.css";

function JoinRoom() {
  const [roomCode, setRoomCode] = useState("");

  const handleJoin = (e) => {
    e.preventDefault();
    alert(`Joining room: ${roomCode}`);
  };

  return (
    <div className="roomform-container">
      <div className="roomform-card">
        <h2>Join a Room</h2>
        <p className="roomform-subtitle">
          Enter the room code to join your friends and start chatting.
        </p>
        <form onSubmit={handleJoin}>
          <input
            type="text"
            className="roomform-input"
            placeholder="Enter Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            required
          />
          <button type="submit" className="roomform-btn">
            Join Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinRoom;
