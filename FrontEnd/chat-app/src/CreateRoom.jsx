import React, { useState } from "react";
import "./assets/Room.css";

function CreateRoom() {
  const [roomName, setRoomName] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    alert(`Created room: ${roomName}`);
  };

  return (
    <div className="roomform-container">
      <div className="roomform-card">
        <h2>Create a Room</h2>
        <p className="roomform-subtitle">
          Give your room a name and invite friends to join.
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
          <button type="submit" className="roomform-btn">
            Create Room
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateRoom;
