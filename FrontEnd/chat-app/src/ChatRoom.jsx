import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./assets/ChatRoom.css";

function ChatRoom() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  const roomId = searchParams.get("id");
  const roomName = searchParams.get("name") || `Room-${roomId}`;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "You",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
  };

  const handleLeaveRoom = () => {
    navigate("/chat");
  };

  return (
    <div className="chatroom-container">
      <div className="chatroom-header">
        <h2>{roomName}</h2>
        <span className="room-id">Room ID: {roomId}</span>
        <button className="leave-btn" onClick={handleLeaveRoom}>
          Leave
        </button>
      </div>

      <div className="chatroom-messages">
        {messages.length === 0 ? (
          <p className="no-messages">No messages yet. Start the conversation!</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`chat-message ${msg.sender === "You" ? "sent" : "received"}`}>
              <div className="message-content">
                <span className="sender">{msg.sender}</span>
                <p>{msg.text}</p>
                <span className="timestamp">{msg.time}</span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chatroom-input-area" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="chatroom-input"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button type="submit" className="chatroom-send-btn">
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatRoom;
