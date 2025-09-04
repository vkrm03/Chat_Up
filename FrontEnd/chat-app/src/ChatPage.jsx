import React from "react";
import { useNavigate } from "react-router-dom";
import "./assets/Room.css";

function ChatPage() {
  const navigate = useNavigate();

  return (
    <div className="room-container">
      <div className="chat-choice-wrapper">
        {/* Join Room Card */}
        <div className="room-card">
          <h2>Join a Room</h2>
          <p className="room-subtitle">
            Already have a room code? Enter and join your friends instantly.
          </p>
          <button
            className="room-btn"
            onClick={() => navigate("/chat/join-room")}
          >
            Join Room
          </button>
        </div>

        {/* Create Room Card */}
        <div className="room-card">
          <h2>Create a Room</h2>
          <p className="room-subtitle">
            Start a new chat space and invite others to join!
          </p>
          <button
            className="room-btn"
            onClick={() => navigate("/chat/create-room")}
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
