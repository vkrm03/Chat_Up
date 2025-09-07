import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./assets/Room.css";

function JoinRoom() {
  const [roomCode, setRoomCode] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();

    if (!roomCode.trim() || !username.trim()) {
      toast.error("Please enter both room code and username!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/check-room/${roomCode}`);
      const data = await response.json();

      if (!data.exists) {
        toast.error("Room does not exist! Please create the room first.");
        return;
      }

      toast.success("Joined room successfully!");
      navigate(`/chat/chat-room?id=${roomCode}&username=${encodeURIComponent(username)}`);
    } catch (error) {
      console.error("Error checking room:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="roomform-container">
      <div className="roomform-card">
        <h2>Join a Room</h2>
        <p className="roomform-subtitle">
          Enter the room code and your username to join the chat.
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
          <input
            type="text"
            className="roomform-input"
            placeholder="Enter Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
