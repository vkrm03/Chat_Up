import React, { useState } from 'react';
import './assets/Room.css';

function CreateRoom() {
  const [roomName, setRoomName] = useState('');

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (!roomName.trim()) {
      alert('Please enter a room name.');
      return;
    }
    console.log('Creating new room:', roomName);
  };

  return (
    <div className="room-container">
      <div className="room-card">
        <h2>Create a Chat Room</h2>
        <p className="room-subtitle">Start a new conversation with friends!</p>

        <form onSubmit={handleCreateRoom}>
          <input
            type="text"
            placeholder="Enter Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="room-input"
          />
          <button type="submit" className="room-btn">Create Room</button>
        </form>
      </div>
    </div>
  );
}

export default CreateRoom;
