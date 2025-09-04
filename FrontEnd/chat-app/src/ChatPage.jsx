import React from "react";
import { useNavigate } from "react-router-dom";
import "./assets/ChatPage.css";

function ChatPage() {
  const navigate = useNavigate();

  return (
    <div className="chatpage-container">
      <div className="chat-choice-wrapper">
        <div className="chat-card">
          <h2>Join a Room</h2>
          <p className="chat-subtitle">
            Already have a room code? Enter and join your friends instantly.
          </p>
          <button
            className="chat-btn"
            onClick={() => navigate("/chat/join-room")}
          >
            Join Room
          </button>
        </div>

        <div className="chat-card">
          <h2>Create a Room</h2>
          <p className="chat-subtitle">
            Start a new chat space and invite others to join!
          </p>
          <button
            className="chat-btn"
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
