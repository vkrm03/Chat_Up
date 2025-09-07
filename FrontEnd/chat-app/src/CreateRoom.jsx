import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./assets/Room.css";

function CreateRoom() {
  const [roomName, setRoomName] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();

    if (!username.trim()) {
      toast.error("Please enter your username!");
      return;
    }

    const roomId = Date.now();

    toast.success("Room created successfully!");

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
