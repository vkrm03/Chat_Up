import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./assets/Room.css";

function CreateRoom() {
  const [roomName, setRoomName] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [username, setUsername] = useState(""); // ✅ NEW
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();

    if (!username.trim()) {
      alert("Please enter your username!");
      return;
    }

    // Generate a unique room ID
    const roomId = Date.now();

    // Redirect to Chat Room with username and room name
    navigate(
      `/chat/chat-room?id=${roomId}&name=${encodeURIComponent(roomName)}&username=${encodeURIComponent(username)}`
    );
  };

  return (
    <div className="roomform-container">
      <div className="roomform-card">
        <h2>Create a Room</h2>
        <p className="roomform-subtitle">
          Give your room a name, set an optional password, and enter your username.
        </p>
        <form onSubmit={handleCreate}>
          <input
            type="text"
            className="roomform-input"
            placeholder="Enter Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
          />
          <input
            type="password"
            className="roomform-input"
            placeholder="Enter Room Password (optional)"
            value={roomPassword}
            onChange={(e) => setRoomPassword(e.target.value)}
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
            Create Room
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateRoom;
